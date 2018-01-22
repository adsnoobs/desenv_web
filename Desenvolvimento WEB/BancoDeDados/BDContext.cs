using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BancoDeDados
{
    public class BDContext : DbContext 
    {
        public BDContext() : base()
        {
        }

        public virtual DbSet<Conta> Contas { get; set; }
        public virtual DbSet<Categoria> Categorias { get; set; }
        public virtual DbSet<TipoMovimento> TiposMovimento { get; set; }
        public virtual DbSet<Movimento> Movimentos { get; set; }
    }
}
