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
        public ADSResposta Salvar(ContaView c)
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

                c.Codigo = novo.Codigo;

                return new ADSResposta(true, "", c);
            }
            catch (Exception ex)
            {
                return new ADSResposta(false, ex.Message, c);
            }
        }

        public ADSResposta Excluir(ContaView c)
        {
            try
            {
                using (var db = DBCore.NovaInstanciaDoBanco())
                {
                    var conta = db.Contas.Where(w => w.Codigo.Equals(c.Codigo)).FirstOrDefault();

                    if (conta == null)
                    {
                        return new ADSResposta(sucesso: false, mensagem: "Conta não encontrada.", objeto: c);
                    }

                    db.Contas.Remove(conta);

                    db.SaveChanges();

                    return new ADSResposta(sucesso:true, objeto: conta);
                }
            }
            catch (Exception ex)
            {
                return new ADSResposta(false, ex.Message, c);
            }
        }

        public List<ContaView> PegaTodas()
        {
            var contas = DBCore.InstanciaDoBanco().Contas.ToList();

            var resposta = new List<ContaView>();
            foreach(var c in contas)
            {
                resposta.Add(new ContaView
                {
                    Codigo = c.Codigo,
                    Descricao = c.Descricao
                });
            }

            return resposta;
        }

        public ContaView PegaPorCodigo(int id)
        {
            var conta = DBCore.InstanciaDoBanco().Contas
                .Where(w => w.Codigo.Equals(id))
                .FirstOrDefault();

            ContaView resposta = null;

            if (conta != null)
            {
                resposta = new ContaView
                {
                    Codigo = conta.Codigo,
                    Descricao = conta.Descricao
                };
            }

            return resposta;
        }
    }
}
