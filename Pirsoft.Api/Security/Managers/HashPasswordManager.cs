using System.Security.Cryptography;
using System.Text;
using Pirsoft.Api.Security.Interfaces;

namespace Pirsoft.Api.Security.Managers
{
    public class HashPasswordManager : IHashPasswordManager
    {
        public string GenerateSalt()
        {
            byte[] salt = new byte[32];

            using (var randomSalt = new RNGCryptoServiceProvider())
            {
                randomSalt.GetBytes(salt);
            }

            return Convert.ToBase64String(salt);
        }

        public string HashPassword(string password, string salt)
        {
            byte[] saltBytes = new byte[32];
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);

            byte[] combinedBytes = new byte[saltBytes.Length + passwordBytes.Length];

            Buffer.BlockCopy(saltBytes, 0, combinedBytes, 0, saltBytes.Length);
            Buffer.BlockCopy(passwordBytes, 0, combinedBytes, saltBytes.Length, passwordBytes.Length);

            using (var sha256 = SHA256.Create())
            {
                byte[] hashedBytes = sha256.ComputeHash(combinedBytes);
                return Convert.ToBase64String(hashedBytes);
            }
        }
    }
}
