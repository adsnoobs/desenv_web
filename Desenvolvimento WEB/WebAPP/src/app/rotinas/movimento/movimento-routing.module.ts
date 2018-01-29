import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Erro404Component } from '../../components/erro404/erro404.component';
import { MovimentoComponent } from './movimento.component';
import { MovimentoDetalheComponent } from './movimento-detalhe/movimento-detalhe.component';
import { MovimentoListaComponent } from './movimento-lista/movimento-lista.component';
import { CanActivateGuardService } from '../../shared/service/can-activate-guard.service';
import { CanDeactivateGuardService } from '../../shared/service/can-deactivate-guard.service';
import { MovimentoDetalheResolveService } from './movimento-detalhe/movimento-detalhe-resolve.service';

const rotasMovimento: Routes = [
    {
        path: '',
        component: MovimentoComponent,
        children: [
            {
                path: 'incluir',
                component: MovimentoDetalheComponent,
                canActivate: [CanActivateGuardService],
                canDeactivate: [CanDeactivateGuardService]
            },
            {
                path: 'editar/:id',
                component: MovimentoDetalheComponent,
                canActivate: [CanActivateGuardService],
                canDeactivate: [CanDeactivateGuardService],
                resolve: {
                    movimento: MovimentoDetalheResolveService
                }
            },
            {
                path: '',
                component: MovimentoListaComponent,
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
    imports: [RouterModule.forChild(rotasMovimento)],
    exports: [RouterModule],
    providers: [CanActivateGuardService, CanDeactivateGuardService, MovimentoDetalheResolveService]
})
export class MovimentoRoutingModule { }
