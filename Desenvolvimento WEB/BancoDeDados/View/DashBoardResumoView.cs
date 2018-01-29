using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BancoDeDados
{
    public class DashBoardResumoView
    {
        public DashBoardResumo DashBoardResumo { get; set; }
        public List<ExtratoCategoriaView> Categorias { get; set; }
    }

    public class DashBoardResumo
    {
        public decimal DespesasAberto { get; set; }
        public decimal ReceitasAberto { get; set; }
        public decimal SaldoContas { get; set; }
    }
}