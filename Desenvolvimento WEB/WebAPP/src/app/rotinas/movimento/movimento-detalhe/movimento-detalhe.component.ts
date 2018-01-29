import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { GlobalService } from '../../../shared/service/global-variaveis.service';
import { TipoMovimentoService } from '../../../shared/service/tipo-movimento.service';
import { Movimento } from '../../../shared/model/movimento.model';
import { TipoMovimento } from '../../../shared/model/tipo-movimento.model';
import { Conta } from '../../../shared/model/conta.model';
import { Categoria } from '../../../shared/model/categoria.model';
import { MovimentoService } from '../../../shared/service/movimento.service';
import { ContaService } from '../../../shared/service/conta.service';
import { CategoriaService } from '../../../shared/service/categoria.service';

@Component({
    selector: 'app-movimento-detalhe',
    templateUrl: './movimento-detalhe.component.html'
})
export class MovimentoDetalheComponent implements OnInit, OnDestroy {

    private dataSubs: Subscription;
    private tiposMovimentoSubs: Subscription;
    private contasSubs: Subscription;
    private categoriasSubs: Subscription;
    public movimento: Movimento;
    public movimentoEdicao: Movimento;
    public editando: boolean;
    public tiposMovimento: TipoMovimento[] = [];
    public contas: Conta[] = [];
    public categorias: Categoria[] = [];

    constructor(
        private globalService: GlobalService,
        private movimentoService: MovimentoService,
        private contaService: ContaService,
        private categoriaService: CategoriaService,
        private tipoMovimentoService: TipoMovimentoService,
        private router: Router,
        private activatedRouter: ActivatedRoute
    ) {
        this.movimento = new Movimento();
        this.movimentoEdicao = new Movimento();

        this.tiposMovimentoSubs = this.tipoMovimentoService.obtemLista().subscribe(
            tipos => this.tiposMovimento = tipos,
            erro => alert(`Erro ao carregar a lista de tipos de movimento: ${erro}`)
        );

        this.categoriasSubs = this.categoriaService.obtemLista().subscribe(
            categorias => this.categorias = categorias,
            erro => alert(`Erro ao carregar a lista de categorias: ${erro}`)
        );

        this.contasSubs = this.contaService.obtemLista().subscribe(
            contas => this.contas = contas,
            erro => alert(`Erro ao carregar a lista de contas: ${erro}`)
        );
    }

    canDeactivate(): Observable<boolean> | boolean {
        return new Observable<boolean>(
            observer => {
                let igual = true;
                for (const key in this.movimento) {
                    // tslint:disable-next-line:triple-equals
                    if (this.movimento[key] != this.movimentoEdicao[key]) {
                        igual = false;
                    }
                }
                if (igual) {
                    for (const key in this.movimentoEdicao) {
                        // tslint:disable-next-line:triple-equals
                        if (this.movimento[key] != this.movimentoEdicao[key]) {
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
            this.movimentoService.excluir(this.movimentoEdicao).subscribe(
                resposta => {
                    if (resposta.Sucesso) {
                        this.router.navigate(['movimento']);
                    } else {
                        alert(`Erro ao excluir o movimento: ${resposta.Mensagem}`);
                    }
                },
                erro => alert(`Erro ao excluir o movimento: ${erro}`)
            );
        }
    }

    public salvar(e: Event) {
        e.preventDefault();
        this.movimentoService.salvar(this.movimentoEdicao).subscribe(
            resposta => {
                if (resposta.Sucesso) {
                    this.movimento = undefined;
                    this.movimentoEdicao = undefined;
                    this.router.navigate(['movimento']);
                } else {
                    alert(`Erro ao salvar o movimento: ${resposta.Mensagem}`);
                }
            },
            erro => alert(`Erro ao salvar o movimento: ${erro}`)
        );
    }

    public cancelar(e: Event) {
        e.preventDefault();
        this.router.navigate(['movimento']);
    }

    ngOnInit(): void {
        this.dataSubs = this.activatedRouter.data.subscribe(
            (data: { movimento: Movimento }) => {
                if (data.movimento) {
                    this.editando = true;
                    Object.assign(this.movimento, data.movimento);
                } else {
                    this.movimento.Codigo = '0';
                    this.movimento.TipoMovimentoCodigo = '';
                    this.movimento.ContaCodigo = '';
                    this.movimento.CategoriaCodigo = '';
                    this.movimento.Efetivado = false;
                    this.editando = false;
                }
            }
        );
        Object.assign(this.movimentoEdicao, this.movimento);
        if (this.editando) {
            this.globalService.atualizaNavegacaoAtual(`Editando o movimento: ${this.movimento.Codigo} - ${this.movimento.Descricao}`);
        } else {
            this.globalService.atualizaNavegacaoAtual('Inclusão de movimento');
        }
    }

    ngOnDestroy(): void {
        if (this.dataSubs) {
            this.dataSubs.unsubscribe();
        }
    }
}
