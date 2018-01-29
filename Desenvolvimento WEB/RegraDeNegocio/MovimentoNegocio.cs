using BancoDeDados;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegraDeNegocio
{
    public class MovimentoNegocio
    {
        public ADSResposta Salvar(MovimentoView c)
        {
            var db = DBCore.InstanciaDoBanco();

            Movimento novo = null;

            if (!c.Codigo.Equals("0"))
            {
                novo = db.Movimentos.Where(w => w.Codigo.Equals(c.Codigo)).FirstOrDefault();
                novo.Descricao = c.Descricao;
                novo.Data = DateTime.Parse(c.Data);
                novo.Valor = c.Valor;
                novo.CategoriaCodigo = c.CategoriaCodigo;
                novo.ContaCodigo = c.ContaCodigo;
                novo.TipoMovimentoCodigo = c.TipoMovimentoCodigo;
                novo.Efetivado = c.Efetivado ? "S" : "N";
            }
            else
            {
                novo = db.Movimentos.Create();
                novo.Descricao = c.Descricao;
                novo.Data = DateTime.Parse(c.Data);
                novo.Valor = c.Valor;
                novo.CategoriaCodigo = c.CategoriaCodigo;
                novo.ContaCodigo = c.ContaCodigo;
                novo.TipoMovimentoCodigo = c.TipoMovimentoCodigo;
                novo.Efetivado = c.Efetivado ? "S" : "N";

                db.Movimentos.Add(novo);
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

        public ADSResposta Excluir(MovimentoView c)
        {
            try
            {
                using (var db = DBCore.NovaInstanciaDoBanco())
                {
                    var objeto = db.Movimentos.Where(w => w.Codigo.Equals(c.Codigo)).FirstOrDefault();

                    if (objeto == null)
                    {
                        return new ADSResposta(sucesso: false, mensagem: "Movimento não encontrado.", objeto: c);
                    }

                    db.Movimentos.Remove(objeto);

                    db.SaveChanges();

                    return new ADSResposta(sucesso: true, objeto: objeto);
                }
            }
            catch (Exception ex)
            {
                return new ADSResposta(false, ex.Message, c);
            }
        }

        public MovimentoView ConverteParaView(Movimento c)
        {
            return new MovimentoView
            {
                Codigo = c.Codigo.ToString(),
                Descricao = c.Descricao,
                Data = c.Data.ToString("yyyy-mm-dd"),
                Valor = c.Valor,
                CategoriaCodigo = c.CategoriaCodigo,
                ContaCodigo = c.CategoriaCodigo,
                TipoMovimentoCodigo = c.TipoMovimentoCodigo,
                Efetivado = c.Efetivado.Equals("S"),

                Conta = new ContaNegocio().ConverteParaView(c.Conta),
                Categoria = new CategoriaNegocio().ConverteParaView(c.Categoria),
                TipoMovimento = new TipoMovimentoNegocio().ConverteParaView(c.TipoMovimento)
            };
        }

        public List<MovimentoView> PegaTodas()
        {
            var objetos = DBCore.InstanciaDoBanco().Movimentos.ToList();

            var resposta = new List<MovimentoView>();
            foreach (var c in objetos)
            {
                resposta.Add(ConverteParaView(c));
            }

            return resposta;
        }

        public MovimentoView PegaPorCodigo(int id)
        {
            var objeto = DBCore.InstanciaDoBanco().Movimentos
                .Where(w => w.Codigo.Equals(id))
                .FirstOrDefault();

            MovimentoView resposta = null;

            if (objeto != null)
            {
                resposta = ConverteParaView(objeto);
            }

            return resposta;
        }

        public List<ExtratoCategoriaView> ExtratoCategoria(DateTime dataBase, bool efetivados = true)
        {
            var DataInicial = new DateTime(dataBase.Year, dataBase.Month, 1);
            var DataFinal = DataInicial.AddMonths(1).AddDays(-1);

            var registros = DBCore.InstanciaDoBanco().Movimentos
                .Where
                (
                    w =>
                        (w.Data >= DataInicial && w.Data <= DataFinal)
                        && (w.Efetivado.Equals("S") || !efetivados)
                )
                .GroupBy
                (
                    g =>
                        g.Categoria
                )
                .Select
                (
                    s => new
                    {
                        Categoria = s.Key,
                        Credito = s.Sum(i => (i.TipoMovimento.CreditoDebito.Equals("C") ? i.Valor : 0)),
                        Debito = s.Sum(i => (i.TipoMovimento.CreditoDebito.Equals("D") ? i.Valor : 0)),
                    }
                )
                .ToList();

            var categorianegocio = new CategoriaNegocio();
            var resposta = new List<ExtratoCategoriaView>();

            foreach(var extrato in registros)
            {
                resposta.Add(new ExtratoCategoriaView
                {
                    Categoria = categorianegocio.ConverteParaView(extrato.Categoria),
                    Debito = extrato.Debito,
                    Credito = extrato.Credito
                });
            }

            return resposta;
        }

        public DashBoardResumoView ObtemResumoDashBoard(int Mes, int Ano)
        {
            var DataInicial = new DateTime(Ano, Mes, 1);
            var DataFinal = DataInicial.AddMonths(1).AddDays(-1);

            #region Resumo por Categoria
            var registros = DBCore.InstanciaDoBanco().Movimentos
                .Where
                (
                    w =>
                        (w.Data >= DataInicial && w.Data <= DataFinal)
                        && (w.Efetivado.Equals("S"))
                )
                .GroupBy
                (
                    g =>
                        g.Categoria
                )
                .Select
                (
                    s => new
                    {
                        Categoria = s.Key,
                        Credito = s.Sum(i => (i.TipoMovimento.CreditoDebito.Equals("C") ? i.Valor : 0)),
                        Debito = s.Sum(i => (i.TipoMovimento.CreditoDebito.Equals("D") ? i.Valor : 0)),
                    }
                )
                .ToList();

            var categorianegocio = new CategoriaNegocio();
            var resposta = new List<ExtratoCategoriaView>();

            foreach (var extrato in registros)
            {
                resposta.Add(new ExtratoCategoriaView
                {
                    Categoria = categorianegocio.ConverteParaView(extrato.Categoria),
                    Debito = extrato.Debito,
                    Credito = extrato.Credito
                });
            }
            #endregion

            return null;
        }
    }
}