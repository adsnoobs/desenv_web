import { Injectable } from '@angular/core';

import { MesAno } from '../model/mes-ano.model';

@Injectable()
export class MesAnoService {

    private montaRetorno(data: Date): MesAno {
        const mesAno = new MesAno();
        mesAno.Ano = data.getFullYear();
        mesAno.Mes = data.getMonth() + 1;
        mesAno.Descricao = `${(mesAno.Mes < 10 ? `0${mesAno.Mes}` : mesAno.Mes)}/${mesAno.Ano}`;
        return mesAno;
    }

    public obtemMesAnoAtual(): MesAno {
        const data = new Date();
        return this.montaRetorno(data);
    }

    public obtemMesPosterior(mesAnoAtual: MesAno): MesAno {
        const data = new Date(mesAnoAtual.Ano, mesAnoAtual.Mes - 1);
        data.setMonth(data.getMonth() + 1);
        return this.montaRetorno(data);
    }

    public obtemMesAnterior(mesAnoAtual: MesAno): MesAno {
        const data = new Date(mesAnoAtual.Ano, mesAnoAtual.Mes - 1);
        data.setMonth(data.getMonth() - 1);
        return this.montaRetorno(data);
    }
}
