import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ADSResposta } from '../model/ads-resposta.model';

export class ServicoBaseService {

    private get URL_API(): string {
        return 'http://adsnoobs.azurewebsites.net/api/';
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
}
