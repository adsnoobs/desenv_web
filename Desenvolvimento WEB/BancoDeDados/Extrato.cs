namespace BancoDeDados
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Extrato
    {
        [Key]
        public int Codigo { get; set; }
        public decimal Saldo { get; set; }
        public decimal SaldoInicial { get; set; }
        public decimal SaldoFinal { get; set; }

        [ForeignKey("Movimento")]
        public int MovimentoCodigo { get; set; }
        public Movimento Movimento { get; set; }
    }
}
