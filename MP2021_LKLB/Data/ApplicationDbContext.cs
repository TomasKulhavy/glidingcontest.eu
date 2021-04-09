using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MP2021_LKLB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MP2021_LKLB.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<ApplicationUser> Pilots { get; set; }
        public DbSet<RadiusTP> RadiusTPs { get; set; }
        public DbSet<TaskRad> TaskRads { get; set; }
        public DbSet<FlightLog> FlightLogs { get; set; }
        public DbSet<DataRecords> DataRecords { get; set; }
        public DbSet<Fixes> Fixes { get; set; }
        public DbSet<FlightTask> FlightTasks { get; set; }
        public DbSet<FlightLogAnalyse> FlightLogAnalyses { get; set; }
        public DbSet<Points> Points { get; set; }
        public DbSet<FeedbackUser> Feedbacks { get; set; }
        public DbSet<OverallStats> Stats { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            var hasher = new PasswordHasher<ApplicationUser>();
            builder.Entity<PilotRole>().HasData(new PilotRole { Id = "ADMIN", Name = "Administrator", NormalizedName = "ADMINISTRATOR" });
            builder.Entity<PilotRole>().HasData(new PilotRole { Id = "PILOT", Name = "Pilot", NormalizedName = "PILOT" });
            builder.Entity<ApplicationUser>().HasData(new ApplicationUser
            {
                FirstName = "Tomáš",
                LastName = "Kulhavý",
                Gender = Gender.Muž,
                UserName = "TomasLKLB",
                NormalizedUserName = "TOMASLKLB",
                Email = "tomas.kulhavy@pslib.cz",
                NormalizedEmail = "TOMAS.KULHAVY@PSLIB.CZ",
                EmailConfirmed = true,
                LockoutEnabled = false,
                SecurityStamp = string.Empty,
                PasswordHash = hasher.HashPassword(null, "Adm1n1234#.")
            });

            builder.Entity<FlightLog>()
            .Property(e => e.Errors)
            .HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries));

            builder.Entity<DataRecords>()
                .HasOne(f => f.FlightLog)
                .WithMany(d => d.DataRecords)
                .HasForeignKey(fd => fd.FlightLogId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<FlightLog>()
                .HasOne(f => f.User)
                .WithMany(d => d.Flights)
                .HasForeignKey(fd => fd.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Fixes>()
                .HasOne(f => f.FlightLog)
                .WithMany(f => f.Fixes)
                .HasForeignKey(ff => ff.FlightLogId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<FlightLog>()
                .HasOne(f => f.RadiusTP)
                .WithOne(f => f.FlightLog)
                .HasForeignKey<RadiusTP>(t => t.Id)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<TaskRad>()
                .HasOne(f => f.RadiusTP)
                .WithMany(f => f.TaskRad)
                .HasForeignKey(ff => ff.RadiusTPId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<FlightLog>()
                .HasOne(t => t.Task)
                .WithOne(t => t.FlightLog)
                .HasForeignKey<FlightTask>(t => t.Id)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<FlightLog>()
                .HasOne(t => t.FlightLogAnalyse)
                .WithOne(t => t.FlightLog)
                .HasForeignKey<FlightLogAnalyse>(t => t.Id)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Points>()
                .HasOne(f => f.FlightTask)
                .WithMany(p => p.Points)
                .HasForeignKey(tp => tp.FlightTaskId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<DataRecords>()
                .HasOne(e => e.Extension)
                .WithOne(d => d.DataRecord)
                .HasForeignKey<Extensions>(d => d.DataRecordsId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Fixes>()
                .HasOne(e => e.Extension)
                .WithOne(f => f.Fix)
                .HasForeignKey<Extensions>(f => f.FixesId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
