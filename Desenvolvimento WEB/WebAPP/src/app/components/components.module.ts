import { ChartsModule } from 'ng2-charts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Erro404Component } from './erro404/erro404.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        DashboardComponent,
        Erro404Component,
        LoginComponent
    ],
    exports: [
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChartsModule
    ]
})
export class ComponentsModule { }
