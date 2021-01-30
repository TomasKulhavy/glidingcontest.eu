using Microsoft.EntityFrameworkCore;
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
            return await _db.Pilots.ToListAsync();
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
            ICollection<ApplicationUser> pilots = await _db.Pilots.Where(f => f.TopScore != null).OrderByDescending(f => f.TopScore).ToListAsync();
            return pilots;
        }
    }
}
