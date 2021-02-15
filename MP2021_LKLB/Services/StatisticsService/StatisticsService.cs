using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MP2021_LKLB.Data;
using MP2021_LKLB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MP2021_LKLB.Services.StatisticsService
{
    public class StatisticsService : IStatisticsService
    {
        private ApplicationDbContext _db;

        public StatisticsService(ApplicationDbContext db)
        {
            _db = db;
        }
        public async Task<OverallStats> SetStats(FlightLog flightLog)
        {
            long ticks = flightLog.FlightLogAnalyse.FlightTime.Ticks;
            double sec = TimeSpan.FromTicks(ticks).TotalSeconds;
            float? kilometers = flightLog.FlightLogAnalyse.Kilometers;
            byte flightno = 1;
            
            OverallStats stats = await _db.Stats.Where(f => f.Id == 1).FirstOrDefaultAsync();
            if (stats == null)
            {
                _db.Stats.Add(new OverallStats() { TimeInSeconds = sec, Kilometers = kilometers, FlightsNo = flightno });
            }
            else
            {
                stats.TimeInSeconds += sec;
                stats.Kilometers += kilometers;
                stats.FlightsNo += flightno;
            }

            return stats;
        }
    }
}
