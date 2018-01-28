import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ServicoBaseService } from './servico-base.service';
import { Categoria } from '../model/categoria.model';
import { ADSResposta } from '../model/ads-resposta.model';

@Injectable()
export class CategoriaService extends ServicoBaseService {
    constructor(protected http: Http) {
        super(http);
    }

    public obtemPeloCodigo(codigo: string): Observable<Categoria> {
        return new Observable<Categoria>(
            observer => {
                observer.next(this.obtemPeloCodigoLocal<Categoria>('Categoria', 'Codigo', codigo));
                observer.complete();
            }
        );
    }

    public obtemLista(): Observable<Categoria[]> {
        return new Observable<Categoria[]>(
            observer => {
                observer.next(this.obtemListaLocal<Categoria>('Categoria'));
                observer.complete();
            }
        );
    }

    public excluir(categoria: Categoria): Observable<ADSResposta> {
        return new Observable<ADSResposta>(
            observer => {
                observer.next(this.excluirDaListaLocal<Categoria>('Categoria', categoria, 'Codigo'));
                observer.complete();
            }
        );
    }

    public salvar(categoria: Categoria): Observable<ADSResposta> {
        return new Observable<ADSResposta>(
            observer => {
                observer.next(this.salvarNaListaLocal<Categoria>('Categoria', categoria, 'Codigo'));
                observer.complete();
            }
        );
    }
}
