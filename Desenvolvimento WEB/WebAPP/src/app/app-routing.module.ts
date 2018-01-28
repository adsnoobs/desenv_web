import { RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Erro404Component } from './components/erro404/erro404.component';

const rotas: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
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
        path: '**',
        component: Erro404Component
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(rotas) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
