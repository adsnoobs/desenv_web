namespace BancoDeDados
{
    public class ADSResposta
    {
        public bool Sucesso { get; set; }
        public string Mensagem { get; set; }
        public object Objeto { get; set; }

        public ADSResposta()
        {

        }

        public ADSResposta(bool sucesso, string mensagem = "", object objeto = null)
        {
            Sucesso = sucesso;
            Mensagem = mensagem;
            Objeto = objeto;
        }
    }
}
