import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BaseChartDirective } from 'ng2-charts';

import { GlobalService } from '../../shared/service/global-variaveis.service';
import { DashBoardResumo } from '../../shared/model/dashboard-resumo.model';
import { MesAno } from '../../shared/model/mes-ano.model';
import { MovimentoService } from '../../shared/service/movimento.service';
import { ExtratoCategoria } from '../../shared/model/extrado-categoria.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  private mesAnoAtualSubs: Subscription;
  private dashboardResumoSubs: Subscription;
  public resumo: { DashBoardResumo: DashBoardResumo, Categorias: ExtratoCategoria[] };
  private mesAnoAtual: MesAno;

  // Doughnut
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType = 'doughnut';

  constructor(private globalService: GlobalService, private movimentoService: MovimentoService) {
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
    this.dashboardResumoSubs = this.movimentoService.obtemResumoMes(this.mesAnoAtual).subscribe(
      resumo => {
        this.resumo = resumo;
        this.resumo.DashBoardResumo.Previsao =
          this.resumo.DashBoardResumo.SaldoContas +
          this.resumo.DashBoardResumo.ReceitasAberto -
          this.resumo.DashBoardResumo.DespesasAberto;

        this.resumo.DashBoardResumo.Previsao = Math.round(this.resumo.DashBoardResumo.Previsao * 100) / 100;

        const valores = resumo.Categorias.map<number>(m => m.Debito);
        const labels = resumo.Categorias.map<string>(m => m.Categoria.Descricao);
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
