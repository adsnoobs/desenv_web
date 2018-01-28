import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ServicoBaseService } from './servico-base.service';
import { Movimento } from '../model/movimento.model';
import { ADSResposta } from '../model/ads-resposta.model';

@Injectable()
export class MovimentoService extends ServicoBaseService {
    constructor(protected http: Http) {
        super(http);
    }

    public obtemPeloCodigo(codigo: string): Observable<Movimento> {
        return new Observable<Movimento>(
            observer => {
                observer.next(this.obtemPeloCodigoLocal<Movimento>('Movimento', 'Codigo', codigo));
                observer.complete();
            }
        )
    }

    public obtemLista(): Observable<Movimento[]> {
        return new Observable<Movimento[]>(
            observer => {
                observer.next(this.obtemListaLocal<Movimento>('Movimento'));
                observer.complete();
            }
        );
    }

    public excluir(movimento: Movimento): Observable<ADSResposta> {
        return new Observable<ADSResposta>(
            observer => {
                observer.next(this.excluirDaListaLocal<Movimento>('Movimento', movimento, 'Codigo'));
                observer.complete();
            }
        );
    }

    public salvar(movimento: Movimento): Observable<ADSResposta> {
        return new Observable<ADSResposta>(
            observer => {
                observer.next(this.salvarNaListaLocal<Movimento>('Movimento', movimento, 'Codigo'));
                observer.complete();
            }
        );
    }
}
