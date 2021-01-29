using MP2021_LKLB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MP2021_LKLB.Services.FlightLogService
{
    public interface IFlightLogService
    {
        Task<ICollection<FlightLog>> GetAllFlightLogs();
        Task<ICollection<FlightLog>> GetFlightLog(int id);
        Task<FlightLog> GetFlightLogDetails(int id);
        Task<ICollection<ApplicationUser>> GetTops();
    }
}
