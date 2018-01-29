import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContaComponent } from './conta.component';
import { ContaListaComponent } from './conta-lista/conta-lista.component';
import { ContaDetalheComponent } from './conta-detalhe/conta-detalhe.component';
import { Erro404Component } from '../../components/erro404/erro404.component';
import { ContaDetalheResolveService } from './conta-detalhe/conta-detalhe-resolve.service';
import { CanDeactivateGuardService } from '../../shared/service/can-deactivate-guard.service';
import { CanActivateGuardService } from '../../shared/service/can-activate-guard.service';

const rotasConta: Routes = [
    {
        path: '',
        component: ContaComponent,
        children: [
            {
                path: 'incluir',
                component: ContaDetalheComponent,
                canDeactivate: [CanDeactivateGuardService],
                canActivate: [CanActivateGuardService]
            },
            {
                path: 'editar/:id',
                component: ContaDetalheComponent,
                canDeactivate: [CanDeactivateGuardService],
                canActivate: [CanActivateGuardService],
                resolve: {
                    conta: ContaDetalheResolveService
                }
            },
            {
                path: '',
                component: ContaListaComponent
            }
        ]
    },
    {
        path: '**',
        component: Erro404Component
    }
];

@NgModule({
    imports: [RouterModule.forChild(rotasConta)],
    exports: [RouterModule],
    providers: [ContaDetalheResolveService, CanDeactivateGuardService, CanActivateGuardService]
})
export class ContaRoutingModule { }
