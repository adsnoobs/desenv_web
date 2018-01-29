import { Component, OnDestroy } from '@angular/core';

import { NavegacaoService } from './shared/service/navegacao.service';
import { Subscription } from 'rxjs/Subscription';
import { Navegacao } from './shared/model/navegacao.model';
import { GlobalService } from './shared/service/global-variaveis.service';
import { MesAnoService } from './shared/service/mes-ano.service';
import { MesAno } from './shared/model/mes-ano.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  
  private navegacaoAtualSubs: Subscription;
  private listaNavegacaoSubs: Subscription;
  private mesAnoAtualSubs: Subscription;
  public listaNavegacao: Navegacao[] = [];
  public navegacaoAtual: string;
  public mesAnoAtual: MesAno;
  public nomeAplicativo = 'AppFinanças'

  constructor(private navegacaoService: NavegacaoService, private globalService: GlobalService, private mesAnoService: MesAnoService) {
    this.listaNavegacaoSubs = this.navegacaoService.obtemItem().subscribe(
      item => {
        this.listaNavegacao.push(item);
      },
      erro => alert(`Erro na pesquisa da navegacao: ${erro}`)
    );

    this.navegacaoAtualSubs = this.globalService.navegacaoAtual$.subscribe(
      navegacaoAtual => this.navegacaoAtual = navegacaoAtual
    );

    this.mesAnoAtual = this.mesAnoService.obtemMesAnoAtual();
    this.globalService.atualizaMesAnoAtual(this.mesAnoAtual);
  }

  public mesAnterior(e: Event) {
    e.preventDefault();
    this.mesAnoAtual = this.mesAnoService.obtemMesAnterior(this.mesAnoAtual);
    this.globalService.atualizaMesAnoAtual(this.mesAnoAtual);
  }

  public mesPosterior(e: Event) {
    e.preventDefault();
    this.mesAnoAtual = this.mesAnoService.obtemMesPosterior(this.mesAnoAtual);
    this.globalService.atualizaMesAnoAtual(this.mesAnoAtual);
  }

  ngOnDestroy(): void {
    if (this.listaNavegacaoSubs) {
      this.listaNavegacaoSubs.unsubscribe();
    }
    if (this.navegacaoAtualSubs) {
      this.navegacaoAtualSubs.unsubscribe();
    }
    if (this.mesAnoAtualSubs) {
      this.mesAnoAtualSubs.unsubscribe();
    }
  }
}
