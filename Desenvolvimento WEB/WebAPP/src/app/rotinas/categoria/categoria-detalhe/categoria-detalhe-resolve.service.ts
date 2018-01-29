import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Categoria } from '../../../shared/model/Categoria.model';
import { CategoriaService } from '../../../shared/service/categoria.service';

@Injectable()
export class CategoriaDetalheResolveService implements Resolve<Categoria> {

    constructor(private categoriaService: CategoriaService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Categoria | Observable<Categoria> | Promise<Categoria> {
        const id = route.params['id'];
        if (id && id !== '') {
            return this.categoriaService.obtemPeloCodigo(id).map(
                categoria => {
                    if (categoria) {
                        return categoria;
                    } else {
                        this.router.navigate(['categoria']);
                        return null;
                    }
                }
            ).toPromise()
                .catch(error => {
                    this.router.navigate(['categoria']);
                    return null;
                });
        } else {
            return undefined;
        }
    }
}
