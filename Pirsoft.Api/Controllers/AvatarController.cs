using Microsoft.AspNetCore.Mvc;

namespace Pirsoft.Api.Controllers
{
    [ApiController]
    public class AvatarController : Controller
    {
        private readonly IConfiguration _config;

        public AvatarController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost("/save/avatar")]
        public async Task<JsonResult> PostSaveAvatar()
        {
            try
            {
                IFormFile postedFile = Request.Form.Files[0];
                string originalExtension = Path.GetExtension(postedFile.FileName);
                int employeeId = Int32.Parse(Request.Form["employee_id"]!);

                if (!isFileValid(postedFile))
                {
                    throw new ArgumentException("Posted file is not valid, only '.png' or '.jpg' files are allowed.");
                }

                string secureFileName = Path.ChangeExtension(Path.GetRandomFileName(), originalExtension);
                string projectRootDirectory = Directory.GetParent(Directory.GetCurrentDirectory())!.FullName;
                string avatarDirectory = _config.GetValue<string>("Resources:AvatarDirectory")!;
                string fullPathToAvatarDirectory = Path.Combine(projectRootDirectory, avatarDirectory);

                if (Directory.Exists(fullPathToAvatarDirectory) == false)
                {
                    Directory.CreateDirectory(fullPathToAvatarDirectory);
                }

                string secureFilePath = Path.Combine(fullPathToAvatarDirectory, secureFileName);

                using (var stream = new FileStream(secureFilePath, FileMode.Create))
                {
                    await postedFile.CopyToAsync(stream);
                }

                if (!System.IO.File.Exists(secureFilePath))
                {
                    throw new InvalidOperationException("Avatar file was not uploaded properly.");
                }

                //EmployeeModel entity = await _crudHandler.ReadAsync<EmployeeModel>(employeeId);
                //entity.avatar_file_name = secureFileName;
                //await _crudHandler.UpdateAsync(entity);

                return new JsonResult($"GeneratedFileName: {secureFileName}; for employee: {employeeId}");
                //return new JsonResult($"GeneratedFileName: {secureFileName}");
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }

        private bool isFileValid(IFormFile file)
        {
            string extension = Path.GetExtension(file.FileName).ToLowerInvariant();

            if (extension != ".png" && extension != ".jpg")
            {
                return false;
            }

            long fileSize = file.Length;

            if (fileSize == 0 || fileSize > 2097152)
            {
                return false;
            }

            return true;
        }

        //[HttpPost("/avatar/save")]
        //public IActionResult SaveAvatarFile()
        //{
        //    try
        //    {
        //        IFormFile avatarFile = Request.Form.Files[0];

        //        string secureFilename = Path.GetRandomFileName();
        //        string avatarTargetFilePath = Path.Combine(_env.ContentRootPath, "AvatarImages", secureFilename);

        //        using (FileStream stream = new(avatarTargetFilePath, FileMode.Create))
        //        {
        //            avatarFile.CopyTo(stream);
        //        }

        //        return new JsonResult(secureFilename);
        //    }
        //    catch (Exception)
        //    {
        //        return new JsonResult("avatar.png");
        //    }
        //}

        //private async Task<IActionResult> prepareUploadedFiles(IEnumerable<IFormFile> files)
        //{
        //    long totalSize = files.Sum(file => file.Length);

        //    foreach (IFormFile formFile in files)
        //    {
        //        if (formFile.Length > 0)
        //        {
        //            string filePath = Path.GetTempFileName();

        //            using (FileStream stream = new(filePath, FileMode.Create))
        //            {
        //                await formFile.CopyToAsync(stream);
        //            }
        //        }
        //    }

        //    return Ok(new { count = files.Count(), totalSize });
        //}
    }
}
