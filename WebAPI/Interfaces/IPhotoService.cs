using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace WebAPI.Interfaces
{
    public interface IPhotoService
    {
         Task<ImageUploadResult> UploadPhotoAsync(IFormFile photo);

         //will add onre more method for deleting the photo
         Task<DeletionResult> DeletePhotoAsync(string publicId);
    }
}