import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ADSResposta } from '../model/ads-resposta.model';

@Injectable()
export class LoginService {

    public redirecionar: string;

    constructor() { }

    public login(email: string, senha: string): Observable<ADSResposta> {
        return new Observable<ADSResposta>(
            observer => {
                const local = { email: email };
                const resposta = new ADSResposta();
                resposta.Sucesso = true;
                if (email !== senha) {
                    resposta.Sucesso = false;
                    resposta.Mensagem = 'Usuário ou senha inválidos';
                } else {
                    localStorage.setItem('login', JSON.stringify(local));
                }
                observer.next(resposta);
                observer.complete();
            }
        );
    }

    public estaLogado(): boolean {
        const local = localStorage.getItem('login');
        if (local) {
            return true;
        }
        return false;
    }

    public sair() {
        localStorage.removeItem('login');
    }
}
