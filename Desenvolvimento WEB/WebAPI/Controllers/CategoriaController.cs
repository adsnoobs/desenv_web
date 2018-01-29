using BancoDeDados;
using Newtonsoft.Json.Linq;
using RegraDeNegocio;
using System.Threading.Tasks;
using System.Web.Http;

namespace WebAPI.Controllers
{
    [RoutePrefix("categoria")]
    public class CategoriaController : ApiController
    {
        [HttpPost]
        [ActionName("obtemporcodigo")]
        public async Task<IHttpActionResult> ObtemPorCodigo([FromBody] JObject jsonData)
        {
            dynamic json = jsonData;
            int codigo = json.Codigo;

            var resposta = new CategoriaNegocio().PegaPorCodigo(codigo);

            if (resposta == null) return Ok(new ADSResposta(false, "Categoria não encontrada.", resposta));

            return Ok(new ADSResposta(true, objeto :resposta));
        }

        [HttpPost]
        [ActionName("obtem")]
        public async Task<IHttpActionResult> Obtem()
        {
            var resposta = new CategoriaNegocio().PegaTodas();

            if (resposta == null || resposta.Count == 0)
            {
                return Ok(new ADSResposta(false, "Nenhum registro encontrado.", resposta));
            }

            return Ok(new ADSResposta(true, "", resposta));
        }

        [HttpPost]
        [ActionName("salvar")]
        public async Task<IHttpActionResult> Salvar([FromBody] JObject jsonData)
        {
            CategoriaView categoria = jsonData.SelectToken("Categoria").ToObject<CategoriaView>();

            return Ok((new CategoriaNegocio().Salvar(categoria)));
        }

        [HttpPost]
        [ActionName("excluir")]
        public async Task<IHttpActionResult> Excluir([FromBody] JObject jsonData)
        {
            CategoriaView categoria = jsonData.SelectToken("Categoria").ToObject<CategoriaView>();

            return Ok((new CategoriaNegocio().Excluir(categoria)));
        }
    }
}