using Microsoft.AspNetCore.Mvc;
using MP2021_LKLB.Models;
using MP2021_LKLB.Services.ViewService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MP2021_LKLB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnalyseController : ControllerBase
    {
        private IViewService _view;

        public AnalyseController(IViewService view)
        {
            _view = view;
        }

        // GET: api/<AnalyseController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<AnalyseController>/5
        [HttpGet("{id}")]
        public async Task<ICollection<FlightLogAnalyse>> Get(int id)
        {
            var analyse = await _view.GetFlightLogAnalyse(id);
            return analyse;
        }

        // POST api/<AnalyseController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<AnalyseController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AnalyseController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
