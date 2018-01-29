namespace BancoDeDados
{
    using System;

    public class MovimentoView
    {
        public string Codigo { get; set; }
        public string Descricao { get; set; }
        public string Data { get; set; }
        public decimal Valor { get; set; }
        public bool Efetivado { get; set; }

        public int ContaCodigo { get; set; }
        public int TipoMovimentoCodigo { get; set; }
        public int CategoriaCodigo { get; set; }

        public CategoriaView Categoria { get; set; }
        public TipoMovimentoView TipoMovimento { get; set; }
        public ContaView Conta { get; set; }

    }
}
