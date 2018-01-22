using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegraDeNegocio
{
    using BancoDeDados;

    public class ContaNegocio
    {
        public bool Salvar(Conta c)
        {
            var db = DBCore.InstanciaDoBanco();

            Conta novo = null;

            if (c.Codigo != 0)
            {
                novo = db.Contas.Where(w => w.Codigo.Equals(c.Codigo)).FirstOrDefault();
                novo.Descricao = c.Descricao;
            }
            else
            {
                novo = db.Contas.Create();
                novo.Descricao = c.Descricao;

                db.Contas.Add(novo);
            }

            try
            {
                db.SaveChanges();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Excluir(Conta c)
        {
            try
            {
                using (var db = DBCore.NovaInstanciaDoBanco())
                {
                    var conta = db.Contas.Where(w => w.Codigo.Equals(c.Codigo)).FirstOrDefault();
                    db.Contas.Remove(conta);

                    db.SaveChanges();

                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public List<Conta> PegaTodas()
        {
            return DBCore.InstanciaDoBanco().Contas.ToList();
        }

        public Conta PegaPorCodigo(int id)
        {
            return DBCore.InstanciaDoBanco().Contas
                .Where(w => w.Codigo.Equals(id))
                .FirstOrDefault();
        }
    }
}
