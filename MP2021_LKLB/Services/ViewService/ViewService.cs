using Microsoft.EntityFrameworkCore;
using MP2021_LKLB.Data;
using MP2021_LKLB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MP2021_LKLB.Services.ViewService
{
    public class ViewService : IViewService
    {
        private ApplicationDbContext _db;

        public ViewService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<ICollection<FlightFixesVM>> GetFlightFixes(int id)
        {
            // Tahání Lat, Long přímo z DB
             var fixes = await _db.Fixes
                .Where(x => x.FlightLogId == id)
                .OrderBy(x => x.Timestamp)
                .Select(f => new FlightFixesVM { Latitude = f.Latitude, Longitude = f.Longitude })
                .ToListAsync();

            if (fixes != null)
            {
                return fixes;
            }
            else
            {
                return null;
            }
        }

        public async Task<ICollection<FlightGraphVM>> GetFlightGraph(int id)
        {
            var fixes = await _db.Fixes
               .Where(x => x.FlightLogId == id)
               .OrderBy(x => x.Timestamp)
               .Select(f => new FlightGraphVM { Timestamp = f.Timestamp, GpsAltitude = f.GpsAltitude })
               .ToListAsync();

            if (fixes != null)
            {
                return fixes;
            }
            else
            {
                return null;
            }
        }

        public async Task<ICollection<FlightLogAnalyse>> GetFlightLogAnalyse(int id)
        {
            ICollection<FlightLogAnalyse> fixes = await _db.FlightLogAnalyses
                .Where(x => x.FlightLog.Id == id)
                .ToListAsync();

            if (fixes != null)
            {
                return fixes;
            }
            else
            {
                return null;
            }
        }
        public async Task<ICollection<Points>> GetTask(int id)
        {
            ICollection<Points> points = await _db.Points
                .Where(x => x.FlightTask.FlightLog.Id == id)
                .ToListAsync();

            if (points != null)
            {
                return points;
            }
            else
            {
                return null;
            }
        }
    }
}
