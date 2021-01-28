using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MP2021_LKLB.Models
{
    public class PilotRole : IdentityRole
    {
        [Display(Name = "Název")]
        public override string Name { get; set; }
    }
}
