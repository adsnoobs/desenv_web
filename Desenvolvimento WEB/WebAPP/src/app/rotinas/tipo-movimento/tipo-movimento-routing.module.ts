import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Erro404Component } from '../../components/erro404/erro404.component';
import { TipoMovimentoComponent } from './tipo-movimento.component';
import { TipoMovimentoDetalheComponent } from './tipo-movimento-detalhe/tipo-movimento-detalhe.component';
import { TipoMovimentoListaComponent } from './tipo-movimento-lista/tipo-movimento-lista.component';
import { CanActivateGuardService } from '../../shared/service/can-activate-guard.service';
import { CanDeactivateGuardService } from '../../shared/service/can-deactivate-guard.service';
import { TipoMovimentoDetalheResolveService } from './tipo-movimento-detalhe/tipo-movimento-detalhe-resolve.service';

const rotasTipoMovimento: Routes = [
    {
        path: '',
        component: TipoMovimentoComponent,
        children: [
            {
                path: 'incluir',
                component: TipoMovimentoDetalheComponent,
                canActivate: [CanActivateGuardService],
                canDeactivate: [CanDeactivateGuardService]
            },
            {
                path: 'editar/:id',
                component: TipoMovimentoDetalheComponent,
                canActivate: [CanActivateGuardService],
                canDeactivate: [CanDeactivateGuardService],
                resolve: {
                    tipoMovimento: TipoMovimentoDetalheResolveService
                }
            },
            {
                path: '',
                component: TipoMovimentoListaComponent
            }
        ]
    },
    {
        path: '**',
        component: Erro404Component
    }
];

@NgModule({
    imports: [RouterModule.forChild(rotasTipoMovimento)],
    exports: [RouterModule],
    providers: [CanActivateGuardService, CanDeactivateGuardService, TipoMovimentoDetalheResolveService]
})
export class TipoMovimentoRoutingModule { }
