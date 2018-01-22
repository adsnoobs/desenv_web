namespace BancoDeDados
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Movimento
    {
        [Key]
        public int Codigo { get; set; }
        public string Descricao { get; set; }        
        public DateTime Data { get; set; }
        public decimal Valor { get; set; }        
        public string Efetivado { get; set; }

        [ForeignKey("Conta")]
        public int ContaCodigo { get; set; }
        public Conta Conta { get; set; }

        [ForeignKey("Categoria")]
        public int CategoriaCodigo { get; set; }
        public Categoria Categoria { get; set; }

        [ForeignKey("TipoMovimento")]
        public int TipoMovimentoCodigo { get; set; }
        public TipoMovimento TipoMovimento { get; set; }
    }
}
