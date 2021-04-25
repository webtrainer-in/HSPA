using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class FurnishingType: BaseEntity
    {
        [Required]
        public string Name { get; set; }
    }
}