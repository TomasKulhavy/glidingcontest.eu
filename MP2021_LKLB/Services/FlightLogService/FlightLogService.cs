using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using MP2021_LKLB.Data;
using MP2021_LKLB.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MP2021_LKLB.Services.FlightLogService
{
    public class FlightLogService : IFlightLogService
    {
        private ApplicationDbContext _db;
        private readonly IHttpContextAccessor _http;
        public string _user;
        public class InputModel
        {
            public string Payload { get; set; }
        }

        public FlightLogService(ApplicationDbContext db, IHttpContextAccessor http, Identity identity)
        {
            _db = db;
            _http = http;
            _user = identity.LoginId;
        }
        // GET
        public async Task<ICollection<FlightLog>> GetAllFlightLogs()
        {
            return await _db.FlightLogs.Include(f => f.Fixes).ToListAsync();
        }
        // GET ID
        public async Task<FlightLog> GetFlightLog(int id)
        {
            FlightLog flightLog = await _db.FlightLogs.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (flightLog != null)
            {
                return flightLog;
            }
            else
            {
                return null;
            }
        }
    }
}
