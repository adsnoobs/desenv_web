using BancoDeDados;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RegraDeNegocio
{
    public class TipoMovimentoNegocio
    {
        public ADSResposta Salvar(TipoMovimentoView c)
        {
            var db = DBCore.InstanciaDoBanco();

            TipoMovimento novo = null;

            if (!c.Codigo.Equals("0"))
            {
                novo = db.TiposMovimento.Where(w => w.Codigo.Equals(c.Codigo)).FirstOrDefault();
                novo.Descricao = c.Descricao;
                novo.CreditoDebito = c.CreditoDebito;
            }
            else
            {
                novo = db.TiposMovimento.Create();
                novo.Descricao = c.Descricao;
                novo.CreditoDebito = c.CreditoDebito;

                db.TiposMovimento.Add(novo);
            }

            try
            {
                db.SaveChanges();

                c.Codigo = novo.Codigo.ToString();

                return new ADSResposta(true, objeto: c);
            }
            catch (Exception ex)
            {
                return new ADSResposta(false, ex.Message, c);
            }
        }

        public ADSResposta Excluir(TipoMovimentoView c)
        {
            try
            {
                using (var db = DBCore.NovaInstanciaDoBanco())
                {
                    var objeto = db.TiposMovimento.Where(w => w.Codigo.Equals(c.Codigo)).FirstOrDefault();

                    if (objeto == null)
                    {
                        return new ADSResposta(sucesso: false, mensagem: "Tipo de Movimento não encontrado.", objeto: c);
                    }

                    db.TiposMovimento.Remove(objeto);

                    db.SaveChanges();

                    return new ADSResposta(sucesso: true, objeto: objeto);
                }
            }
            catch (Exception ex)
            {
                return new ADSResposta(false, ex.Message, c);
            }
        }

        public TipoMovimentoView ConverteParaView(TipoMovimento c)
        {
            return new TipoMovimentoView
            {
                Codigo = c.Codigo.ToString(),
                Descricao = c.Descricao,
                CreditoDebito = c.CreditoDebito
            };
        }

        public List<TipoMovimentoView> PegaTodas()
        {
            var objetos = DBCore.InstanciaDoBanco().TiposMovimento.ToList();

            var resposta = new List<TipoMovimentoView>();
            foreach (var c in objetos)
            {
                resposta.Add(ConverteParaView(c));
            }

            return resposta;
        }

        public TipoMovimentoView PegaPorCodigo(int id)
        {
            var objeto = DBCore.InstanciaDoBanco().TiposMovimento
                .Where(w => w.Codigo.Equals(id))
                .FirstOrDefault();

            TipoMovimentoView resposta = null;

            if (objeto != null)
            {
                resposta = ConverteParaView(objeto);
            }

            return resposta;
        }
    }
}
