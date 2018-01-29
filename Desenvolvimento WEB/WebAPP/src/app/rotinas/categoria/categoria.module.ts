import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaComponent } from './categoria.component';
import { CategoriaDetalheComponent } from './categoria-detalhe/categoria-detalhe.component';
import { CategoriaListaComponent } from './categoria-lista/categoria-lista.component';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
        CategoriaRoutingModule
    ],
    declarations: [
        CategoriaComponent,
        CategoriaDetalheComponent,
        CategoriaListaComponent
    ]
})
export class CategoriaModule { }
