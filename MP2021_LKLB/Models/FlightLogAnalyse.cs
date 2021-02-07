using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace MP2021_LKLB.Models
{
    public class FlightLogAnalyse
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Čas letu")]
        public TimeSpan FlightTime { get; set; }
        [Display(Name = "Body")]
        public float? Score { get; set; }
        [Display(Name = "Kilometry")]
        public float? Kilometers { get; set; }
        [Display(Name = "Prům. rychlost")]
        public float? AvgSpeed { get; set; }
        public bool Topflight { get; set; }
        public FlightLog FlightLog { get; set; }
    }
}
