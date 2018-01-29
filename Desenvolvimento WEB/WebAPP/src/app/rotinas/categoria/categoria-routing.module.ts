import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Erro404Component } from '../../components/erro404/erro404.component';
import { CategoriaListaComponent } from './categoria-lista/categoria-lista.component';
import { CategoriaDetalheComponent } from './categoria-detalhe/categoria-detalhe.component';
import { CategoriaComponent } from './categoria.component';
import { CategoriaDetalheResolveService } from './categoria-detalhe/categoria-detalhe-resolve.service';
import { CanActivateGuardService } from '../../shared/service/can-activate-guard.service';
import { CanDeactivateGuardService } from '../../shared/service/can-deactivate-guard.service';

const rotasCategoria: Routes = [
    {
        path: '',
        component: CategoriaComponent,
        children: [
            {
                path: 'incluir',
                component: CategoriaDetalheComponent,
                canDeactivate: [CanDeactivateGuardService],
                canActivate: [CanActivateGuardService]
            },
            {
                path: 'editar/:id',
                component: CategoriaDetalheComponent,
                canDeactivate: [CanDeactivateGuardService],
                canActivate: [CanActivateGuardService],
                resolve: {
                    categoria: CategoriaDetalheResolveService
                }
            },
            {
                path: '',
                component: CategoriaListaComponent,
                canActivate: [ CanActivateGuardService ]
            }
        ]
    },
    {
        path: '**',
        component: Erro404Component
    }
];

@NgModule({
    imports: [RouterModule.forChild(rotasCategoria)],
    exports: [RouterModule],
    providers: [CategoriaDetalheResolveService, CanActivateGuardService, CanDeactivateGuardService]
})
export class CategoriaRoutingModule { }
