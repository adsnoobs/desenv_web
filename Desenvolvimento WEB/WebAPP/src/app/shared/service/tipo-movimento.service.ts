import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ServicoBaseService } from './servico-base.service';
import { TipoMovimento } from '../model/tipo-movimento.model';
import { ADSResposta } from '../model/ads-resposta.model';

@Injectable()
export class TipoMovimentoService extends ServicoBaseService {
    constructor(protected http: Http) {
        super(http);
    }

    public obtemPeloCodigo(codigo: string): Observable<ADSResposta> {
        return this.obtemDadosPost<ADSResposta>('tipomovimento/obtemporcodigo', { Codigo: codigo });
    }

    public obtemLista(): Observable<TipoMovimento[]> {
        return this.obtemDadosPost<ADSResposta>('tipomovimento/obtem').map(
            m => {
                if (m.Sucesso) {
                    return m.Objeto as TipoMovimento[];
                } else {
                    return [];
                }
            }
        );
    }

    public excluir(tipoMovimento: TipoMovimento): Observable<ADSResposta> {
        return this.enviarComandoPost('tipomovimento/excluir', { TipoMovimento: tipoMovimento });
    }

    public salvar(tipoMovimento: TipoMovimento): Observable<ADSResposta> {
        return this.enviarComandoPost('tipomovimento/salvar', { TipoMovimento: tipoMovimento });
    }
}
