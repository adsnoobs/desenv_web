import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { GlobalService } from '../../../shared/service/global-variaveis.service';
import { Movimento } from '../../../shared/model/movimento.model';
import { MovimentoService } from '../../../shared/service/movimento.service';
import { MesAno } from '../../../shared/model/mes-ano.model';

@Component({
    selector: 'app-movimento-lista',
    templateUrl: './movimento-lista.component.html'
})
export class MovimentoListaComponent implements OnInit, OnDestroy {

    private movimentosSubs: Subscription;
    private mesAnoAtualSubs: Subscription;
    private excluirSubs: Subscription;
    public movimentos: Movimento[] = [];

    constructor(private globalService: GlobalService, private movimentoService: MovimentoService, private router: Router) {
        this.mesAnoAtualSubs = this.globalService.mesAnoAtual$.subscribe(
            mesAno => {
                this.atualizarLista(mesAno);
            }
        );
        if (this.globalService.obtemMesAnoAtual()) {
            this.atualizarLista(this.globalService.obtemMesAnoAtual());
        }
    }

    private atualizarLista(mesAno: MesAno) {
        if (this.movimentosSubs) {
            this.movimentosSubs.unsubscribe();
        }
        this.movimentosSubs = this.movimentoService.obtemLista().subscribe(
            movimentos => {
                this.movimentos = movimentos.filter((f: Movimento) => {
                    const arrData = f.Data.split('-');
                    const ano = Number(arrData[0]);
                    const mes = Number(arrData[1]);
                    return ano === mesAno.Ano && mes === mesAno.Mes;
                });
            }
        );
    }

    public editar(e: Event, movimento: Movimento) {
        e.preventDefault();
        this.router.navigate(['movimento', 'editar', movimento.Codigo]);
    }

    public incluir(e: Event) {
        e.preventDefault();
        this.router.navigate(['movimento', 'incluir']);
    }

    public excluir(e: Event, tipoMovimento: Movimento) {
        e.preventDefault();
        if (confirm('Deseja realmente excluir ?')) {
            if (this.excluirSubs) {
                this.excluirSubs.unsubscribe();
            }
            this.movimentoService.excluir(tipoMovimento).subscribe(
                resposta => {
                    if (resposta.Sucesso) {
                        this.atualizarLista(this.globalService.obtemMesAnoAtual());
                    } else {
                        alert(`Erro ao excluir o movimento: ${resposta.Mensagem}`);
                    }
                },
                erro => alert(`Erro ao excluir o movimento: ${erro}`)
            );
        }
    }

    ngOnInit(): void {
        this.globalService.atualizaNavegacaoAtual('Lista de movimentos');
    }

    ngOnDestroy(): void {
        if (this.movimentosSubs) {
            this.movimentosSubs.unsubscribe();
        }
        if (this.excluirSubs) {
            this.excluirSubs.unsubscribe();
        }
    }
}
