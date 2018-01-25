namespace RegraDeNegocio
{
    using BancoDeDados;

    public static class DBCore
    {
        private static BDContext ctx;

        public static BDContext InstanciaDoBanco()
        {
            if (ctx == null)
            {
                ctx = new BDContext();
            }

            return ctx;
        }

        public static BDContext NovaInstanciaDoBanco()
        {
            return new BDContext();
        }
    }
}
