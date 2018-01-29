import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { MesAno } from '../model/mes-ano.model';

@Injectable()
export class GlobalService {

    private navegacaoAtual: string;
    private mesAnoAtual: MesAno;
    private paginaInteira: boolean;
    private navegacaoAtualSource = new Subject<string>();
    private mesAnoAtualSource = new Subject<MesAno>();
    private paginaInteiraSource = new Subject<boolean>();
    public navegacaoAtual$ = this.navegacaoAtualSource.asObservable();
    public mesAnoAtual$ = this.mesAnoAtualSource.asObservable();
    public paginaInteira$ = this.paginaInteiraSource.asObservable();

    public atualizaNavegacaoAtual(navegacaoAtual: string) {
        setTimeout(() => {
            this.navegacaoAtual = navegacaoAtual;
            this.navegacaoAtualSource.next(navegacaoAtual);
        });
    }

    public atualizaMesAnoAtual(mesAnoAtual?: MesAno) {
        this.mesAnoAtual = mesAnoAtual;
        this.mesAnoAtualSource.next(mesAnoAtual);
    }

    public atualizaPaginaInteira(paginaInteira: boolean) {
        this.paginaInteira = paginaInteira;
        this.paginaInteiraSource.next(paginaInteira);
    }

    public obtemMesAnoAtual() {
        return this.mesAnoAtual;
    }

    public obtemPaginaInteira() {
        return this.paginaInteira;
    }

}
