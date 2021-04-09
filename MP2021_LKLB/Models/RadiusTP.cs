using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MP2021_LKLB.Models
{
    public class RadiusTP
    {
        [Key] 
        public int Id { get; set; }
        public ICollection<TaskRad> TaskRad { get; set; }
        public FlightLog FlightLog { get; set; }
    }
}
