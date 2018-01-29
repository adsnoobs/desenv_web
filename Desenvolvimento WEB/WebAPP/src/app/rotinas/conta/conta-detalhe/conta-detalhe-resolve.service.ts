import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Conta } from '../../../shared/model/conta.model';
import { ContaService } from '../../../shared/service/conta.service';

@Injectable()
export class ContaDetalheResolveService implements Resolve<Conta> {

    constructor(private contaService: ContaService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Conta | Observable<Conta> | Promise<Conta> {
        const id = route.params['id'];
        if (id && id !== '') {
            return this.contaService.obtemPeloCodigo(id).map(
                resposta => {
                    if (resposta && resposta.Sucesso && resposta.Objeto) {
                        return resposta.Objeto as Conta;
                    } else {
                        throw new Error(resposta.Mensagem);
                    }
                }
            ).toPromise()
                .catch(error => {
                    this.router.navigate(['conta']);
                    return null;
                });
        } else {
            return undefined;
        }
    }
}
