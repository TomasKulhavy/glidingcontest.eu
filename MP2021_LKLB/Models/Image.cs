using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;
using Microsoft.AspNetCore.Http;

namespace MP2021_LKLB.Models
{
    public class Image
    {
        [Key]
        public int ImageId { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        [DisplayName("Popisek k fotce")]
        public string Title { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        [DisplayName("Upload File")]
        public string ImageName { get; set; }
        [NotMapped]
        [DisplayName("Nahrajte fotku")]
        public IFormFile ImageFile { get; set; }
    }
}
