﻿using Microsoft.EntityFrameworkCore;
using MP2021_LKLB.Data;
using MP2021_LKLB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MP2021_LKLB.Services.UserService
{
    public class UserService : IUserService
    {
        private ApplicationDbContext _db;

        public UserService(ApplicationDbContext db)
        {
            _db = db;
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

        public async Task<ICollection<FlightLog>> GetPilotsFlights(string id, int? year)
        {
            ICollection<FlightLog> flights = await _db.FlightLogs
                .Where(f => f.UserId.Equals(id))
                .Where(f => f.Date.Year == year)
                .OrderByDescending(f => f.Date)
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
    }
}
