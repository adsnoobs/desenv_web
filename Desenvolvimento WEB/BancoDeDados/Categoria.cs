using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BancoDeDados
{
    [Table("Categoria")]
    public class Categoria
    {
        [Key]
        public int Codigo { get; set; }
        public string Descricao { get; set; }
    }
}
