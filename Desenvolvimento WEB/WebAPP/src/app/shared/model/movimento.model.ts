import { TipoMovimento } from './tipo-movimento.model';
import { Conta } from './conta.model';
import { Categoria } from './categoria.model';

export class Movimento {
    Codigo: string;
    Descricao: string;
    TipoMovimentoCodigo: string;
    Data: any;
    Valor: number;
    ContaCodigo: string;
    CategoriaCodigo: string;
    Efetivado: boolean;

    TipoMovimento: TipoMovimento;
    Categoria: Categoria;
    Conta: Conta;
}
