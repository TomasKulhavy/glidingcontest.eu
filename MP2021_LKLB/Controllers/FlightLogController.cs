using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MP2021_LKLB.Data;
using MP2021_LKLB.Helpers;
using MP2021_LKLB.Models;
using MP2021_LKLB.Services;
using MP2021_LKLB.Services.FlightLogService;
using MP2021_LKLB.Services.StatisticsService;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MP2021_LKLB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightLogController : ControllerBase
    {
        private ApplicationDbContext _db;
        private IFlightLogService _flightLog;
        private IStatisticsService _stats;
        private IFlight _flight;
        private readonly ISession _session;

        public FlightLogController(ApplicationDbContext db, IFlightLogService flightLog, IFlight flight, IHttpContextAccessor httpContext, IStatisticsService stats)
        {
            _db = db;
            _flightLog = flightLog;
            _flight = flight;
            _session = httpContext.HttpContext.Session;
            _stats = stats;
        }

        public class InputModel
        {
            public string Payload { get; set; }
        }

        // GET api/<FlightLogController>/5
        [HttpGet("{id}")]
        public async Task<ICollection<FlightLog>> Get(int id)
        {
            var flight = await _flightLog.GetFlightLog(id);
            return flight;
        }

        [HttpGet("getDetails/{id}")]
        public async Task<FlightLog> GetDetails(int id)
        {
            var flight = await _flightLog.GetFlightLogDetails(id);
            return flight;
        }

        // POST api/<FlightLogController>
        [HttpPost]
        public async Task<ActionResult<FlightLog>> Post([FromBody] InputModel Data)
        {
            string message = "started";
            string data = Data.Payload;
            string userId = _session.Get<string>("userId");
            if (data != null)
            {
                var returnDataObj = JsonConvert.DeserializeObject<FlightLog>(data);
                returnDataObj.UserId = userId;
                await _stats.SetStats(returnDataObj);
                await _flightLog.GiveTopBool(returnDataObj);
                await _db.FlightLogs.AddAsync(returnDataObj);
                await _db.SaveChangesAsync();
            }

            return Ok(message);
        }

        // DELETE api/<FlightLogController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
