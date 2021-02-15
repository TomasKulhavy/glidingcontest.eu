using Microsoft.AspNetCore.Mvc;
using MP2021_LKLB.Models;
using MP2021_LKLB.Services.StatisticsService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MP2021_LKLB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private IStatisticsService _stats;

        public StatisticsController(IStatisticsService stats)
        {
            _stats = stats;
        }

        // GET: api/<StatisticsController>
        [HttpGet]
        public async Task<OverallStats> Get()
        {
            return await _stats.GetStats();
        }

        // GET api/<StatisticsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<StatisticsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<StatisticsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<StatisticsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
