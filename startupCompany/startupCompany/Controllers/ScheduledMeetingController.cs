using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using startupCompany.Models;

namespace startupCompany.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduledMeetingController : ControllerBase
    {
        private readonly MyDbContext _Db;
        public ScheduledMeetingController(MyDbContext db)
        {
            _Db = db;
        }
        //public IActionResult ScheduledMeeting()
        //{
        //    var ScheduledMeeting=
        //}
    }
}
