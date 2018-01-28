import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Navegacao } from '../model/navegacao.model';

@Injectable()
export class NavegacaoService {
    public obtemItem(): Observable<Navegacao> {
        return new Observable<Navegacao>(observer => {

            let item = new Navegacao();
            item.Icone = 'dashboard';
            item.Endereco = '/dashboard';
            item.Titulo = 'Dashboard';

            observer.next(item);

            item = new Navegacao();
            item.Icone = 'account_balance';
            item.Endereco = '/conta';
            item.Titulo = 'Conta';

            observer.next(item);

            item = new Navegacao();
            item.Icone = 'bookmark';
            item.Endereco = '/categoria';
            item.Titulo = 'Categoria';

            observer.next(item);

            item = new Navegacao();
            item.Icone = 'compare_arrows';
            item.Endereco = '/tipomovimento';
            item.Titulo = 'Tipo movimento';

            observer.next(item);

            item = new Navegacao();
            item.Icone = 'list';
            item.Endereco = '/movimento';
            item.Titulo = 'Movimento';

            observer.next(item);

            observer.complete();

        });
    }
}
