import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { GlobalService } from '../../../shared/service/global-variaveis.service';
import { Conta } from '../../../shared/model/conta.model';
import { ContaService } from '../../../shared/service/conta.service';
import { CanComponentDeactivate, CanDeactivateGuardService } from '../../../shared/service/can-deactivate-guard.service';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app-conta-detalhe',
    templateUrl: './conta-detalhe.component.html'
})
export class ContaDetalheComponent implements OnInit, OnDestroy {

    private dataSubs: Subscription;
    private excluirSubs: Subscription;
    public editando: boolean;
    public conta: Conta;
    public contaEdicao: Conta;

    constructor(
        private contaService: ContaService,
        private globalService: GlobalService,
        private router: Router,
        private activatedRouter: ActivatedRoute) {
        this.conta = new Conta();
        this.contaEdicao = new Conta();
    }

    canDeactivate(): Observable<boolean> | boolean {
        return new Observable<boolean>(
            observer => {
                let igual = true;
                for (const key in this.conta) {
                    // tslint:disable-next-line:triple-equals
                    if (this.conta[key] != this.contaEdicao[key]) {
                        igual = false;
                    }
                }
                if (igual) {
                    for (const key in this.contaEdicao) {
                        // tslint:disable-next-line:triple-equals
                        if (this.conta[key] != this.contaEdicao[key]) {
                            igual = false;
                        }
                    }
                }
                if (!igual) {
                    observer.next(confirm('Dados alterados, deseja continuar?'));
                } else {
                    observer.next(true);
                }
            }
        );
    }

    public salvar(e: Event) {
        e.preventDefault();
        this.contaService.salvar(this.contaEdicao).subscribe(
            resposta => {
                if (resposta.Sucesso) {
                    this.contaEdicao = undefined;
                    this.conta = undefined;
                    this.router.navigate(['conta']);
                } else {
                    alert(`Erro ao salvar a conta: ${resposta.Mensagem}`);
                }
            },
            erro => alert(`Erro ao salvar a conta: ${erro}`)
        );
    }

    public cancelar(e: Event) {
        e.preventDefault();
        this.router.navigate(['conta']);
    }

    public excluir(e: Event) {
        e.preventDefault();
        if (confirm('Deseja realmente excluir ?')) {
            if (this.excluirSubs) {
                this.excluirSubs.unsubscribe();
            }
            this.excluirSubs = this.contaService.excluir(this.contaEdicao).subscribe(
                resposta => {
                    if (resposta.Sucesso) {
                        this.router.navigate(['conta']);
                    } else {
                        alert(`Erro ao excluir a conta: ${resposta.Mensagem}`);
                    }
                },
                erro => {
                    alert(`Erro ao excluir a conta: ${erro}`);
                },
                () => { }
            );
        }
    }

    ngOnInit(): void {
        this.dataSubs = this.activatedRouter.data.subscribe(
            (data: { conta: Conta }) => {
                if (data.conta) {
                    this.editando = true;
                    Object.assign(this.conta, data.conta);
                } else {
                    this.conta.Codigo = '0';
                    this.editando = false;
                }
            }
        );
        Object.assign(this.contaEdicao, this.conta);
        if (this.editando) {
            this.globalService.atualizaNavegacaoAtual(`Editando a conta: ${this.conta.Codigo} - ${this.conta.Descricao}`);
        } else {
            this.globalService.atualizaNavegacaoAtual('Inclusão de conta');
        }
    }

    ngOnDestroy(): void {
        if (this.excluirSubs) {
            this.excluirSubs.unsubscribe();
        }
    }

}
