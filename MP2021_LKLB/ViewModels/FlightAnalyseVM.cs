using MP2021_LKLB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MP2021_LKLB.ViewModels
{
    public class FlightAnalyseVM
    {
        public DateTime Date { get; set; }
        public string UserName { get; set; }
        public string GliderType { get; set; }
        public float? Score { get; set; }
        public float? AvgSpeed { get; set; }
        public float? Kilometers { get; set; }
    }
}
