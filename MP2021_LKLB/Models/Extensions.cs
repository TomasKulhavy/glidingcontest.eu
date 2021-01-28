using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace MP2021_LKLB.Models
{
    public class Extensions
    {
        [Key]
        public int Id { get; set; }
        public string FXA { get; set; }
        public string ENL { get; set; }
        public string GSP { get; set; }
        public string TRT { get; set; }
        public string VAT { get; set; }
        public string WDI { get; set; }
        public string WVE { get; set; }

        public int DataRecordsId { get; set; }
        public DataRecords DataRecord { get; set; }

        public int FixesId { get; set; }
        public Fixes Fix { get; set; }
    }
}
