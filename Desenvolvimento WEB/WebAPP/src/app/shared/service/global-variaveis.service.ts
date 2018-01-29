import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { MesAno } from '../model/mes-ano.model';

@Injectable()
export class GlobalService {

    private navegacaoAtual: string;
    private mesAnoAtual: MesAno;
    private navegacaoAtualSource = new Subject<string>();
    private mesAnoAtualSource = new Subject<MesAno>();
    public navegacaoAtual$ = this.navegacaoAtualSource.asObservable();
    public mesAnoAtual$ = this.mesAnoAtualSource.asObservable();

    public atualizaNavegacaoAtual(navegacaoAtual: string) {
        this.navegacaoAtual = navegacaoAtual;
        this.navegacaoAtualSource.next(navegacaoAtual);
    }

    public atualizaMesAnoAtual(mesAnoAtual?: MesAno) {
        this.mesAnoAtual = mesAnoAtual;
        this.mesAnoAtualSource.next(mesAnoAtual);
    }

    public obtemMesAnoAtual() {
        return this.mesAnoAtual;
    }

}
