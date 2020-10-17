using System.Threading.Tasks;

namespace WebAPI.Interfaces
{
    public interface IUnitOfWork
    {
         ICityRepository CityRepository {get; }
         Task<bool> SaveAsync();
    }
}