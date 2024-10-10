using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using startupCompany.DTO;
using startupCompany.Models;

namespace startupCompany.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerManagementController : ControllerBase
    {
        private readonly MyDbContext _Db;
        public CustomerManagementController(MyDbContext db)
        {
            _Db=db;
        }

        [HttpGet("getallorder")]
        public IActionResult GetAllOrders()
        {
            // استخدام Include لجلب بيانات المستخدم، الخدمة، والموظف المرتبطين بالطلب
            var orders = _Db.CustomerRequests
                            .Include(cr => cr.User)    // جلب بيانات المستخدم المرتبط
                            .Include(cr => cr.Service) // جلب بيانات الخدمة المرتبطة
                          // جلب بيانات الموظف المسؤول (على افتراض وجود علاقة)
                            .AsEnumerable()            // لتحويل الاستعلام إلى ذاكرة لاستخدام الفهرس
                            .GroupBy(cr => new { cr.User.UserId, cr.User.FirstName, cr.User.LastName ,cr.User.Email,cr.User.PhoneNumber}) // تجميع حسب المستخدم
                            .Select(group => new
                            {
                                UserId = group.Key.UserId,
                                
                                UserFullName = group.Key.FirstName + " " + group.Key.LastName, // الاسم الكامل للمستخدم
                                EmployeeFullName = group.Key.FirstName + " " + group.Key.LastName,
                                email=group.Key.Email,// الاسم الكامل للموظف المسؤول
                                PhoneNumber=group.Key.PhoneNumber,
                                TotalOrders = group.Where(x => x.Status == "In Progress").Count(), // مجموع الطلبات لهذا المستخدم
                                Orders = group.Select(cr => new
                                {
                                    OrderNumber = cr.RequestId,
                                    Servicename = cr.Service.ServiceName,
                                    Projectdetails = cr.ProjectDetails,
                                    Companyname = cr.CompanyName,
                                    Address = cr.Address,
                                    Requestdate = cr.RequestDate,
                                    Status = cr.Status,
                                    Img = cr.Img,
                                 
                                    
                                }).ToList() // جلب جميع تفاصيل الطلبات للمستخدم
                            })
                            .ToList();

            return Ok(orders);
        }

        [HttpPost("addassimentforemployee")]
        public IActionResult addassimentforemployee([FromBody] addtaskforemployeeDTO DTO)
        {
            // تحقق من صحة البيانات
            if (DTO.Employees == null || !DTO.Employees.Any())
            {
                return BadRequest("No employees were provided.");
            }

            // إنشاء قائمة لتخزين المهام المضافة
            List<TaskAssignment> addedTasks = new List<TaskAssignment>();

            foreach (var employee in DTO.Employees)
            {
                var addtask = new TaskAssignment
                {
                    //RequestId = DTO.Request.RequestId,
                    EmployeeId = employee.EmployeeId, // استخدام معرف الموظف من القائمة
                    TaskDetails = DTO.Request.ProjectDetails,
                    AssignedDate = DTO.Request.RequestDate,
                    TaskStatus = DTO.TaskStatus,
                };

                _Db.TaskAssignments.Add(addtask);
                addedTasks.Add(addtask); // إضافة المهمة إلى القائمة
            }

            _Db.SaveChanges();

            return Ok(addedTasks); // إرجاع قائمة المهام المضافة
        }


        [HttpGet("getorderbyif{id}")]
        public IActionResult getorderbyid(int id) 
        {

            var order =_Db.TaskAssignments.Where(x=>x.EmployeeId==id).ToList();
            return Ok(order);
        }


        [HttpPut("editorder/{id}")]
        public IActionResult editorder(int id , editorderDTO DTO ) 
        {
            var edit=_Db.CustomerRequests.Where(x=>x.RequestId==id).FirstOrDefault();
          edit.Status=DTO.Status;

            _Db.CustomerRequests.Update(edit);
            _Db.SaveChanges();

            return Ok(edit);
        }

        //[HttpPut("editorderbyemloyee/{id}")]
        //public IActionResult editorderbyemloyee(int id, editorderDTO DTO)
        //{
        //    var edit = _Db.TaskAssignments.Where(x => x.RequestId == id).FirstOrDefault();
        //    edit.TaskStatus = DTO.Status;

        //    _Db.TaskAssignments.Update(edit);
        //    _Db.SaveChanges();

        //    return Ok(edit);
        //}






    }
}
