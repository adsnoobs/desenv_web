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
        return new Observable<ADSResposta>(
            observer => {
                observer.next(this.salvarNaListaLocal<Conta>('Conta', conta, 'Codigo'));
                observer.complete();
            }
        );
    }

    public excluir(conta: Conta): Observable<ADSResposta> {
        const ads = new ADSResposta();
        ads.Sucesso = true;
        return new Observable<ADSResposta>(observer => {
            observer.next(this.excluirDaListaLocal('Conta', conta, 'Codigo'));
            observer.complete();
        });
    }

    public obtemPeloCodigo(codigo: string): Observable<Conta> {
        return new Observable<Conta>(
            observer => {
                observer.next(this.obtemPeloCodigoLocal<Conta>('Conta', 'Codigo', codigo));
                observer.complete();
            }
        );
    }

    public obtemLista(): Observable<Conta[]> {
        return new Observable<Conta[]>(
            observer => {
                observer.next(this.obtemListaLocal<Conta>('Conta'));
                observer.complete();
            }
        );
    }
}
