using Microsoft.AspNetCore.Mvc;
using MP2021_LKLB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MP2021_LKLB.Services.StatisticsService
{
    public interface IStatisticsService
    {
        Task<OverallStats> SetStats(FlightLog flightlog);
    }
}
