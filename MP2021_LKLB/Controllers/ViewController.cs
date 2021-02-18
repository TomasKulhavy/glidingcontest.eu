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
    public class ViewController : ControllerBase
    {
        private IViewService _view;

        public ViewController(IViewService view)
        {
            _view = view;
        }

        // GET: api/<ViewController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ViewController>/5
        [HttpGet("{id}")]
        public async Task<ICollection<FlightFixesVM>> Get(int id)
        {
            var fixes = await _view.GetFlightFixes(id);
            return fixes;
        }

        [HttpGet("graph/{id}")]
        public async Task<ICollection<FlightGraphVM>> GetFlightGraph(int id)
        {
            var fixes = await _view.GetFlightGraph(id);
            return fixes;
        }

        [HttpGet("getTask/{id}")]
        public async Task<ICollection<Points>> GetTask(int id)
        {
            var points = await _view.GetTask(id);
            return points;
        }

        // POST api/<ViewController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ViewController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ViewController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
