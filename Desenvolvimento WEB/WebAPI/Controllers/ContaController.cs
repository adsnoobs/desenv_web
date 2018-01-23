using BancoDeDados;
using Newtonsoft.Json.Linq;
using RegraDeNegocio;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using System.Linq;

namespace WebAPI.Controllers
{
    [RoutePrefix("conta")]
    public class ContaController : ApiController
    {
        [HttpPost]
        [ActionName("obtemporcodigo")]
        public async Task<IHttpActionResult> ObtemPorCodigo([FromBody] JObject jsonData)
        {
            dynamic json = jsonData;
            int codigo = json.Codigo;

            Conta resposta = new ContaNegocio().PegaPorCodigo(codigo);

            if (resposta == null) return NotFound();

            return Ok(new { resposta.Codigo, resposta.Descricao });
        }

        [HttpPost]
        [ActionName("obtem")]
        public async Task<IHttpActionResult> Obtem()
        {
            var resposta = new ContaNegocio().PegaTodas()
                .Select(s => new
                {
                    s.Codigo,
                    s.Descricao
                })
                .ToList();

            if (resposta == null || resposta.Count == 0) return NotFound();

            return Ok(resposta);
        }

        [HttpPost]
        [ActionName("salvar")]
        public async Task<IHttpActionResult> Salvar([FromBody] JObject jsonData)
        {
            Conta conta = jsonData.SelectToken("conta").ToObject<Conta>();

            if (new ContaNegocio().Salvar(conta))
            {
                return Ok(conta);
            }
            else
            {
                return InternalServerError();
            }
        }
    }
}
