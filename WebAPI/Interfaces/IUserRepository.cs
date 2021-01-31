using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IUserRepository
    {
         Task<User> Authenticate(string userName, string password);   
         void Register(string userName, string password); 

         Task<bool> UserAlreadyExists(string userName);
    }
}