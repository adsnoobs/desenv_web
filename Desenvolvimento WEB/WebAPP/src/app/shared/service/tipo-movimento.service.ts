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

    public obtemPeloCodigo(codigo: string): Observable<TipoMovimento> {
        return new Observable<TipoMovimento>(
            observer => {
                observer.next(this.obtemPeloCodigoLocal<TipoMovimento>('TipoMovimento', 'Codigo', codigo));
                observer.complete();
            }
        );
    }

    public obtemLista(): Observable<TipoMovimento[]> {
        return new Observable<TipoMovimento[]>(
            observer => {
                observer.next(this.obtemListaLocal<TipoMovimento>('TipoMovimento'));
                observer.complete();
            }
        );
    }

    public excluir(tipoMovimento: TipoMovimento): Observable<ADSResposta> {
        return new Observable<ADSResposta>(
            observer => {
                observer.next(this.excluirDaListaLocal<TipoMovimento>('TipoMovimento', tipoMovimento, 'Codigo'));
                observer.complete();
            }
        );
    }

    public salvar(tipoMovimento: TipoMovimento): Observable<ADSResposta> {
        return new Observable<ADSResposta>(
            observer => {
                observer.next(this.salvarNaListaLocal<TipoMovimento>('TipoMovimento', tipoMovimento, 'Codigo'));
                observer.complete();
            }
        );
    }
}
