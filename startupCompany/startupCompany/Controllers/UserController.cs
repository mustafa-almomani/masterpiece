using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using startupCompany.DTO;
using startupCompany.Models;
using System.Data;

namespace startupCompany.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly MyDbContext _Db;



        public UserController(MyDbContext db)
        {
            _Db = db;

        }
        [HttpPost]
        public IActionResult regester([FromForm] regesterDTO dto)
        {
            if (dto.password != dto.confairmpassword)
            {
                return BadRequest("Passwords do not match");
            }
            byte[] hash;
            byte[] salt;
            passwordHasherMethod.createPasswordHash(dto.password, out hash, out salt);

            var newuser = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                PasswordHash = hash,
                Passwordsult = salt

            };
            _Db.Users.Add(newuser);
            _Db.SaveChanges();

            return Ok();
        }

        [HttpPost("LOGIN")]
        public IActionResult login(LoginDto dto)
        {
            var user = _Db.Users.FirstOrDefault(x => x.Email == dto.Email);


            if (User == null || !passwordHasherMethod.VerifyPasswordHash(dto.password, user.PasswordHash, user.Passwordsult))
            {
                return Unauthorized("Invalid username or password.");
            }
            return Ok(user);


        }
        [HttpPost("GoogleSignUp")]
        public IActionResult GoogleSignUp([FromBody] SignUpByGoogleDto byGoogleDto)
        {
            if (byGoogleDto == null || string.IsNullOrEmpty(byGoogleDto.Email))
            {
                return BadRequest();
            }
            if (_Db.Users.Any(u => u.Email == byGoogleDto.Email)) { return BadRequest("this email is already in the database"); }
            var user = new User
            {
                FirstName = byGoogleDto.FirstName,
                LastName = byGoogleDto.LastName,
                Email = byGoogleDto.Email,
                PhoneNumber = "*******",

            };
            byte[] hash;
            byte[] salt;
            passwordHasherMethod.createPasswordHash(byGoogleDto.Password, out hash, out salt);
            user.PasswordHash = hash;
            user.Passwordsult = salt;
            _Db.Users.Add(user);
            _Db.SaveChanges();
            return Ok(user);
        }
        [HttpPost("addemployee")]
        public IActionResult addemployee([FromForm] AddEmployeesDTO EmployeesDTO)
        {
            var Employee = new Employee
            {
                FirstName = EmployeesDTO.FirstName,
                LastName = EmployeesDTO.LastName,
                Email = EmployeesDTO.Email,
                PhoneNumber = EmployeesDTO.PhoneNumber,
                JoinDate = EmployeesDTO.JoinDate,
                Status = EmployeesDTO.Status,
                JobTitle = EmployeesDTO.JobTitle,
                Role = EmployeesDTO.Role,
            };
            _Db.Employees.Add(Employee);
            _Db.SaveChanges();
            return Ok();
        }

        [HttpGet("getallemployee")]
        public IActionResult employee()
        {
            var employee = _Db.Employees.ToList();
            return Ok(employee);
        }
        [HttpDelete("deleteemployee{id}")]
        public IActionResult deleteEmployee(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            var employee = _Db.Employees.FirstOrDefault(c => c.EmployeeId == id);
            if (employee == null)
            {
                return NotFound();
            }

            _Db.Employees.Remove(employee);
            _Db.SaveChanges();
            return NoContent();
        }


        [HttpGet("getalladmin")]
        public IActionResult admin()
        {
            var admin = _Db.Employees.Where(x => x.Role == "Admin");
            return Ok(admin);
        }


        [HttpPut("{id}")]
        public IActionResult productDTOput(int id, [FromForm] editemployeeDTO obj)
        {
            var edit = _Db.Employees.Find(id);
            edit.Email = obj.Email ?? edit.Email;
            edit.Role = obj.Role ?? edit.Role;
            edit.Status = obj.Status ?? edit.Status;
            edit.PhoneNumber = obj.PhoneNumber ?? edit.PhoneNumber;
            edit.PerformanceReport = obj.PerformanceReport ?? edit.PerformanceReport;
            edit.JobTitle = obj.JobTitle ?? edit.JobTitle;




            _Db.Update(edit);
            _Db.SaveChanges();
            return Ok();
        }

        [HttpGet("getalluserd")]
        public IActionResult getallusers()
        {
            var users = _Db.Users.Select(x => new usersDTO
            {            
                UserId=x.UserId,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Email = x.Email,
                PhoneNumber = x.PhoneNumber,
            });
            return Ok(users);

        }




        [HttpPut("edit/user/{id}")]
        public IActionResult useredit(int id, [FromForm] edituserDTO obj)
        {
            var edit = _Db.Users.Find(id);
            //edit.UserId=obj.UserId;
            edit.FirstName = obj.FirstName??edit.FirstName;
            edit.LastName = obj.LastName??edit.LastName;
            edit.Email = obj.Email ?? edit.Email;
            edit.PhoneNumber = obj.PhoneNumber ?? edit.PhoneNumber;




            _Db.Update(edit);
            _Db.SaveChanges();
            return Ok();
        }


        [HttpGet("getusersbyid/{id}")]
        public IActionResult getusersid(int id )
        {
            var user = _Db.Users.Find(id);
            return Ok(user);
        }

        [HttpGet("getemployeebyid/{id}")]
        public IActionResult getemployeeid(int id)
        {
            var employee = _Db.Employees.Find(id);
            return Ok(employee);
        }

      




    }



}
