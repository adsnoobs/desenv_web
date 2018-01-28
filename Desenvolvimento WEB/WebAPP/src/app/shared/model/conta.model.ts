import { Movimento } from './movimento.model';

export class Conta {
    Codigo: string;
    Descricao: string;
    Movimentos: Array<Movimento>;
}
