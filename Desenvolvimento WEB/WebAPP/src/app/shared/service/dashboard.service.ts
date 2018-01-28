import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

import { DashboardResumo } from '../model/dashboard-resumo.model';
import { ServicoBaseService } from './servico-base.service';
import { TipoMovimento } from '../model/tipo-movimento.model';
import { Movimento } from '../model/movimento.model';

@Injectable()
export class DashboardService extends ServicoBaseService {

    constructor(protected http: Http) {
        super(http);
    }

    public obtemResumoMes(mes?: number, ano?: number): Observable<DashboardResumo> {
        return new Observable<DashboardResumo>(
            observer => {
                const resumo = this.montaResumoMes(mes, ano);
                observer.next(resumo);
                observer.complete();
            }
        );
    }

    private montaResumoMes(mes?: number, ano?: number): DashboardResumo {
        const retorno = { DespesasAberto: 0, ReceitasAberto: 0, SaldoContas: 0, Previsao: 0 } as DashboardResumo;
        const lstMov = this.obtemListaLocal<Movimento>('Movimento');
        if (lstMov && lstMov.length > 0) {
            const lstTPMov = this.obtemListaLocal<TipoMovimento>('TipoMovimento');
            // ultimos dia mes
            const dataMes = new Date(ano, mes, 0);

            lstMov.forEach(mov => {

                const arrData = mov.Data.split('-');
                const dataMov = new Date(Number(arrData[0]), Number(arrData[1]) - 1, Number(arrData[2]));

                const indexDesp = lstTPMov.findIndex((f: TipoMovimento) => {
                    return f.Codigo === mov.TipoMovimentoCodigo && f.CreditoDebito === 'D';
                });
                const indexRec = lstTPMov.findIndex((f: TipoMovimento) => {
                    return f.Codigo === mov.TipoMovimentoCodigo && f.CreditoDebito === 'C';
                });

                if (!mov.Efetivado && dataMov.getTime() <= dataMes.getTime()) {
                    retorno.DespesasAberto += (indexDesp >= 0 ? mov.Valor : 0);
                    retorno.ReceitasAberto += (indexRec >= 0 ? mov.Valor : 0);
                }

                if (mov.Efetivado) {
                    if (indexDesp >= 0) {
                        retorno.SaldoContas -= mov.Valor;
                    } else {
                        retorno.SaldoContas += mov.Valor;
                    }
                }

            });

            retorno.Previsao = retorno.ReceitasAberto + retorno.SaldoContas - retorno.DespesasAberto;
            retorno.Previsao = Math.round(retorno.Previsao * 100) / 100;
        }
        return retorno;
    }
}
