using MP2021_LKLB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MP2021_LKLB.Services.ViewService
{
    public interface IViewService
    {
        Task<ICollection<FlightFixesVM>> GetFlightFixes(int id);
        Task<ICollection<FlightGraphVM>> GetFlightGraph(int id);
        Task<ICollection<Points>> GetTask(int id);
        Task<ICollection<int>> GetYearsList();
        Task<ICollection<int>> GetYearsPilot(string id);
    }
}
