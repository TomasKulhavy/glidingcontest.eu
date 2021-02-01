﻿using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using MP2021_LKLB.Data;
using MP2021_LKLB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MP2021_LKLB.Services
{
    public class FlightService : IFlight
    {
        private ApplicationDbContext _db;
        private readonly IHttpContextAccessor _http;
        public string _user;

        public string ActiveUserId { get; set; }
        public FlightService(ApplicationDbContext db, IHttpContextAccessor http, Identity identity)
        {
            _db = db;
            _http = http;
            _user = identity.LoginId;
        }

        public List<Fixes> GetFlight(int flightid)
        {
            IQueryable<Fixes> flight = _db.Fixes.Where(f => f.FlightLogId == flightid);
            return flight.ToList();
        }

        public List<FlightLog> GetPilotsFlights(string id, int? year)
        {
            IQueryable<FlightLog> flightLogs = _db.FlightLogs.Include(f => f.FlightLogAnalyse).Include(i => i.User).Where(i => i.UserId.Equals(id)).OrderByDescending(f => f.Date).ThenByDescending(f => f.FlightLogAnalyse.Score).Where(f => f.Date.Year == year);
            return flightLogs.ToList();
        }
        public async Task<ICollection<FlightLog>> GetFlightLogs(int? year)
        {
            return await _db.FlightLogs./*Include(f => f.FlightLogAnalyse).Include(f => f.User).*/Where(f => f.Date.Year == year)/*.OrderByDescending(f => f.Date).ThenByDescending(f => f.FlightLogAnalyse.Score)*/.ToListAsync();
        }

        public async Task<ICollection<FlightLog>> GetAllFlightLogs()
        {
            return await _db.FlightLogs.ToListAsync();
        }

        public List<FlightLog> GetTopFlights()
        {
            IQueryable<FlightLog> flightLogs = _db.FlightLogs.Include(f => f.FlightLogAnalyse).Include(f => f.User).OrderByDescending(f => f.FlightLogAnalyse.Score).Take(10);
            return flightLogs.ToList();
        }
        public string GetActiveUserId(string id)
        {
            ApplicationUser user = _db.Pilots.Where(f => f.UserName == id).FirstOrDefault();
            string userId = user.Id;
            ActiveUserId = userId;
            return userId;
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
                    //flight.FlightLogAnalyse.Topflight = false;
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
        public List<ApplicationUser> GetTops()
        {
            IQueryable<FlightLog> top = _db.FlightLogs.Include(s => s.FlightLogAnalyse).Where(s => s.FlightLogAnalyse.Topflight.Equals(true));
            List<ApplicationUser> pilots = _db.Pilots.OrderByDescending(f => f.TopScore).ToList();
            foreach (var item in pilots)
            {
                float? topscoresum = 0;
                foreach (var flight in top)
                {
                    if (flight.UserId == item.Id)
                    {
                        topscoresum = topscoresum + flight.FlightLogAnalyse.Score;
                        item.TopScore = topscoresum;
                    }
                }
            }
            return pilots;
        }
    }
}
