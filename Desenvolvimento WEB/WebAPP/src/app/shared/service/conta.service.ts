import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ServicoBaseService } from './servico-base.service';
import { Conta } from '../model/conta.model';
import { ADSResposta } from '../model/ads-resposta.model';

@Injectable()
export class ContaService extends ServicoBaseService {
    constructor(protected http: Http) {
        super(http);
    }

    public salvar(conta: Conta): Observable<ADSResposta> {
        return this.enviarComandoPost('conta/salvar', { Conta: conta });
    }

    public excluir(conta: Conta): Observable<ADSResposta> {
        return this.enviarComandoPost('conta/excluir', { Conta: conta });
    }

    public obtemPeloCodigo(codigo: string): Observable<ADSResposta> {
        return this.obtemDadosPost<ADSResposta>('conta/obtemporcodigo', { Codigo: codigo });
    }

    public obtemLista(): Observable<Conta[]> {
        return this.obtemDadosPost<ADSResposta>('conta/obtem').map(
            m => {
                if (m.Sucesso) {
                    return m.Objeto as Conta[];
                } else {
                    return [];
                }
            }
        );
    }
}
