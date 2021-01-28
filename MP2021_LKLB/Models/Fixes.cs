using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace MP2021_LKLB.Models
{
    public class Fixes
    {
        [Key]
        public int Id { get; set; }
        public long? Timestamp { get; set; }
        public TimeSpan? Time { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public bool Valid { get; set; }
        public int? PressureAltitude { get; set; }
        public int? GpsAltitude { get; set; }
        public Extensions Extension { get; set; }
        public double? Enl { get; set; }
        public int? FixAccuracy { get; set; }

        public int FlightLogId { get; set; }
        public FlightLog FlightLog { get; set; }
    }
}
