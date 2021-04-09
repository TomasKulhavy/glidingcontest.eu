using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Castle.MicroKernel.SubSystems.Conversion;
using System.ComponentModel.DataAnnotations.Schema;

namespace MP2021_LKLB.Models
{
    public class FlightLog
    {
        [Key]
        public int Id { get; set; }
        public int? NumFlight { get; set; }
        [Display(Name = "Jméno pilota")]
        public string Pilot { get; set; }
        public string Copilot { get; set; }
        [Display(Name = "Typ kluzáku")]
        public string GliderType { get; set; }
        [Display(Name = "Registrace")]
        public string Registration { get; set; }
        [Display(Name = "Startovní znak")]
        public string Callsign { get; set; }
        public string CompetitionClass { get; set; }
        public string LoggerType { get; set; }
        public string FirmwareVersion { get; set; }
        public string HardwareVersion { get; set; }
        public FlightTask Task { get; set; }
        public ICollection<Fixes> Fixes { get; set; }
        public ICollection<DataRecords> DataRecords { get; set; }
        public FlightLogAnalyse FlightLogAnalyse { get; set; }
        public string[] Errors { get; set; }
        public string Security { get; set; }
        public string LoggerId { get; set; }
        public string LoggerManufacturer { get; set; }
        [Display(Name = "Datum")]
        [Column(TypeName = "date")]
        public DateTime Date { get; set; }
        public RadiusTP RadiusTP { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
