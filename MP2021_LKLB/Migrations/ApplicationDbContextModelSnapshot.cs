﻿// <auto-generated />
using System;
using MP2021_LKLB.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace MP2021_LKLB.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.2");

            modelBuilder.Entity("IdentityServer4.EntityFramework.Entities.DeviceFlowCodes", b =>
                {
                    b.Property<string>("UserCode")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("ClientId")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasMaxLength(50000)
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("DeviceCode")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<DateTime?>("Expiration")
                        .IsRequired()
                        .HasColumnType("datetime2");

                    b.Property<string>("SessionId")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("SubjectId")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.HasKey("UserCode");

                    b.HasIndex("DeviceCode")
                        .IsUnique();

                    b.HasIndex("Expiration");

                    b.ToTable("DeviceCodes");
                });

            modelBuilder.Entity("IdentityServer4.EntityFramework.Entities.PersistedGrant", b =>
                {
                    b.Property<string>("Key")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("ClientId")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<DateTime?>("ConsumedTime")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasMaxLength(50000)
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<DateTime?>("Expiration")
                        .HasColumnType("datetime2");

                    b.Property<string>("SessionId")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("SubjectId")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Key");

                    b.HasIndex("Expiration");

                    b.HasIndex("SubjectId", "ClientId", "Type");

                    b.HasIndex("SubjectId", "SessionId", "Type");

                    b.ToTable("PersistedGrants");
                });

            modelBuilder.Entity("MP2021_LKLB.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("FlightsNo")
                        .HasColumnType("int");

                    b.Property<int>("Gender")
                        .HasColumnType("int");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float?>("SumKilometers")
                        .HasColumnType("real");

                    b.Property<double>("TimeInSec")
                        .HasColumnType("float");

                    b.Property<float?>("TopScore")
                        .HasColumnType("real");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");

                    b.HasData(
                        new
                        {
                            Id = "TomasLKLB",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "9327e4bb-560b-42b5-87f8-a5d238b44a3a",
                            Email = "tomas.kulhavy@pslib.cz",
                            EmailConfirmed = true,
                            FirstName = "Tomáš",
                            Gender = 0,
                            LastName = "Kulhavý",
                            LockoutEnabled = false,
                            NormalizedEmail = "TOMAS.KULHAVY@PSLIB.CZ",
                            NormalizedUserName = "TOMASLKLB",
                            PasswordHash = "AQAAAAEAACcQAAAAELVA5UM+QxCCmNpflVE7KqLXM5lM9es5+SKDU4IOyMlIQKmP36Zijpi2QWdDrUsnmw==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "",
                            TimeInSec = 0.0,
                            TwoFactorEnabled = false,
                            UserName = "TomasLKLB"
                        });
                });

            modelBuilder.Entity("MP2021_LKLB.Models.DataRecords", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("FlightLogId")
                        .HasColumnType("int");

                    b.Property<TimeSpan?>("Time")
                        .HasColumnType("time");

                    b.Property<long?>("Timestamp")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("FlightLogId");

                    b.ToTable("DataRecords");
                });

            modelBuilder.Entity("MP2021_LKLB.Models.Extensions", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("DataRecordsId")
                        .HasColumnType("int");

                    b.Property<string>("ENL")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FXA")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("FixesId")
                        .HasColumnType("int");

                    b.Property<string>("GSP")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TRT")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("VAT")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("WDI")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("WVE")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DataRecordsId")
                        .IsUnique();

                    b.HasIndex("FixesId")
                        .IsUnique();

                    b.ToTable("Extensions");
                });

            modelBuilder.Entity("MP2021_LKLB.Models.FeedbackUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Club")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Feedback")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Feedbacks");
                });

            modelBuilder.Entity("MP2021_LKLB.Models.Fixes", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<double?>("Enl")
                        .HasColumnType("float");

                    b.Property<int?>("FixAccuracy")
                        .HasColumnType("int");

                    b.Property<int>("FlightLogId")
                        .HasColumnType("int");

                    b.Property<int?>("GpsAltitude")
                        .HasColumnType("int");

                    b.Property<double?>("Latitude")
                        .HasColumnType("float");

                    b.Property<double?>("Longitude")
                        .HasColumnType("float");

                    b.Property<int?>("PressureAltitude")
                        .HasColumnType("int");

                    b.Property<TimeSpan?>("Time")
                        .HasColumnType("time");

                    b.Property<long?>("Timestamp")
                        .HasColumnType("bigint");

                    b.Property<bool>("Valid")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("FlightLogId");

                    b.ToTable("Fixes");
                });

            modelBuilder.Entity("MP2021_LKLB.Models.FlightLog", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Callsign")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CompetitionClass")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Copilot")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("date");

                    b.Property<string>("Errors")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirmwareVersion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("GliderType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HardwareVersion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LoggerId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LoggerManufacturer")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LoggerType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("NumFlight")
                        .HasColumnType("int");

                    b.Property<string>("Pilot")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Registration")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Security")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("FlightLogs");
                });

            modelBuilder.Entity("MP2021_LKLB.Models.FlightLogAnalyse", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<float?>("AvgSpeed")
                        .HasColumnType("real");

                    b.Property<TimeSpan>("FlightTime")
                        .HasColumnType("time");

                    b.Property<float?>("Kilometers")
                        .HasColumnType("real");

                    b.Property<float?>("Score")
                        .HasColumnType("real");

                    b.Property<TimeSpan>("TaskTime")
                        .HasColumnType("time");

                    b.Property<bool>("Topflight")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("FlightLogAnalyses");
                });

            modelBuilder.Entity("MP2021_LKLB.Models.FlightTask", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("Comment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("DeclarationDate")
                        .HasColumnType("date");

                    b.Property<TimeSpan?>("DeclarationTime")
                        .HasColumnType("time");

                    b.Property<long?>("DeclarationTimestamp")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("FlightDate")
                        .HasColumnType("date");

                    b.Property<int?>("NumTurnpoints")
                        .HasColumnType("int");

                    b.Property<string>("TaskNumber")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("FlightTasks");
                });

            modelBuilder.Entity("MP2021_LKLB.Models.OverallStats", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int?>("FlightsNo")
                        .HasColumnType("int");

                    b.Property<float?>("Kilometers")
                        .HasColumnType("real");

                    b.Property<double>("TimeInSeconds")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("Stats");
                });

            modelBuilder.Entity("MP2021_LKLB.Models.Points", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("FlightTaskId")
                        .HasColumnType("int");

                    b.Property<double?>("Latitude")
                        .HasColumnType("float");

                    b.Property<double?>("Longitude")
                        .HasColumnType("float");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("FlightTaskId");

                    b.ToTable("Points");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");

                    b.HasDiscriminator<string>("Discriminator").HasValue("IdentityRole");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");

                    b.HasData(
                        new
                        {
                            UserId = "TomasLKLB",
                            RoleId = "ADMIN"
                        },
                        new
                        {
                            UserId = "TomasLKLB",
                            RoleId = "PILOT"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("MP2021_LKLB.Models.PilotRole", b =>
                {
                    b.HasBaseType("Microsoft.AspNetCore.Identity.IdentityRole");

                    b.HasDiscriminator().HasValue("PilotRole");

                    b.HasData(
                        new
                        {
                            Id = "ADMIN",
                            ConcurrencyStamp = "2efa0128-43bb-4e0b-8f8c-09fe73c02beb",
                            Name = "Administrator",
                            NormalizedName = "ADMINISTRATOR"
                        },
                        new
                        {
                            Id = "PILOT",
                            ConcurrencyStamp = "512bfedb-c994-4740-8ee1-3bf8068e4ef5",
                            Name = "Pilot",
                            NormalizedName = "PILOT"
                        });
                });

            modelBuilder.Entity("MP2021_LKLB.Models.DataRecords", b =>
                {
                    b.HasOne("MP2021_LKLB.Models.FlightLog", "FlightLog")
                        .WithMany("DataRecords")
                        .HasForeignKey("FlightLogId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("FlightLog");
                });

            modelBuilder.Entity("MP2021_LKLB.Models.Extensions", b =>
                {
                    b.HasOne("MP2021_LKLB.Models.DataRecords", "DataRecord")
                        .WithOne("Extension")
                        .HasForeignKey("MP2021_LKLB.Models.Extensions", "DataRecordsId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("MP2021_LKLB.Models.Fixes", "Fix")
                        .WithOne("Extension")
                        .HasForeignKey("MP2021_LKLB.Models.Extensions", "FixesId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("DataRecord");

                    b.Navigation("Fix");
                });

            modelBuilder.Entity("MP2021_LKLB.Models.Fixes", b =>
                {
                    b.HasOne("MP2021_LKLB.Models.FlightLog", "FlightLog")
                        .WithMany("Fixes")
                        .HasForeignKey("FlightLogId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("FlightLog");
                });

            modelBuilder.Entity("MP2021_LKLB.Models.FlightLog", b =>
                {
                    b.HasOne("MP2021_LKLB.Models.ApplicationUser", "User")
                        .WithMany("Flights")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("User");
                });

            modelBuilder.Entity("MP2021_LKLB.Models.FlightLogAnalyse", b =>
                {
                    b.HasOne("MP2021_LKLB.Models.FlightLog", "FlightLog")
                        .WithOne("FlightLogAnalyse")
                        .HasForeignKey("MP2021_LKLB.Models.FlightLogAnalyse", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("FlightLog");
                });

            modelBuilder.Entity("MP2021_LKLB.Models.FlightTask", b =>
                {
                    b.HasOne("MP2021_LKLB.Models.FlightLog", "FlightLog")
                        .WithOne("Task")
                        .HasForeignKey("MP2021_LKLB.Models.FlightTask", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("FlightLog");
                });

            modelBuilder.Entity("MP2021_LKLB.Models.Points", b =>
                {
                    b.HasOne("MP2021_LKLB.Models.FlightTask", "FlightTask")
                        .WithMany("Points")
                        .HasForeignKey("FlightTaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("FlightTask");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("MP2021_LKLB.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("MP2021_LKLB.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MP2021_LKLB.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("MP2021_LKLB.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("MP2021_LKLB.Models.ApplicationUser", b =>
                {
                    b.Navigation("Flights");
                });

            modelBuilder.Entity("MP2021_LKLB.Models.DataRecords", b =>
                {
                    b.Navigation("Extension");
                });

            modelBuilder.Entity("MP2021_LKLB.Models.Fixes", b =>
                {
                    b.Navigation("Extension");
                });

            modelBuilder.Entity("MP2021_LKLB.Models.FlightLog", b =>
                {
                    b.Navigation("DataRecords");

                    b.Navigation("Fixes");

                    b.Navigation("FlightLogAnalyse");

                    b.Navigation("Task");
                });

            modelBuilder.Entity("MP2021_LKLB.Models.FlightTask", b =>
                {
                    b.Navigation("Points");
                });
#pragma warning restore 612, 618
        }
    }
}
