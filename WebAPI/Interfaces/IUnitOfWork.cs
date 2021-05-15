using System.Threading.Tasks;

namespace WebAPI.Interfaces
{
    public interface IUnitOfWork
    {
         ICityRepository CityRepository {get; }
         IUserRepository UserRepository {get; }

         IPropertyRepository PropertyRepository {get; }
         Task<bool> SaveAsync();
    }
}