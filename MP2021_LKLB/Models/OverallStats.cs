using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MP2021_LKLB.Models
{
    public class OverallStats
    {
        [Key]
        public int Id { get; set; }
        [Display(Name = "Počet hodin")]
        public double TimeInSeconds { get; set; }
        [Display(Name = "Počet kilometrů")]
        public float? Kilometers { get; set; }
        [Display(Name = "Počet letů")]
        public int? FlightsNo { get; set; }
    }
}
