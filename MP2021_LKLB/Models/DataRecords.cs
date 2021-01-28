using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace MP2021_LKLB.Models
{
    public class DataRecords
    {
        [Key]
        public int Id { get; set; }
        public long? Timestamp { get; set; }
        public TimeSpan? Time { get; set; }
        public Extensions Extension { get; set; }


        public int FlightLogId { get; set; }
        public FlightLog FlightLog { get; set; }
    }
}
