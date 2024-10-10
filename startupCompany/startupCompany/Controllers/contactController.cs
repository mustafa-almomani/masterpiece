using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using startupCompany.DTO;
using startupCompany.Models;

namespace startupCompany.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class contactController : ControllerBase
    {

        private readonly MyDbContext _Db;
        public contactController(MyDbContext db)
        {
            _Db = db;
        }

        [HttpPost("newmassege")]
        public IActionResult addcontact([FromForm]contactDTO dto)
        {
            var messege = new ContactMessage
            {
                Name = dto.Name,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                MessageDate = dto.MessageDate = DateTime.Now,
                MessageText = dto.MessageText,
            };
            _Db.ContactMessages.Add(messege);
            _Db.SaveChanges();
            return Ok();   
        }


        [HttpGet("getallcontact")]
        public IActionResult getallcontact() 
        {
            var messege=_Db.ContactMessages.ToList();
            return Ok(messege);    
        }
    }
}
