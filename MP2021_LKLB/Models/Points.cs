using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace MP2021_LKLB.Models
{
    public class Points
    {
        [Key]
        public int Id { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public string Name { get; set; }

        public int FlightTaskId { get; set; }
        public FlightTask FlightTask { get; set; }
    }
}
