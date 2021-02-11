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
            return await _db.FlightLogs.ToListAsync();
        }
        // GET ID
        public async Task<ICollection<FlightLog>> GetFlightLog(int id)
        {
            ICollection<FlightLog> flightLog = await _db.FlightLogs
                //.Include(f => f.User)
                .Where(x => x.Date.Year == id)
                .OrderByDescending(f => f.Date)
                .ToListAsync();

            if (flightLog != null)
            {
                return flightLog;
            }
            else
            {
                return null;
            }
        }

        public async Task<FlightLog> GetFlightLogDetails(int id)
        {
            FlightLog flightLog = await _db.FlightLogs
                .Where(x => x.Id == id)
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
        public void GiveTopBool(FlightLog flightLog)
        {
            string id = flightLog.UserId;
            int? year = flightLog.Date.Year;
            string userScoreId = flightLog.UserId;
            List<FlightLog> flightsLog = GetPilotsFlights(id, year);
            ApplicationUser Users = _db.Pilots.Where(f => f.Id == userScoreId).FirstOrDefault();

            List<FlightLog> flights = flightsLog.OrderByDescending(f => f.FlightLogAnalyse.Score).Take(3).ToList();
            //FlightLog flight = flightsLog.OrderBy(f => f.FlightLogAnalyse.Score).First();

            foreach (var item in flights)
            {
                if (flightLog.FlightLogAnalyse.Score > item.FlightLogAnalyse.Score)
                {
                    flightLog.FlightLogAnalyse.Topflight = true;
                    //flightLog.FlightLogAnalyse.Topflight = false;
                    if (flightLog.FlightLogAnalyse.Topflight == true)
                    {
                        if (Users.TopScore == null)
                        {
                            Users.TopScore = flightLog.FlightLogAnalyse.Score;
                        }
                        else if (Users.TopScore != null)
                        {
                            Users.TopScore = Users.TopScore + flightLog.FlightLogAnalyse.Score;
                        }
                    }
                }
                else if (item.FlightLogAnalyse.Score == null)
                {
                    flightLog.FlightLogAnalyse.Topflight = true;
                }
                else
                {
                    flightLog.FlightLogAnalyse.Topflight = false;
                    item.FlightLogAnalyse.Topflight = true;
                }
            }

            if (Users.SumKilometers == null)
            {
                Users.SumKilometers = flightLog.FlightLogAnalyse.Kilometers;
            }
            else if (Users.SumKilometers != null)
            {
                Users.SumKilometers = Users.SumKilometers + flightLog.FlightLogAnalyse.Kilometers;
            }
            if (Users.SumHour == null)
            {
                Users.SumHour = flightLog.FlightLogAnalyse.FlightTime;
            }
            else if (Users.SumHour != null)
            {
                Users.SumHour = Users.SumHour + flightLog.FlightLogAnalyse.FlightTime;
            }
        }
        public List<FlightLog> GetPilotsFlights(string id, int? year)
        {
            IQueryable<FlightLog> flightLogs = _db.FlightLogs.Include(f => f.FlightLogAnalyse).Include(i => i.User).Where(i => i.UserId.Equals(id)).OrderByDescending(f => f.Date).ThenByDescending(f => f.FlightLogAnalyse.Score).Where(f => f.Date.Year == year);
            return flightLogs.ToList();
        }

        //    public void FlightAnalyse(FlightLog flightLog)
        //    {
        //        string id = flightLog.UserId;
        //        int? year = flightLog.Date.Year;
        //        string userScoreId = flightLog.UserId;
        //        ApplicationUser Users = _db.Pilots.Where(f => f.Id == userScoreId).FirstOrDefault();
        //        FlightLogAnalyse Analyse = _db.FlightLogAnalyses.Where(f => f.Fligh == userScoreId).FirstOrDefault();

        //        Users.Flights.

        //        foreach (var item in flights)
        //        {
        //            if (flightLog.FlightLogAnalyse.Score > item.FlightLogAnalyse.Score)
        //            {
        //                flightLog.FlightLogAnalyse.Topflight = true;
        //                //flight.FlightLogAnalyse.Topflight = false;
        //            }
        //            else if (item.FlightLogAnalyse.Score == null)
        //            {
        //                flightLog.FlightLogAnalyse.Topflight = true;
        //            }
        //            else
        //            {
        //                flightLog.FlightLogAnalyse.Topflight = false;
        //                item.FlightLogAnalyse.Topflight = true;
        //            }
        //        }

        //        if (flightLog.FlightLogAnalyse.Topflight == true)
        //        {
        //            if (Users.TopScore == null)
        //            {
        //                Users.TopScore = flightLog.FlightLogAnalyse.Score;
        //            }
        //            else if (Users.TopScore != null)
        //            {
        //                Users.TopScore = Users.TopScore + flightLog.FlightLogAnalyse.Score;
        //            }
        //        }
        //    }
        //}
    }
}
