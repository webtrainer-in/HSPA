using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly DataContext dc;
        public CityController(DataContext dc)
        {
            this.dc = dc;
        }

        // GET api/city
        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            var cities = await dc.Cities.ToListAsync();            
            return Ok(cities);
        }

        // Post api/city/add?cityname=Miami
        // Post api/city/add/Los Angeles
        [HttpPost("add")]
        [HttpPost("add/{cityname}")]
        public async Task<IActionResult> AddCity(string cityName)
        {
            City city = new City();
            city.Name=cityName;
            await dc.Cities.AddAsync(city);
            await dc.SaveChangesAsync();
            return Ok(city);
        }       

        // Post api/city/post --Post the data in JSON Format
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(City city)
        {
            // City city = new City();
            // city.Name=cityName;
            await dc.Cities.AddAsync(city);
            await dc.SaveChangesAsync();
            return Ok(city);
        }  


        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            var city = await dc.Cities.FindAsync(id);
            
            if(city == null)
                return NotFound();

            dc.Cities.Remove(city);
            await dc.SaveChangesAsync();
            return Ok(id);
        }  
    }
}

