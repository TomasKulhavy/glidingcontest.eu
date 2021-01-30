using Microsoft.AspNetCore.Mvc;
using MP2021_LKLB.Data;
using MP2021_LKLB.Models;
using MP2021_LKLB.Services.UserService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MP2021_LKLB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private ApplicationDbContext _db;
        private IUserService _user;

        public UserController(ApplicationDbContext db, IUserService user)
        {
            _db = db;
            _user = user;
        }
        // GET: api/<UserController>
        [HttpGet]
        public async Task<IEnumerable<ApplicationUser>> Get()
        {
            return await _user.GetAllUsers();
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<ICollection<ApplicationUser>> Get(string id)
        {
            var user = await _user.GetUsers(id);
            return user;
        }

        // POST api/<UserController>
        public async Task<ICollection<ApplicationUser>> GetTop()
        {
            return await _user.GetPilotTops();
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
