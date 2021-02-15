using Microsoft.EntityFrameworkCore;
using MP2021_LKLB.Data;
using MP2021_LKLB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MP2021_LKLB.Services.FeedbackService
{
    public class FeedbackService : IFeedbackService
    {
        private ApplicationDbContext _db;

        public FeedbackService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<ICollection<FeedbackUser>> GetAllReviews()
        {
            return await _db.Feedbacks.ToListAsync();
        }
    }
}
