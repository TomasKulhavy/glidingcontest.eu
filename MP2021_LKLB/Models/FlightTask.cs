using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MP2021_LKLB.Models
{
    public class FlightTask
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "date")]
        public DateTime? DeclarationDate { get; set; }
        public TimeSpan? DeclarationTime { get; set; }
        public long? DeclarationTimestamp { get; set; }
        [Column(TypeName = "date")]
        public DateTime? FlightDate { get; set; }
        public string TaskNumber { get; set; }
        public int? NumTurnpoints { get; set; }
        public string Comment { get; set; }
        public ICollection<Points> Points { get; set; }

        public FlightLog FlightLog { get; set; }
    }
}
