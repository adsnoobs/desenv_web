import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { GlobalService } from '../../../shared/service/global-variaveis.service';
import { Categoria } from '../../../shared/model/categoria.model';
import { CategoriaService } from '../../../shared/service/categoria.service';

@Component({
    selector: 'app-categoria-lista',
    templateUrl: './categoria-lista.component.html'
})
export class CategoriaListaComponent implements OnInit, OnDestroy {

    private categoriasSubs: Subscription;
    private excluirSubs: Subscription;
    public categorias: Categoria[] = [];

    constructor(private globalService: GlobalService, private categoriaService: CategoriaService, private router: Router) {
        this.atualizarLista();
    }

    private atualizarLista() {
        if (this.categoriasSubs) {
            this.categoriasSubs.unsubscribe();
        }
        this.categoriasSubs = this.categoriaService.obtemLista().subscribe(
            categorias => {
                this.categorias = categorias;
            }
        );
    }

    public editar(e: Event, categoria: Categoria) {
        e.preventDefault();
        this.router.navigate(['categoria', 'editar', categoria.Codigo]);
    }

    public incluir(e: Event) {
        e.preventDefault();
        this.router.navigate(['categoria', 'incluir']);
    }

    public excluir(e: Event, categoria: Categoria) {
        e.preventDefault();
        if (confirm('Deseja realmente excluir ?')) {
            if (this.excluirSubs) {
                this.excluirSubs.unsubscribe();
            }
            this.categoriaService.excluir(categoria).subscribe(
                resposta => {
                    if (resposta.Sucesso) {
                        this.atualizarLista();
                    } else {
                        alert(`Erro ao excluir a categoria: ${resposta.Mensagem}`);
                    }
                },
                erro => alert(`Erro ao excluir a categoria: ${erro}`)
            );
        }
    }

    ngOnInit(): void {
        this.globalService.atualizaNavegacaoAtual('Lista de categorias');
    }

    ngOnDestroy(): void {
        if (this.categoriasSubs) {
            this.categoriasSubs.unsubscribe();
        }
        if (this.excluirSubs) {
            this.excluirSubs.unsubscribe();
        }
    }
}
