using MP2021_LKLB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MP2021_LKLB.Services.ViewService
{
    public interface IViewService
    {
        Task<ICollection<Fixes>> GetFlightFixes(int id);

    }
}
