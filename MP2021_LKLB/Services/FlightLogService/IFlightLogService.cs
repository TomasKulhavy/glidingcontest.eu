using MP2021_LKLB.Models;
using MP2021_LKLB.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MP2021_LKLB.Services.FlightLogService
{
    public interface IFlightLogService
    {
        Task<ICollection<FlightLog>> GetAllFlightLogs();
        Task<ICollection<FlightAnalyseVM>> GetFlightLog(int year);
        Task<FlightViewInfoVM> GetFlightLogDetails(int id);
        Task GiveTopBool(FlightLog flightLog);
        List<FlightLog> GetPilotsFlights(string id, int? year);
        Task<FlightLog> DeleteFlight(int id);
        Task<ICollection<FlightLog>> DeleteFlightWithUser(string id);
    }
}
