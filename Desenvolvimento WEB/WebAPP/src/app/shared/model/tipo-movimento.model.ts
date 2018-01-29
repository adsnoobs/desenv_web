import { Movimento } from './movimento.model';

export class TipoMovimento {
    Codigo: string;
    Descricao: string;
    CreditoDebito: string;
    Movimentos: Array<Movimento>;
}
