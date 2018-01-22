namespace RegraDeNegocio
{
    using BancoDeDados;

    public static class DBCore
    {
        private static BDContext ctx;

        public static BDContext InstanciaDoBanco()
        {
            return ctx ?? new BDContext();
        }

        public static BDContext NovaInstanciaDoBanco()
        {
            return new BDContext();
        }
    }
}
