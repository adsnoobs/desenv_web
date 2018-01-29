import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components/components.module';
import { TipoMovimentoRoutingModule } from './tipo-movimento-routing.module';
import { TipoMovimentoComponent } from './tipo-movimento.component';
import { TipoMovimentoDetalheComponent } from './tipo-movimento-detalhe/tipo-movimento-detalhe.component';
import { TipoMovimentoListaComponent } from './tipo-movimento-lista/tipo-movimento-lista.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
        TipoMovimentoRoutingModule
    ],
    declarations: [
        TipoMovimentoComponent,
        TipoMovimentoDetalheComponent,
        TipoMovimentoListaComponent
    ]
})
export class TipoMovimentoModule { }
