using MP2021_LKLB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MP2021_LKLB.ViewModels
{
    public class PilotProfileVM
    {
        public string Name { get; set; }
        public double? FlightTime { get; set; }
        public float? Kilometers { get; set; }
        public string Email { get; set; }
        public DateTime Birth { get; set; }
        public string PhoneNumber { get; set; }
    }
}
