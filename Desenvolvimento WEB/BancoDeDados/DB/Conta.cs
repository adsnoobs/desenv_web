namespace BancoDeDados
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Conta")]
    public class Conta
    {
        [Key]
        public int Codigo { get; set; }
        public string Descricao { get; set; }

        public virtual ICollection<Movimento> Movimentos { get; set; }
    }
}
