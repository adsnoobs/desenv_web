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
        CommonModule
    ]
})
export class ComponentsModule { }
