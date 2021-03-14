using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MP2021_LKLB.Models;
using MP2021_LKLB.Data;
using MP2021_LKLB.Services.FeedbackService;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MP2021_LKLB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private ApplicationDbContext _db;
        private IFeedbackService _feedback;

        public FeedbackController(ApplicationDbContext db, IFeedbackService feedback)
        {
            _db = db;
            _feedback = feedback;
        }

        // GET: api/<FeedbackController>
        [HttpGet]
        public async Task<IEnumerable<FeedbackUser>> Get()
        {
            return await _feedback.GetAllReviews();
        }

        // GET api/<FeedbackController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<FeedbackController>
        [HttpPost]
        public async Task<ActionResult<FeedbackUser>> Post([FromBody] FeedbackUser feedback)
        {
            return await _feedback.Create(feedback);
        }

        // PUT api/<FeedbackController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<FeedbackController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
