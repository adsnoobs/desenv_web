import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Erro404Component } from './components/erro404/erro404.component';
import { CanActivateGuardService } from './shared/service/can-activate-guard.service';

const rotas: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [CanActivateGuardService]
    },
    {
        path: 'conta',
        loadChildren: 'app/rotinas/conta/conta.module#ContaModule'
    },
    {
        path: 'categoria',
        loadChildren: 'app/rotinas/categoria/categoria.module#CategoriaModule'
    },
    {
        path: 'tipomovimento',
        loadChildren: 'app/rotinas/tipo-movimento/tipo-movimento.module#TipoMovimentoModule'
    },
    {
        path: 'movimento',
        loadChildren: 'app/rotinas/movimento/movimento.module#MovimentoModule'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        component: Erro404Component
    }
];

@NgModule({
    imports: [RouterModule.forRoot(rotas)],
    exports: [RouterModule],
    providers: [ CanActivateGuardService ]
})
export class AppRoutingModule { }
