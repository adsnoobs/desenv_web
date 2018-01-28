import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { GlobalService } from '../../../shared/service/global-variaveis.service';
import { CategoriaService } from '../../../shared/service/categoria.service';
import { Categoria } from '../../../shared/model/categoria.model';

@Component({
    selector: 'app-categoria-detalhe',
    templateUrl: './categoria-detalhe.component.html'
})
export class CategoriaDetalheComponent implements OnInit, OnDestroy {

    private dataSubs: Subscription;
    public categoria: Categoria;
    public categoriaEdicao: Categoria;
    public editando: boolean;

    constructor(
        private globalService: GlobalService,
        private categoriaService: CategoriaService,
        private router: Router,
        private activatedRouter: ActivatedRoute) {
        this.categoria = new Categoria();
        this.categoriaEdicao = new Categoria();
    }

    canDeactivate(): Observable<boolean> | boolean {
        return new Observable<boolean>(
            observer => {
                let igual = true;
                for (const key in this.categoria) {
                    // tslint:disable-next-line:triple-equals
                    if (this.categoria[key] != this.categoriaEdicao[key]) {
                        igual = false;
                    }
                }
                if (igual) {
                    for (const key in this.categoriaEdicao) {
                        // tslint:disable-next-line:triple-equals
                        if (this.categoria[key] != this.categoriaEdicao[key]) {
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
            this.categoriaService.excluir(this.categoriaEdicao).subscribe(
                resposta => {
                    if (resposta.Sucesso) {
                        this.router.navigate(['categoria']);
                    } else {
                        alert(`Erro ao excluir a categoria: ${resposta.Mensagem}`);
                    }
                },
                erro => alert(`Erro ao excluir a categoria: ${erro}`)
            );
        }
    }

    public salvar(e: Event) {
        e.preventDefault();
        this.categoriaService.salvar(this.categoriaEdicao).subscribe(
            resposta => {
                if (resposta.Sucesso) {
                    this.categoria = undefined;
                    this.categoriaEdicao = undefined;
                    this.router.navigate(['categoria']);
                } else {
                    alert(`Erro ao salvar a categoria: ${resposta.Mensagem}`);
                }
            },
            erro => alert(`Erro ao salvar a categoria: ${erro}`)
        );
    }

    public cancelar(e: Event) {
        e.preventDefault();
        this.router.navigate(['categoria']);
    }

    ngOnInit(): void {
        this.dataSubs = this.activatedRouter.data.subscribe(
            (data: { categoria: Categoria }) => {
                if (data.categoria) {
                    this.editando = true;
                    Object.assign(this.categoria, data.categoria);
                } else {
                    this.categoria.Codigo = '0';
                    this.editando = false;
                }
            }
        );
        Object.assign(this.categoriaEdicao, this.categoria);
        if (this.editando) {
            this.globalService.atualizaNavegacaoAtual(`Editando a categoria: ${this.categoria.Codigo} - ${this.categoria.Descricao}`);
        } else {
            this.globalService.atualizaNavegacaoAtual('Inclusão de categoria');
        }
    }

    ngOnDestroy(): void {
        if (this.dataSubs) {
            this.dataSubs.unsubscribe();
        }
    }
}
