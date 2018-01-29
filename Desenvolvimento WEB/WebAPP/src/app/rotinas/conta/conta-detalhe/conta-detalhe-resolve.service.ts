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
                conta => {
                    if (conta) {
                        return conta;
                    } else {
                        this.router.navigate(['conta']);
                        return null;
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
