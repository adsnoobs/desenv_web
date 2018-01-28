import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { GlobalService } from '../../../shared/service/global-variaveis.service';
import { TipoMovimento } from '../../../shared/model/tipo-movimento.model';
import { TipoMovimentoService } from '../../../shared/service/tipo-movimento.service';

@Component({
    selector: 'app-tipo-movimento-lista',
    templateUrl: './tipo-movimento-lista.component.html'
})
export class TipoMovimentoListaComponent implements OnInit, OnDestroy {

    private tiposMovimentoSubs: Subscription;
    private excluirSubs: Subscription;
    public tiposMovimento: TipoMovimento[] = [];

    constructor(private globalService: GlobalService, private tipoMovimentoService: TipoMovimentoService, private router: Router) {
        this.atualizarLista();
    }

    private atualizarLista() {
        if (this.tiposMovimentoSubs) {
            this.tiposMovimentoSubs.unsubscribe();
        }
        this.tiposMovimentoSubs = this.tipoMovimentoService.obtemLista().subscribe(
            tiposMovimentos => {
                this.tiposMovimento = tiposMovimentos;
            }
        );
    }

    public editar(e: Event, tipoMovimento: TipoMovimento) {
        e.preventDefault();
        this.router.navigate(['tipomovimento', 'editar', tipoMovimento.Codigo]);
    }

    public incluir(e: Event) {
        e.preventDefault();
        this.router.navigate(['tipomovimento', 'incluir']);
    }

    public excluir(e: Event, tipoMovimento: TipoMovimento) {
        e.preventDefault();
        if (confirm('Deseja realmente excluir ?')) {
            if (this.excluirSubs) {
                this.excluirSubs.unsubscribe();
            }
            this.tipoMovimentoService.excluir(tipoMovimento).subscribe(
                resposta => {
                    if (resposta.Sucesso) {
                        this.atualizarLista();
                    } else {
                        alert(`Erro ao excluir o tipo de movimento: ${resposta.Mensagem}`);
                    }
                },
                erro => alert(`Erro ao excluir o tipo de movimento: ${erro}`)
            );
        }
    }

    ngOnInit(): void {
        this.globalService.atualizaNavegacaoAtual('Lista de tipos de movimento');
    }

    ngOnDestroy(): void {
        if (this.tiposMovimentoSubs) {
            this.tiposMovimentoSubs.unsubscribe();
        }
        if (this.excluirSubs) {
            this.excluirSubs.unsubscribe();
        }
    }
}
