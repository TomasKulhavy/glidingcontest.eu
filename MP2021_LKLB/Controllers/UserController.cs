using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MP2021_LKLB.Data;
using MP2021_LKLB.Models;
using MP2021_LKLB.Services.UserService;
using MP2021_LKLB.ViewModels;
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
        private IUserService _user;

        public UserController(IUserService user)
        {
            _user = user;
        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task<IEnumerable<ApplicationUser>> Get()
        {
            return await _user.GetAllUsers();
        }

        [HttpGet("hours")]
        public async Task<IEnumerable<ApplicationUser>> GetHours()
        {
            return await _user.GetUsersHours();
        }

        [HttpGet("kilometers")]
        public async Task<IEnumerable<ApplicationUser>> GetKm()
        {
            return await _user.GetUsersKilometers();
        }

        [HttpGet("order")]
        public async Task<IEnumerable<ApplicationUser>> GetOrder()
        {
            return await _user.GetPilotOrder();
        }

        [HttpGet("pilotFlights/{id}/{year}")]
        public async Task<ICollection<FlightAnalyseVM>> GetFlights(string id, int? year, string sort = null)
        {
            return await _user.GetPilotsFlights(id, year, sort);
        }

        [HttpGet("pilotStats/{id}")]
        public async Task<ApplicationUser> GetStats(string id)
        {
            return await _user.GetPilotsStats(id);
        }
        
        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<ICollection<ApplicationUser>> Get(string id)
        {
            var user = await _user.GetUsers(id);
            return user;
        }

        // POST api/<UserController>
        [HttpPost]
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
