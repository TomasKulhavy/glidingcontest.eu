using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MP2021_LKLB.ViewModels
{
    public class FlightViewInfoVM
    {
        public float? Score { get; set; }
        public string UserId { get; set; }
        public float? Kilometers { get; set; }
        public float? AvgSpeed { get; set; }
        public double? FlightTime { get; set; }
        public bool TopFlight { get; set; }
        public string GliderType { get; set; }
        public string Registration { get; set; }
        public DateTime Date { get; set; }
        public string PilotName { get; set; }
    }
}
