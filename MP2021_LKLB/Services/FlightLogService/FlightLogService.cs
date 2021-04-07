using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MP2021_LKLB.Data;
using MP2021_LKLB.Models;
using MP2021_LKLB.Services.StatisticsService;
using MP2021_LKLB.ViewModels;
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
        public class InputModel
        {
            public string Payload { get; set; }
        }

        public FlightLogService(ApplicationDbContext db)
        {
            _db = db;
        }
        // GET
        public async Task<ICollection<FlightLog>> GetAllFlightLogs()
        {
            return await _db.FlightLogs.ToListAsync();
        }

        // GET ID
        public async Task<ICollection<FlightAnalyseVM>> GetFlightLog(int year, string sort = null)
        {
            var flights = await _db.FlightLogs
               .Where(x => x.Date.Year == year)
               .OrderByDescending(f => f.Date)
               .ThenByDescending(f => f.FlightLogAnalyse.Score)
               .Select(f => new FlightAnalyseVM
               {
                   Id = f.Id,
                   Date = f.Date,
                   Score = f.FlightLogAnalyse.Score,
                   Kilometers = f.FlightLogAnalyse.Kilometers,
                   AvgSpeed = f.FlightLogAnalyse.AvgSpeed,
                   GliderType = f.GliderType,
                   UserName = f.User.FullName
               })
               .ToListAsync();

            flights = sort switch
            {
                "lenght_desc" => flights.OrderByDescending(x => x.Kilometers).ToList(),
                "lenght_asc" => flights.OrderBy(x => x.Kilometers).ToList(),
                "name_desc" => flights.OrderByDescending(x => x.UserName).ToList(),
                "name_asc" => flights.OrderBy(x => x.UserName).ToList(),
                "type_desc" => flights.OrderByDescending(x => x.GliderType).ToList(),
                "type_asc" => flights.OrderBy(x => x.GliderType).ToList(),
                "speed_desc" => flights.OrderByDescending(x => x.AvgSpeed).ToList(),
                "speed_asc" => flights.OrderBy(x => x.AvgSpeed).ToList(),
                "score_desc" => flights.OrderByDescending(x => x.Score).ToList(),
                "score_asc" => flights.OrderBy(x => x.Score).ToList(),
                "date_desc" => flights.OrderByDescending(x => x.Date).ThenByDescending(x => x.Score).ToList(),
                "date_asc" => flights.OrderBy(x => x.Date).ThenByDescending(x => x.Score).ToList(),
                _ => flights.OrderByDescending(x => x.Date).ThenByDescending(x => x.Score).ToList(),
            };

            if (flights != null)
            {
                return flights;
            }
            else
            {
                return null;
            }
        }

        public async Task<FlightViewInfoVM> GetFlightLogDetails(int id)
        {
            var flightLog = await _db.FlightLogs
               .Where(x => x.Id == id)
               .OrderByDescending(f => f.Date)
               .ThenByDescending(f => f.FlightLogAnalyse.Score)
               .Include(f => f.FlightLogAnalyse)
               .Select(f => new FlightViewInfoVM
               {
                   PilotName = f.User.FullName,
                   UserId = f.UserId,
                   Date = f.Date,
                   GliderType = f.GliderType,
                   Registration = f.Registration,
                   FlightTime = f.FlightLogAnalyse.FlightTime.TotalSeconds,
                   AvgSpeed = f.FlightLogAnalyse.AvgSpeed,
                   Kilometers = f.FlightLogAnalyse.Kilometers,
                   Score = f.FlightLogAnalyse.Score,
                   TopFlight = f.FlightLogAnalyse.Topflight,
                   TaskTime = f.FlightLogAnalyse.TaskTime.TotalSeconds,
               })
               .FirstOrDefaultAsync();

            if (flightLog != null)
            {
                return flightLog;
            }
            else
            {
                return null;
            }
        }
        public async Task GiveTopBool(FlightLog flightLog)
        {
            string id = flightLog.UserId;
            int? year = flightLog.Date.Year;
            string userScoreId = flightLog.UserId;
            ICollection<FlightLog> flightsLog = GetPilotsFlights(id, year);
            ApplicationUser Users = await _db.Pilots.Where(f => f.Id == userScoreId).FirstOrDefaultAsync();

            ICollection<FlightLog> flights = flightsLog.OrderByDescending(f => f.FlightLogAnalyse.Score).Take(3).ToList();

            float? topScoreSum = 0;
            if(flights.Count > 0)
            {
                foreach (var item in flights)
                {
                    if (flights.Count > 2 && flightLog.FlightLogAnalyse.Score > item.FlightLogAnalyse.Score)
                    {
                        flightLog.FlightLogAnalyse.Topflight = true;
                        FlightLog lastFlight = flights.Last();
                        lastFlight.FlightLogAnalyse.Topflight = false;
                        topScoreSum = Users.TopScore;
                        topScoreSum = topScoreSum - lastFlight.FlightLogAnalyse.Score;
                        Users.TopScore = topScoreSum;
                        await _db.SaveChangesAsync();
                    

                        if (flightLog.FlightLogAnalyse.Topflight == true)
                        {
                            topScoreSum = Users.TopScore;
                            topScoreSum = topScoreSum + flightLog.FlightLogAnalyse.Score;
                            Users.TopScore = topScoreSum;
                            await _db.SaveChangesAsync();
                        }
                        break;
                    }
                    else if(flights.Count <= 2)
                    {

                        flightLog.FlightLogAnalyse.Topflight = true;
                        topScoreSum = Users.TopScore;
                        topScoreSum = topScoreSum + flightLog.FlightLogAnalyse.Score;
                        Users.TopScore = topScoreSum;
                        await _db.SaveChangesAsync();
                        break;
                    }
                }
            }
            else if(flights.Count == 0)
            {
                flightLog.FlightLogAnalyse.Topflight = true;
                await _db.SaveChangesAsync();
                if (Users.TopScore == null)
                {
                    topScoreSum = 0;
                }
                else
                {
                    topScoreSum = Users.TopScore;
                }

                topScoreSum = topScoreSum + flightLog.FlightLogAnalyse.Score;
                Users.TopScore = topScoreSum;
                await _db.SaveChangesAsync();
            }


            if (Users.SumKilometers == null)
            {
                Users.SumKilometers = flightLog.FlightLogAnalyse.Kilometers;
            }
            else if (Users.SumKilometers != null)
            {
                Users.SumKilometers = Users.SumKilometers + flightLog.FlightLogAnalyse.Kilometers;
            }

            long ticks = flightLog.FlightLogAnalyse.FlightTime.Ticks;
            double sec = TimeSpan.FromTicks(ticks).TotalSeconds;
            Users.TimeInSec += sec;

            if (Users.FlightsNo == null)
            {
                Users.FlightsNo = 1;
            }
            else if (Users.FlightsNo != null)
            {
                Users.FlightsNo += 1;
            }

            await _db.SaveChangesAsync();
        }
        public List<FlightLog> GetPilotsFlights(string id, int? year)
        {
            IQueryable<FlightLog> flightLogs = _db.FlightLogs
                .Include(f => f.FlightLogAnalyse)
                .Include(i => i.User)
                .Where(i => i.UserId.Equals(id))
                .OrderByDescending(f => f.Date)
                .ThenByDescending(f => f.FlightLogAnalyse.Score)
                .Where(f => f.Date.Year == year);
            return flightLogs.ToList();
        }

        public async Task<FlightLog> DeleteFlight(int id)
        {
            FlightLog flight = await _db.FlightLogs.Include(f => f.FlightLogAnalyse).Include(f => f.User).Where(fa => fa.Id == id).FirstOrDefaultAsync();
            ApplicationUser Users = await _db.Pilots.Where(f => f.Id == flight.UserId).FirstOrDefaultAsync();
            OverallStats stats = await _db.Stats.FindAsync(1);

            if (flight != null)
            {
                Users.SumKilometers -= flight.FlightLogAnalyse.Kilometers;
                long ticks = flight.FlightLogAnalyse.FlightTime.Ticks;
                double sec = TimeSpan.FromTicks(ticks).TotalSeconds;
                Users.TimeInSec -= sec;
                Users.FlightsNo -= 1;
                stats.FlightsNo -= 1;
                stats.Kilometers -= flight.FlightLogAnalyse.Kilometers;
                stats.TimeInSeconds -= sec;
                if (flight.FlightLogAnalyse.Topflight == true)
                {
                    Users.TopScore -= flight.FlightLogAnalyse.Score;
                }

                _db.FlightLogs.Remove(flight);

                await _db.SaveChangesAsync();
            }
            return flight;
        }

        public async Task<ICollection<FlightLog>> DeleteFlightWithUser(string id)
        {
            ICollection<FlightLog> flight = await _db.FlightLogs.Include(f => f.FlightLogAnalyse).Include(f => f.User).Where(fa => fa.UserId == id).ToListAsync();
            ApplicationUser Users = await _db.Pilots.Where(f => f.Id == id).FirstOrDefaultAsync();
            OverallStats stats = await _db.Stats.FindAsync(1);

            if (flight != null)
            {
                foreach (var flightDelete in flight)
                {
                    Users.SumKilometers -= flightDelete.FlightLogAnalyse.Kilometers;
                    long ticks = flightDelete.FlightLogAnalyse.FlightTime.Ticks;
                    double sec = TimeSpan.FromTicks(ticks).TotalSeconds;
                    Users.TimeInSec -= sec;
                    Users.FlightsNo -= 1;
                    stats.FlightsNo -= 1;
                    stats.Kilometers -= flightDelete.FlightLogAnalyse.Kilometers;
                    stats.TimeInSeconds -= sec;
                    if (flightDelete.FlightLogAnalyse.Topflight == true)
                    {
                        Users.TopScore -= flightDelete.FlightLogAnalyse.Score;
                    }

                    _db.FlightLogs.Remove(flightDelete);

                    await _db.SaveChangesAsync();
                }
            }
            return flight;
        }
    }
}
