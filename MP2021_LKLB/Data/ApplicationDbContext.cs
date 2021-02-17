using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MP2021_LKLB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MP2021_LKLB.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }
        public DbSet<ApplicationUser> Pilots { get; set; }
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
                Id = "TOMAS123",
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
                PasswordHash = hasher.HashPassword(null, "Admin")
            });
            builder.Entity<ApplicationUser>().HasData(new ApplicationUser
            {
                Id = "WOLF",
                FirstName = "Wolfgang",
                LastName = "Sluka",
                Gender = Gender.Muž,
                UserName = "Wolf",
                NormalizedUserName = "WOLF",
                Email = "w.sluka@seznam.cz",
                NormalizedEmail = "W.SLUKA@SEZNAM.CZ",
                EmailConfirmed = true,
                LockoutEnabled = false,
                SecurityStamp = string.Empty,
                PasswordHash = hasher.HashPassword(null, "L13Blanik.")
            });
            builder.Entity<ApplicationUser>().HasData(new ApplicationUser
            {
                Id = "CICA",
                FirstName = "Martin",
                LastName = "Cicvárek",
                Gender = Gender.Muž,
                UserName = "Cíca",
                NormalizedUserName = "CÍCA",
                Email = "meta5@seznam.cz",
                NormalizedEmail = "META5@SEZNAM.CZ",
                EmailConfirmed = true,
                LockoutEnabled = false,
                SecurityStamp = string.Empty,
                PasswordHash = hasher.HashPassword(null, "L13Blanik.")
            });
            builder.Entity<ApplicationUser>().HasData(new ApplicationUser
            {
                Id = "LUKASZ",
                FirstName = "Lukasz",
                LastName = "Czaikowski",
                Gender = Gender.Muž,
                UserName = "Lukasz",
                NormalizedUserName = "LUKASZ",
                Email = "czajkolu@gmail.com",
                NormalizedEmail = "CZAJKOLU@GMAIL.COM",
                EmailConfirmed = true,
                LockoutEnabled = false,
                SecurityStamp = string.Empty,
                PasswordHash = hasher.HashPassword(null, "L13Blanik.")
            });
            builder.Entity<ApplicationUser>().HasData(new ApplicationUser
            {
                Id = "JANHYB",
                FirstName = "Jan",
                LastName = "Hybner",
                Gender = Gender.Muž,
                UserName = "HonzaHyb",
                NormalizedUserName = "HONZAHYB",
                Email = "jan.hyb@seznam.cz",
                NormalizedEmail = "JAN.HYB@SEZNAM.CZ",
                EmailConfirmed = true,
                LockoutEnabled = false,
                SecurityStamp = string.Empty,
                PasswordHash = hasher.HashPassword(null, "L13Blanik.")
            });
            builder.Entity<ApplicationUser>().HasData(new ApplicationUser
            {
                Id = "ZDENEK",
                FirstName = "Zdeněk",
                LastName = "Ulrych",
                Gender = Gender.Muž,
                UserName = "Zdenek",
                NormalizedUserName = "ZDENEK",
                Email = "Zdenek.Ulrych@seznam.cz",
                NormalizedEmail = "ZDENEK.ULRYCH@SEZNAM.CZ",
                EmailConfirmed = true,
                LockoutEnabled = false,
                SecurityStamp = string.Empty,
                PasswordHash = hasher.HashPassword(null, "L13Blanik.")
            });
            builder.Entity<ApplicationUser>().HasData(new ApplicationUser
            {
                Id = "PETRZA",
                FirstName = "Petr",
                LastName = "Zajíc",
                Gender = Gender.Muž,
                UserName = "Zajda",
                NormalizedUserName = "ZAJDA",
                Email = "petr-zajic@volny.cz",
                NormalizedEmail = "PETR-ZAJIC@VOLNY.CZ",
                EmailConfirmed = true,
                LockoutEnabled = false,
                SecurityStamp = string.Empty,
                PasswordHash = hasher.HashPassword(null, "L13Blanik.")
            });
            builder.Entity<ApplicationUser>().HasData(new ApplicationUser
            {
                Id = "PETRHYB",
                FirstName = "Petr",
                LastName = "Hybner",
                Gender = Gender.Muž,
                UserName = "PetrHyb",
                NormalizedUserName = "PETRHYB",
                Email = "petr-hybner@seznam.cz",
                NormalizedEmail = "PETR-HYBNER@SEZNAM.CZ",
                EmailConfirmed = true,
                LockoutEnabled = false,
                SecurityStamp = string.Empty,
                PasswordHash = hasher.HashPassword(null, "L13Blanik.")
            });

            builder.Entity<ApplicationUser>().HasData(new ApplicationUser
            {
                Id = "RUDA",
                FirstName = "Rudolf",
                LastName = "Patrman",
                Gender = Gender.Muž,
                UserName = "Ruda",
                NormalizedUserName = "RUDA",
                Email = "patrman.rudolf@seznam.cz",
                NormalizedEmail = "PATRMAN.RUDOLF@SEZNAM.CZ",
                EmailConfirmed = true,
                LockoutEnabled = false,
                SecurityStamp = string.Empty,
                PasswordHash = hasher.HashPassword(null, "L13Blanik.")
            });
            builder.Entity<ApplicationUser>().HasData(new ApplicationUser
            {
                Id = "MILAN",
                FirstName = "Milan",
                LastName = "Dvořák",
                Gender = Gender.Muž,
                UserName = "Milan",
                NormalizedUserName = "MILAN",
                Email = "milandvorak.gld@seznam.cz",
                NormalizedEmail = "MILANDVORAK.GLD@SEZNAM.CZ",
                EmailConfirmed = true,
                LockoutEnabled = false,
                SecurityStamp = string.Empty,
                PasswordHash = hasher.HashPassword(null, "L13Blanik.")
            });
            builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string> { RoleId = "ADMIN", UserId = "TOMAS123" });
            builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string> { RoleId = "PILOT", UserId = "TOMAS123" });
            builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string> { RoleId = "PILOT", UserId = "MILAN" });
            builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string> { RoleId = "PILOT", UserId = "RUDA" });
            builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string> { RoleId = "PILOT", UserId = "LUKASZ" });
            builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string> { RoleId = "PILOT", UserId = "CICA" });
            builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string> { RoleId = "PILOT", UserId = "WOLF" });
            builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string> { RoleId = "PILOT", UserId = "PETRZA" });
            builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string> { RoleId = "PILOT", UserId = "PETRHYB" });
            builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string> { RoleId = "PILOT", UserId = "ZDENEK" });
            builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string> { RoleId = "PILOT", UserId = "JANHYB" });

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
