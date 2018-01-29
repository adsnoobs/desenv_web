import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

import { Categoria } from './../model/categoria.model';
import { DashboardResumo } from '../model/dashboard-resumo.model';
import { ServicoBaseService } from './servico-base.service';
import { TipoMovimento } from '../model/tipo-movimento.model';
import { Movimento } from '../model/movimento.model';
import { MesAno } from './../model/mes-ano.model';

@Injectable()
export class DashboardService extends ServicoBaseService {

    constructor(protected http: Http) {
        super(http);
    }

    // tslint:disable-next-line:max-line-length
    public obtemResumoMes(mesAno: MesAno): Observable<{ dashboardResumo: DashboardResumo, categorias: { codigo: string, descricao: string, valor: number }[] }> {
        return new Observable<{ dashboardResumo: DashboardResumo, categorias: { codigo: string, descricao: string, valor: number }[] }>(
            observer => {
                const resumo = this.montaResumoMes(mesAno);
                observer.next(resumo);
                observer.complete();
            }
        );
    }

    // tslint:disable-next-line:max-line-length
    private montaResumoMes(mesAno: MesAno): { dashboardResumo: DashboardResumo, categorias: { codigo: string, descricao: string, valor: number }[] } {
        // tslint:disable-next-line:max-line-length
        const retorno = { dashboardResumo: { DespesasAberto: 0, ReceitasAberto: 0, SaldoContas: 0, Previsao: 0 } as DashboardResumo, categorias: [] };
        const lstMov = this.obtemListaLocal<Movimento>('Movimento');
        if (lstMov && lstMov.length > 0) {
            const lstTPMov = this.obtemListaLocal<TipoMovimento>('TipoMovimento');
            const lstCat = this.obtemListaLocal<Categoria>('Categoria');
            // ultimos dia mes
            const dataInicioMes = new Date(mesAno.Ano, mesAno.Mes - 1, 1);
            const dataFinalMes = new Date(mesAno.Ano, mesAno.Mes, 0);

            lstMov.forEach(mov => {

                const arrData = mov.Data.split('-');
                const dataMov = new Date(Number(arrData[0]), Number(arrData[1]) - 1, Number(arrData[2]));

                const indexDesp = lstTPMov.findIndex((f: TipoMovimento) => {
                    return f.Codigo === mov.TipoMovimentoCodigo && f.CreditoDebito === 'D';
                });
                const indexRec = lstTPMov.findIndex((f: TipoMovimento) => {
                    return f.Codigo === mov.TipoMovimentoCodigo && f.CreditoDebito === 'C';
                });

                if (!mov.Efetivado && dataMov.getTime() <= dataFinalMes.getTime()) {
                    retorno.dashboardResumo.DespesasAberto += (indexDesp >= 0 ? mov.Valor : 0);
                    retorno.dashboardResumo.ReceitasAberto += (indexRec >= 0 ? mov.Valor : 0);
                }

                if (mov.Efetivado) {
                    if (indexDesp >= 0) {
                        retorno.dashboardResumo.SaldoContas -= mov.Valor;
                    } else {
                        retorno.dashboardResumo.SaldoContas += mov.Valor;
                    }

                    retorno.dashboardResumo.SaldoContas = Math.round(retorno.dashboardResumo.SaldoContas * 100) / 100;

                    // resumo para o grafico, somente Despesas efetivos dentro do mes
                    if (indexDesp >= 0) {
                        if (dataMov.getTime() >= dataInicioMes.getTime() && dataMov.getTime() <= dataFinalMes.getTime()) {
                            const index = retorno.categorias.findIndex((f: { codigo: string, descricao: string, valor: number }) => {
                                return f.codigo === mov.CategoriaCodigo;
                            });
                            if (index >= 0) {
                                retorno.categorias[index].valor += mov.Valor;
                            } else {
                                const categoria = lstCat.find((f: Categoria) => {
                                    return f.Codigo === mov.CategoriaCodigo;
                                });
                                retorno.categorias.push(
                                    {
                                        codigo: categoria.Codigo,
                                        descricao: categoria.Descricao,
                                        valor: mov.Valor
                                    }
                                );
                            }
                        }
                    }
                }

            });

            retorno.dashboardResumo.Previsao =
                retorno.dashboardResumo.ReceitasAberto + retorno.dashboardResumo.SaldoContas - retorno.dashboardResumo.DespesasAberto;
            retorno.dashboardResumo.Previsao = Math.round(retorno.dashboardResumo.Previsao * 100) / 100;
        }
        return retorno;
    }
}
