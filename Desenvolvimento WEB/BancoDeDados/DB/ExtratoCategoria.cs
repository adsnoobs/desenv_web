namespace BancoDeDados
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class ExtratoCategoria
    {
        public int Ordem { get; set; }
        public decimal Credito { get; set; }
        public decimal Debito { get; set; }
        public Categoria Categoria { get; set; }
    }
}
