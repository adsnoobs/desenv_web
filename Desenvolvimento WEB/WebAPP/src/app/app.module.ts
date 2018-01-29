import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoriaService } from './shared/service/categoria.service';
import { ContaService } from './shared/service/conta.service';
import { MovimentoService } from './shared/service/movimento.service';
import { TipoMovimentoService } from './shared/service/tipo-movimento.service';
import { ComponentsModule } from './components/components.module';
import { ContaModule } from './rotinas/conta/conta.module';
import { CategoriaModule } from './rotinas/categoria/categoria.module';
import { MovimentoModule } from './rotinas/movimento/movimento.module';
import { TipoMovimentoModule } from './rotinas/tipo-movimento/tipo-movimento.module';
import { NavegacaoService } from './shared/service/navegacao.service';
import { GlobalService } from './shared/service/global-variaveis.service';
import { MesAnoService } from './shared/service/mes-ano.service';
import { LoginService } from './shared/service/login.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    ComponentsModule,
    ContaModule,
    CategoriaModule,
    MovimentoModule,
    TipoMovimentoModule
  ],
  providers: [
    CategoriaService,
    ContaService,
    MovimentoService,
    TipoMovimentoService,
    NavegacaoService,
    GlobalService,
    MesAnoService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
