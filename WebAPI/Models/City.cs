using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class City : BaseEntity
    {
        public City(string name, string country)
        {
            this.Name = name;
            this.Country = country;

        }
        [Column(Order = 1)]
        public string Name { get; set; }

        [Required]
        [Column(Order = 2)]
        public string Country { get; set; }
    }
}