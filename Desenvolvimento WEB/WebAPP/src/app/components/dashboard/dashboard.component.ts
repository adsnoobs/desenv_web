import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BaseChartDirective } from 'ng2-charts';

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
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  private mesAnoAtualSubs: Subscription;
  private dashboardResumoSubs: Subscription;
  public resumo: { dashboardResumo: DashboardResumo, categorias: { codigo: string, descricao: string, valor: number }[] };
  private mesAnoAtual: MesAno;

  // Doughnut
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType = 'doughnut';

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
    this.dashboardResumoSubs = this.dashboardService.obtemResumoMes(this.mesAnoAtual).subscribe(
      resumo => {
        this.resumo = resumo;
        const valores = resumo.categorias.map<number>(m => m.valor);
        const labels = resumo.categorias.map<string>(m => m.descricao);
        this.doughnutChartData = (valores && valores.length > 0 ? valores : [0]);
        this.doughnutChartLabels = (labels && labels.length > 0 ? labels : ['']);
        setTimeout(() => {
          if (this.chart && this.chart.chart && this.chart.chart.config) {
              this.chart.chart.config.data.labels = labels;
              this.chart.chart.update();
          }
      });
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
