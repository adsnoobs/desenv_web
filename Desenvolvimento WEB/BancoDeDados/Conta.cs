﻿namespace BancoDeDados
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class Conta
    {
        [Key]
        public int Codigo { get; set; }
        public string Descricao { get; set; }

        public virtual ICollection<Movimento> Movimentos { get; set; }
    }
}