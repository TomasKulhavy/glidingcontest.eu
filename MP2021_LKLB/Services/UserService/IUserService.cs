using MP2021_LKLB.Models;
using MP2021_LKLB.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MP2021_LKLB.Services.UserService
{
    public interface IUserService
    {
        Task<ICollection<ApplicationUser>> GetAllUsers();
        Task<ICollection<ApplicationUser>> GetUsersHours();
        Task<ICollection<ApplicationUser>> GetUsersKilometers();
        Task<ICollection<ApplicationUser>> GetUsers(string id);
        Task<ICollection<ApplicationUser>> GetPilotTops();
        Task<ICollection<ApplicationUser>> GetPilotOrder();
        Task<ICollection<FlightAnalyseVM>> GetPilotsFlights(string id, int? year);
        Task<ApplicationUser> GetPilotsStats(string id);
        Task<ApplicationUser> Delete(string id);
    }
}
