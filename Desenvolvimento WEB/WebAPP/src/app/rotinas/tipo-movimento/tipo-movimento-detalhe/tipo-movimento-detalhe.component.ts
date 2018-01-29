import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { GlobalService } from '../../../shared/service/global-variaveis.service';
import { TipoMovimentoService } from '../../../shared/service/tipo-movimento.service';
import { TipoMovimento } from '../../../shared/model/tipo-movimento.model';

@Component({
    selector: 'app-tipo-movimento-detalhe',
    templateUrl: './tipo-movimento-detalhe.component.html'
})
export class TipoMovimentoDetalheComponent implements OnInit, OnDestroy {

    private dataSubs: Subscription;
    public tipoMovimento: TipoMovimento;
    public tipoMovimentoEdicao: TipoMovimento;
    public editando: boolean;

    constructor(
        private globalService: GlobalService,
        private tipoMovimentoService: TipoMovimentoService,
        private router: Router,
        private activatedRouter: ActivatedRoute) {
        this.tipoMovimento = new TipoMovimento();
        this.tipoMovimentoEdicao = new TipoMovimento();
    }

    canDeactivate(): Observable<boolean> | boolean {
        return new Observable<boolean>(
            observer => {
                let igual = true;
                for (const key in this.tipoMovimento) {
                    // tslint:disable-next-line:triple-equals
                    if (this.tipoMovimento[key] != this.tipoMovimentoEdicao[key]) {
                        igual = false;
                    }
                }
                if (igual) {
                    for (const key in this.tipoMovimentoEdicao) {
                        // tslint:disable-next-line:triple-equals
                        if (this.tipoMovimento[key] != this.tipoMovimentoEdicao[key]) {
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

    public excluir(e: Event) {
        e.preventDefault();
        if (confirm('Deseja realmente excluir ?')) {
            this.tipoMovimentoService.excluir(this.tipoMovimentoEdicao).subscribe(
                resposta => {
                    if (resposta.Sucesso) {
                        this.router.navigate(['tipomovimento']);
                    } else {
                        alert(`Erro ao excluir o tipo de movimento: ${resposta.Mensagem}`);
                    }
                },
                erro => alert(`Erro ao excluir o tipo de movimento: ${erro}`)
            );
        }
    }

    public salvar(e: Event) {
        e.preventDefault();
        this.tipoMovimentoService.salvar(this.tipoMovimentoEdicao).subscribe(
            resposta => {
                if (resposta.Sucesso) {
                    this.tipoMovimento = undefined;
                    this.tipoMovimentoEdicao = undefined;
                    this.router.navigate(['tipomovimento']);
                } else {
                    alert(`Erro ao salvar o tipo de movimento: ${resposta.Mensagem}`);
                }
            },
            erro => alert(`Erro ao salvar o tipo de movimento: ${erro}`)
        );
    }

    public cancelar(e: Event) {
        e.preventDefault();
        this.router.navigate(['tipomovimento']);
    }

    ngOnInit(): void {
        this.dataSubs = this.activatedRouter.data.subscribe(
            (data: { tipoMovimento: TipoMovimento }) => {
                if (data.tipoMovimento) {
                    this.editando = true;
                    Object.assign(this.tipoMovimento, data.tipoMovimento);
                } else {
                    this.tipoMovimento.Codigo = '0';
                    this.tipoMovimento.CreditoDebito = '';
                    this.editando = false;
                }
            }
        );
        Object.assign(this.tipoMovimentoEdicao, this.tipoMovimento);
        if (this.editando) {
            this.globalService.atualizaNavegacaoAtual(
                `Editando o tipo de movimento: ${this.tipoMovimento.Codigo} - ${this.tipoMovimento.Descricao}`);
        } else {
            this.globalService.atualizaNavegacaoAtual('Inclusão de tipo de movimento');
        }
    }

    ngOnDestroy(): void {
        if (this.dataSubs) {
            this.dataSubs.unsubscribe();
        }
    }
}
