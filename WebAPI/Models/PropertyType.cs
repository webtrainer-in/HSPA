using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class PropertyType :BaseEntity
    {
        [Required]
        public string Name { get; set; }
    }
}