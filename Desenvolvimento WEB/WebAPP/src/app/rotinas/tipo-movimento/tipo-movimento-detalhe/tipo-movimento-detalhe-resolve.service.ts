import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { TipoMovimento } from '../../../shared/model/tipo-movimento.model';
import { TipoMovimentoService } from '../../../shared/service/tipo-movimento.service';

@Injectable()
export class TipoMovimentoDetalheResolveService implements Resolve<TipoMovimento> {

    constructor(private tipoMovimentoService: TipoMovimentoService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): TipoMovimento | Observable<TipoMovimento> | Promise<TipoMovimento> {
        const id = route.params['id'];
        if (id && id !== '') {
            return this.tipoMovimentoService.obtemPeloCodigo(id).map(
                resposta => {
                    if (resposta && resposta.Sucesso && resposta.Objeto) {
                        return resposta.Objeto as TipoMovimento;
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
