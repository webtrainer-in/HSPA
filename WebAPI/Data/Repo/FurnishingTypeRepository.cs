using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class FurnishingTypeRepository : IFurnishingTypeRepository
    {
        private readonly DataContext dc;

        public FurnishingTypeRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public async Task<IEnumerable<FurnishingType>> GetFurnishingTypesAsync()
        {
            return await dc.FurnishingTypes.ToListAsync();
        }
    }
}