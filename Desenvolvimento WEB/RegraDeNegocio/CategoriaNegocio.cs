using BancoDeDados;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RegraDeNegocio
{
    public class CategoriaNegocio
    {
        public ADSResposta Salvar(CategoriaView c)
        {
            var db = DBCore.InstanciaDoBanco();

            Categoria novo = null;

            if (!c.Codigo.Equals("0"))
            {
                novo = db.Categorias.Where(w => w.Codigo.Equals(c.Codigo)).FirstOrDefault();
                novo.Descricao = c.Descricao;
            }
            else
            {
                novo = db.Categorias.Create();
                novo.Descricao = c.Descricao;

                db.Categorias.Add(novo);
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

        public ADSResposta Excluir(CategoriaView c)
        {
            try
            {
                using (var db = DBCore.NovaInstanciaDoBanco())
                {
                    var conta = db.Categorias.Where(w => w.Codigo.Equals(c.Codigo)).FirstOrDefault();

                    if (conta == null)
                    {
                        return new ADSResposta(sucesso: false, mensagem: "Categoria não encontrada.", objeto: c);
                    }

                    db.Categorias.Remove(conta);

                    db.SaveChanges();

                    return new ADSResposta(sucesso: true, objeto: conta);
                }
            }
            catch (Exception ex)
            {
                return new ADSResposta(false, ex.Message, c);
            }
        }

        public CategoriaView ConverteParaView(Categoria c)
        {
            return new CategoriaView
            {
                Codigo = c.Codigo.ToString(),
                Descricao = c.Descricao
            };
        }

        public List<CategoriaView> PegaTodas()
        {
            var contas = DBCore.InstanciaDoBanco().Categorias.ToList();

            var resposta = new List<CategoriaView>();
            foreach (var c in contas)
            {
                resposta.Add(ConverteParaView(c));
            }

            return resposta;
        }

        public CategoriaView PegaPorCodigo(int id)
        {
            var conta = DBCore.InstanciaDoBanco().Categorias
                .Where(w => w.Codigo.Equals(id))
                .FirstOrDefault();

            CategoriaView resposta = null;

            if (conta != null)
            {
                resposta = ConverteParaView(conta);
            }

            return resposta;
        }
    }
}
