import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { GlobalService } from '../../shared/service/global-variaveis.service';
import { DashboardService } from '../../shared/service/dashboard.service';
import { DashboardResumo } from '../../shared/model/dashboard-resumo.model';
import { MesAno } from '../../shared/model/mes-ano.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private mesAnoAtualSubs: Subscription;
  private dashboardResumoSubs: Subscription;
  public dashboardResumo: DashboardResumo;
  private mesAnoAtual: MesAno;

  constructor(private globalService: GlobalService, private dashboardService: DashboardService) {
    this.mesAnoAtualSubs = this.globalService.mesAnoAtual$.subscribe(
      mesAnoAtual => {
        this.mesAnoAtual = mesAnoAtual;
        this.atualizaResumos();
      }
    );

    this.mesAnoAtual = this.globalService.obtemMesAnoAtual();
    this.atualizaResumos();
  }

  private atualizaResumos() {
    if (this.dashboardResumoSubs) {
      this.dashboardResumoSubs.unsubscribe();
    }
    this.dashboardResumoSubs = this.dashboardService.obtemResumoMes(this.mesAnoAtual.Mes, this.mesAnoAtual.Ano).subscribe(
      resumo => {
        this.dashboardResumo = resumo;
      },
      erro => alert(`Erro ao obter os dados de resumo: ${erro}`)
    );
  }

  ngOnInit(): void {
    this.globalService.atualizaNavegacaoAtual(undefined);
  }

  ngOnDestroy(): void {
    if (this.dashboardResumoSubs) {
      this.dashboardResumoSubs.unsubscribe();
    }
    if (this.mesAnoAtualSubs) {
      this.mesAnoAtualSubs.unsubscribe();
    }
  }

}
