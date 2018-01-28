import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { GlobalService } from '../../../shared/service/global-variaveis.service';
import { Conta } from '../../../shared/model/conta.model';
import { ContaService } from '../../../shared/service/conta.service';

@Component({
    selector: 'app-conta-lista',
    templateUrl: './conta-lista.component.html'
})
export class ContaListaComponent implements OnInit, OnDestroy {
    private contasSubs: Subscription;
    private excluirSubs: Subscription;
    public contas: Conta[] = [];

    constructor(private globalService: GlobalService, private contaService: ContaService, private router: Router) {
        this.atualizarLista();
    }

    private atualizarLista() {
        if (this.contasSubs) {
            this.contasSubs.unsubscribe();
        }
        this.contasSubs = this.contaService.obtemLista().subscribe(
            contas => {
                this.contas = contas;
            }
        );
    }

    public editar(e: Event, conta: Conta) {
        e.preventDefault();
        this.router.navigate(['conta', 'editar', conta.Codigo]);
    }

    public incluir(e: Event) {
        e.preventDefault();
        this.router.navigate(['conta', 'incluir']);
    }

    public excluir(e: Event, conta: Conta) {
        e.preventDefault();
        if (confirm('Deseja realmente excluir ?')) {
            if (this.excluirSubs) {
                this.excluirSubs.unsubscribe();
            }
            this.contaService.excluir(conta).subscribe(
                resposta => {
                    if (resposta.Sucesso) {
                        this.atualizarLista();
                    } else {
                        alert(`Erro ao excluir a conta: ${resposta.Mensagem}`);
                    }
                },
                erro => alert(`Erro ao excluir a conta: ${erro}`)
            );
        }
    }

    ngOnInit(): void {
        this.globalService.atualizaNavegacaoAtual('Lista de contas');
    }
    ngOnDestroy(): void {
        if (this.contasSubs) {
            this.contasSubs.unsubscribe();
        }
        if (this.excluirSubs) {
            this.excluirSubs.unsubscribe();
        }
    }
}
