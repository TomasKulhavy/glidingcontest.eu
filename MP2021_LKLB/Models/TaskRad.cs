using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MP2021_LKLB.Models
{
    public class TaskRad
    {
        [Key]
        public int Id { get; set; }
        public int? Radius { get; set; }
        public int RadiusTPId { get; set; }
        public int? No { get; set; }
        public RadiusTP RadiusTP { get; set; }
    }
}
