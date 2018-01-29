using BancoDeDados;
using Newtonsoft.Json.Linq;
using RegraDeNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace WebAPI.Controllers
{
    [RoutePrefix("movimento")]
    public class MovimentoController : ApiController
    {
        [HttpPost]
        [ActionName("obtemporcodigo")]
        public async Task<IHttpActionResult> ObtemPorCodigo([FromBody] JObject jsonData)
        {
            dynamic json = jsonData;
            int codigo = json.Codigo;

            var resposta = new MovimentoNegocio().PegaPorCodigo(codigo);

            if (resposta == null) return Ok(new ADSResposta(false, "Movimento não encontrado.", resposta));

            return Ok(new ADSResposta(true, "", resposta));
        }

        [HttpPost]
        [ActionName("obtem")]
        public async Task<IHttpActionResult> Obtem()
        {
            var resposta = new MovimentoNegocio().PegaTodas();

            if (resposta == null || resposta.Count == 0)
            {
                return Ok(new ADSResposta(false, "Nenhum registro encontrado.", resposta));
            }

            return Ok(new ADSResposta(true, objeto: resposta));
        }

        [HttpPost]
        [ActionName("salvar")]
        public async Task<IHttpActionResult> Salvar([FromBody] JObject jsonData)
        {
            MovimentoView objeto = jsonData.SelectToken("Movimento").ToObject<MovimentoView>();

            return Ok((new MovimentoNegocio().Salvar(objeto)));
        }

        [HttpPost]
        [ActionName("excluir")]
        public async Task<IHttpActionResult> Excluir([FromBody] JObject jsonData)
        {
            MovimentoView objeto = jsonData.SelectToken("Movimento").ToObject<MovimentoView>();

            return Ok((new MovimentoNegocio().Excluir(objeto)));
        }

        [HttpPost]
        [ActionName("dashboardresumo")]
        public async Task<IHttpActionResult> DashBoardResumo([FromBody] JObject jsonData)
        {
            dynamic json = jsonData;
            int Mes = json.Mes;
            int Ano = json.Ano;

            return Ok(new ADSResposta(true, objeto: new MovimentoNegocio().ObtemResumoDashBoard(Mes, Ano)));
        }
    }
}