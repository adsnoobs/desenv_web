import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ServicoBaseService } from './servico-base.service';
import { Movimento } from '../model/movimento.model';
import { ADSResposta } from '../model/ads-resposta.model';
import { MesAno } from './../model/mes-ano.model';
import { DashBoardResumo } from '../model/dashboard-resumo.model';
import { ExtratoCategoria } from '../model/extrado-categoria.model';

@Injectable()
export class MovimentoService extends ServicoBaseService {
    constructor(protected http: Http) {
        super(http);
    }

    public obtemPeloCodigo(codigo: string): Observable<ADSResposta> {
        return this.obtemDadosPost<ADSResposta>('movimento/obtemporcodigo', { Codigo: codigo });
    }

    public obtemLista(): Observable<Movimento[]> {
        return this.obtemDadosPost<ADSResposta>('movimento/obtem').map(
            m => {
                if (m.Sucesso) {
                    return m.Objeto as Movimento[];
                } else {
                    return [];
                }
            }
        );
    }

    public excluir(movimento: Movimento): Observable<ADSResposta> {
        return this.enviarComandoPost('movimento/excluir', { Movimento: movimento });
    }

    public salvar(movimento: Movimento): Observable<ADSResposta> {
        return this.enviarComandoPost('movimento/salvar', { Movimento: movimento });
    }

    public obtemResumoMes(mesAno: MesAno): Observable<{ DashBoardResumo: DashBoardResumo, Categorias: ExtratoCategoria[] }> {
        return this.obtemDadosPost<ADSResposta>('movimento/dashboardresumo', { Mes: mesAno.Mes, Ano: mesAno.Ano }).map(
            m => {
                if (m.Sucesso) {
                    return m.Objeto as { DashBoardResumo: DashBoardResumo, Categorias: ExtratoCategoria[] };
                }
            }
        );
    }
}
