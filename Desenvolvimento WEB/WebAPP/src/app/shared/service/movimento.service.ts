import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ServicoBaseService } from './servico-base.service';
import { Movimento } from '../model/movimento.model';
import { ADSResposta } from '../model/ads-resposta.model';
import { MesAno } from './../model/mes-ano.model';

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
        );
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

    public obtemListaMes(mesAno: MesAno, efetivos: string = 'T'): Observable<Movimento[]> {
        const lista = this.obtemListaLocal<Movimento>('Movimento');
        const listaRetorno = lista.filter((f: Movimento) => {
            const arrData = String(f.Data).split('-');
            const ano = Number(arrData[0]);
            const mes = Number(arrData[1]);
            return (
                ano === mesAno.Ano &&
                mes === mesAno.Mes && (
                    efetivos === 'T' ||
                    (efetivos === 'S' && f.Efetivado) ||
                    (efetivos === 'N' && !f.Efetivado)
                )
            );
        });
        return new Observable<Movimento[]>(
            observer => {
                observer.next(listaRetorno);
                observer.complete();
            }
        );
    }
}
