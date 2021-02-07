using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MP2021_LKLB.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Display(Name = "Jméno")]
        [PersonalData]
        //[Required(ErrorMessage = "Jméno musí být vyplněno.")]
        public string FirstName { get; set; }

        [PersonalData]
        //[Required(ErrorMessage = "Příjmení musí být vyplněno.")]
        [Display(Name = "Příjmení")]
        public string LastName { get; set; }

        [PersonalData]
        //[Required(ErrorMessage = "Pohlaví musí být vyplněno.")]
        public Gender Gender { get; set; }

        [NotMapped]
        [Display(Name = "Jméno")]
        public string FullName
        {
            get
            {
                return FirstName + " " + LastName;
            }
        }
        [Display(Name = "Body")]
        public float? TopScore { get; set; }
        [Display(Name = "Nálet hodin")]
        public TimeSpan? SumHour { get; set; }
        [Display(Name = "Nálet kilometrů")]
        public float? SumKilometers { get; set; }

        public ICollection<FlightLog> Flights { get; set; }
    }
}
