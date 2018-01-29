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

    public obtemPeloCodigo(codigo: string): Observable<ADSResposta> {
        return this.obtemDadosPost<ADSResposta>('categoria/obtemporcodigo', { Codigo: codigo });
    }

    public obtemLista(): Observable<Categoria[]> {
        return this.obtemDadosPost<ADSResposta>('categoria/obtem').map(
            m => {
                if (m.Sucesso) {
                    return m.Objeto as Categoria[];
                } else {
                    return [];
                }
            }
        );
    }

    public excluir(categoria: Categoria): Observable<ADSResposta> {
        return this.enviarComandoPost('categoria/excluir', { Categoria: categoria });
    }

    public salvar(categoria: Categoria): Observable<ADSResposta> {
        return this.enviarComandoPost('categoria/salvar', { Categoria: categoria });
    }
}
