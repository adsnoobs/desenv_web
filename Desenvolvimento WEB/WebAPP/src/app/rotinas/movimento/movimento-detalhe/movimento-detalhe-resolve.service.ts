import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Movimento } from '../../../shared/model/movimento.model';
import { MovimentoService } from '../../../shared/service/movimento.service';

@Injectable()
export class MovimentoDetalheResolveService implements Resolve<Movimento> {

    constructor(private movimentoService: MovimentoService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Movimento | Observable<Movimento> | Promise<Movimento> {
        const id = route.params['id'];
        if (id && id !== '') {
            return this.movimentoService.obtemPeloCodigo(id).map(
                movimento => {
                    if (movimento) {
                        return movimento;
                    } else {
                        this.router.navigate(['movimento']);
                        return null;
                    }
                }
            ).toPromise()
                .catch(error => {
                    this.router.navigate(['movimento']);
                    return null;
                });
        } else {
            return undefined;
        }
    }
}