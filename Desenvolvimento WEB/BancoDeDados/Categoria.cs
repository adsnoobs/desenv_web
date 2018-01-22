using System.ComponentModel.DataAnnotations;

namespace BancoDeDados
{
    public class Categoria
    {
        [Key]
        public int Codigo { get; set; }
        public string Descricao { get; set; }
    }
}
