import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ADSResposta } from '../model/ads-resposta.model';

export class ServicoBaseService {

    private get URL_API(): string {
        return 'http://localhost:50173/api/';
    }

    private get HEADER(): Headers {
        const headers = new Headers();
        headers.append('Content-type', 'application/json');
        headers.append('Accept', 'application/json');
        return headers;
    }

    constructor(protected http: Http) { }

    protected obtemDadosPost<T>(url: string, param: any = {}): Observable<T> {
        return this.http.post(`${this.URL_API}${url}`, param, { headers: this.HEADER }).map(res => res.json() as T);
    }

    protected enviarComandoPost(url: string, param: any = {}): Observable<ADSResposta> {
        return this.http.post(`${this.URL_API}${url}`, param, { headers: this.HEADER }).map(res => res.json() as ADSResposta);
    }

    protected salvarNaListaLocal<T>(nome: string, objeto: any, chave: string): ADSResposta {
        const json = localStorage.getItem(nome);
        let lista = ([] as T[]);
        if (json) {
            lista = (JSON.parse(json) as T[]);
        }
        let index = -1;
        if (lista && lista.length > 0) {
            index = lista.findIndex((f: T) => {
                return f[chave] === objeto[chave];
            });
            if (index >= 0) {
                lista.splice(index, 1);
            } else {
            }
        }
        if (String(objeto[chave]) === '0') {
            objeto[chave] = String((!lista ? 1 : lista.length + 1));
        }
        lista.push(objeto);
        localStorage.setItem(nome, JSON.stringify(lista));
        const resposta = new ADSResposta();
        resposta.Sucesso = true;
        return resposta;
    }

    protected excluirDaListaLocal<T>(nome: string, objeto: any, chave: string): ADSResposta {
        const json = localStorage.getItem(nome);
        let lista = ([] as T[]);
        if (json) {
            lista = (JSON.parse(json) as T[]);
        }
        if (lista && lista.length > 0) {
            const index = lista.findIndex((f: T) => {
                return f[chave] === objeto[chave];
            });
            if (index >= 0) {
                lista.splice(index, 1);
            }
        }
        localStorage.setItem(nome, JSON.stringify(lista));
        const resposta = new ADSResposta();
        resposta.Sucesso = true;
        return resposta;
    }

    protected obtemListaLocal<T>(nome: string): T[] {
        const json = localStorage.getItem(nome);
        let lista = ([] as T[]);
        if (json) {
            lista = (JSON.parse(json) as T[]);
        }
        return lista;
    }

    protected obtemPeloCodigoLocal<T>(nome: string, chave: string, codigo: string): T {
        const json = localStorage.getItem(nome);
        let lista = ([] as T[]);
        if (json) {
            lista = (JSON.parse(json) as T[]);
            if (lista) {
                const item = lista.find((f: T) => {
                    return f[chave] === codigo;
                });
                return item;
            }
        }
        return undefined;
    }

}
