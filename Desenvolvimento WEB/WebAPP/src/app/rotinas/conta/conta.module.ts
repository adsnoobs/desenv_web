import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ContaRoutingModule } from './conta-routing.module';
import { ContaComponent } from './conta.component';
import { ContaDetalheComponent } from './conta-detalhe/conta-detalhe.component';
import { ContaListaComponent } from './conta-lista/conta-lista.component';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ContaRoutingModule,
        ComponentsModule
    ],
    declarations: [
        ContaComponent,
        ContaDetalheComponent,
        ContaListaComponent
    ]
})
export class ContaModule { }
