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
        public async Task<FeedbackUser> Create(FeedbackUser input)
        {
            FeedbackUser feedback = new FeedbackUser
            {
                FirstName = input.FirstName,
                LastName = input.LastName,
                Email = input.Email,
                Club = input.Club,
                Feedback = input.Feedback,
            };
            _db.Feedbacks.Add(feedback);
            await _db.SaveChangesAsync();

            return feedback;
        }
    }
}
