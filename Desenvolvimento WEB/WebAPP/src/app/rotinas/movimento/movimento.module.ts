import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components/components.module';
import { MovimentoComponent } from './movimento.component';
import { MovimentoRoutingModule } from './movimento-routing.module';
import { MovimentoDetalheComponent } from './movimento-detalhe/movimento-detalhe.component';
import { MovimentoListaComponent } from './movimento-lista/movimento-lista.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
        MovimentoRoutingModule
    ],
    declarations: [
        MovimentoComponent,
        MovimentoDetalheComponent,
        MovimentoListaComponent
    ]
})
export class MovimentoModule { }
