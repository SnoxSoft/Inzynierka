namespace Pirsoft.Api.Security.Interfaces
{
    public interface IHashPasswordManager
    {
        public string GenerateSalt();
        public string HashPassword(string password, string salt);
    }
}
