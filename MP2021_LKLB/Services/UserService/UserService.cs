using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MP2021_LKLB.Data;
using MP2021_LKLB.Models;
using MP2021_LKLB.Services.FlightLogService;
using MP2021_LKLB.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MP2021_LKLB.Services.UserService
{
    public class UserService : IUserService
    {
        private ApplicationDbContext _db;
        private IFlightLogService _flight;

        public UserService(ApplicationDbContext db, IFlightLogService flight)
        {
            _db = db;
            _flight = flight;
        }

        public async Task<ICollection<ApplicationUser>> GetAllUsers()
        {
            return await _db.Pilots.OrderBy(f => f.FirstName).ToListAsync();
        }

        public async Task<ICollection<ApplicationUser>> GetUsersHours()
        {
            return await _db.Pilots.Where(f => f.TimeInSec > 0).OrderByDescending(f => f.TimeInSec).Take(5).ToListAsync();
        }

        public async Task<ICollection<ApplicationUser>> GetPilotOrder()
        {
            return await _db.Pilots.OrderByDescending(f => f.TopScore).ThenBy(f => f.FirstName).ToListAsync();
        }

        public async Task<ApplicationUser> GetPilotsStats(string id)
        {
            return await _db.Pilots.Where(f => f.Id == id).FirstOrDefaultAsync();
        }

        public async Task<ICollection<FlightAnalyseVM>> GetPilotsFlights(string id, int? year)
        {
            var flights = await _db.FlightLogs
               .Where(f => f.UserId.Equals(id))
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
                   GliderType = f.GliderType
               })
               .ToListAsync();

            if (flights != null)
            {
                return flights;
            }
            else
            {
                return null;
            }
        }

        public async Task<ICollection<ApplicationUser>> GetUsers(string id)
        {
            ICollection<ApplicationUser> identityUsers = new List<ApplicationUser>();
            id = id.Trim();
            if (id.Contains("@"))
            {
                identityUsers = await _db.Pilots.Where(x => x.Email.Contains(id)).ToListAsync();
            }
            else
            {
                identityUsers = await _db.Pilots.Where(x => x.UserName.Contains(id)).ToListAsync();

            }
            return identityUsers;
        }

        public async Task<ICollection<ApplicationUser>> GetPilotTops()
        {
            ICollection<ApplicationUser> pilots = await _db.Pilots.Where(f => f.TopScore != null).OrderByDescending(f => f.TopScore).Take(5).ToListAsync();
            return pilots;
        }

        public async Task<ICollection<ApplicationUser>> GetUsersKilometers()
        {
            return await _db.Pilots.Where(f => f.SumKilometers != null).OrderByDescending(f => f.SumKilometers).Take(5).ToListAsync();
        }

        public async Task<ApplicationUser> Delete(string id)
        {
            ApplicationUser user = await _db.Pilots.Where(f => f.Id == id).FirstOrDefaultAsync();
            await _flight.DeleteFlightWithUser(id);
            return user;
        }
    }
}
