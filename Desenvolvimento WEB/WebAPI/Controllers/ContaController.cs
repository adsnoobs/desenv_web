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

            var resposta = new ContaNegocio().PegaPorCodigo(codigo);

            if (resposta == null) return Ok(new ADSResposta(false, "Conta não encontrada.", resposta));

            return Ok(new ADSResposta(true, "", resposta));
        }

        [HttpPost]
        [ActionName("obtem")]
        public async Task<IHttpActionResult> Obtem()
        {
            var resposta = new ContaNegocio().PegaTodas();

            if (resposta == null || resposta.Count == 0)
            {
                return Ok(new ADSResposta(false, "Nenhum registro encontrado.", resposta));
            }

            return Ok(resposta);
        }

        [HttpPost]
        [ActionName("salvar")]
        public async Task<IHttpActionResult> Salvar([FromBody] JObject jsonData)
        {
            ContaView conta = jsonData.SelectToken("Conta").ToObject<ContaView>();

            return Ok((new ContaNegocio().Salvar(conta)));
        }

        [HttpPost]
        [ActionName("excluir")]
        public async Task<IHttpActionResult> Excluir([FromBody] JObject jsonData)
        {
            ContaView conta = jsonData.SelectToken("Conta").ToObject<ContaView>();

            return Ok((new ContaNegocio().Excluir(conta)));
        }
    }
}
