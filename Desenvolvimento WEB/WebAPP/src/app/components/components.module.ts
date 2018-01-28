import { ChartsModule } from 'ng2-charts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Erro404Component } from './erro404/erro404.component';

@NgModule({
    declarations: [
        DashboardComponent,
        Erro404Component
    ],
    exports: [
    ],
    imports: [
        CommonModule,
        ChartsModule
    ]
})
export class ComponentsModule { }
