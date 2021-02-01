using MP2021_LKLB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MP2021_LKLB.Services
{
    public interface IFlight
    {
        public List<FlightLog> GetPilotsFlights(string name, int? year);
        Task<ICollection<FlightLog>> GetFlightLogs(int? year);
        Task<ICollection<FlightLog>> GetAllFlightLogs();
        public List<FlightLog> GetTopFlights();
        public List<ApplicationUser> GetTops();
        public List<Fixes> GetFlight(int flightid);
        public string GetActiveUserId(string id);
        public void GiveTopBool(FlightLog flightLog);
    }
}
