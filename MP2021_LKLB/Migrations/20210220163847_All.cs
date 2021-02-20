using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MP2021_LKLB.Migrations
{
    public partial class All : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    TopScore = table.Column<float>(type: "real", nullable: true),
                    TimeInSec = table.Column<double>(type: "float", nullable: false),
                    FlightsNo = table.Column<int>(type: "int", nullable: true),
                    SumKilometers = table.Column<float>(type: "real", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DeviceCodes",
                columns: table => new
                {
                    UserCode = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    DeviceCode = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    SubjectId = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    SessionId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ClientId = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Expiration = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Data = table.Column<string>(type: "nvarchar(max)", maxLength: 50000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeviceCodes", x => x.UserCode);
                });

            migrationBuilder.CreateTable(
                name: "Feedbacks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Club = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Feedback = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GDPR = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedbacks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PersistedGrants",
                columns: table => new
                {
                    Key = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SubjectId = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    SessionId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ClientId = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Expiration = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ConsumedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Data = table.Column<string>(type: "nvarchar(max)", maxLength: 50000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersistedGrants", x => x.Key);
                });

            migrationBuilder.CreateTable(
                name: "Stats",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TimeInSeconds = table.Column<double>(type: "float", nullable: false),
                    Kilometers = table.Column<float>(type: "real", nullable: true),
                    FlightsNo = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stats", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FlightLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NumFlight = table.Column<int>(type: "int", nullable: true),
                    Pilot = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Copilot = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GliderType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Registration = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Callsign = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CompetitionClass = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LoggerType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FirmwareVersion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HardwareVersion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Errors = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Security = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LoggerId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LoggerManufacturer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Date = table.Column<DateTime>(type: "date", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FlightLogs_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DataRecords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Timestamp = table.Column<long>(type: "bigint", nullable: true),
                    Time = table.Column<TimeSpan>(type: "time", nullable: true),
                    FlightLogId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataRecords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DataRecords_FlightLogs_FlightLogId",
                        column: x => x.FlightLogId,
                        principalTable: "FlightLogs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Fixes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Timestamp = table.Column<long>(type: "bigint", nullable: true),
                    Time = table.Column<TimeSpan>(type: "time", nullable: true),
                    Latitude = table.Column<double>(type: "float", nullable: true),
                    Longitude = table.Column<double>(type: "float", nullable: true),
                    Valid = table.Column<bool>(type: "bit", nullable: false),
                    PressureAltitude = table.Column<int>(type: "int", nullable: true),
                    GpsAltitude = table.Column<int>(type: "int", nullable: true),
                    Enl = table.Column<double>(type: "float", nullable: true),
                    FixAccuracy = table.Column<int>(type: "int", nullable: true),
                    FlightLogId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fixes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Fixes_FlightLogs_FlightLogId",
                        column: x => x.FlightLogId,
                        principalTable: "FlightLogs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FlightLogAnalyses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    FlightTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    TaskTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    Score = table.Column<float>(type: "real", nullable: true),
                    Kilometers = table.Column<float>(type: "real", nullable: true),
                    AvgSpeed = table.Column<float>(type: "real", nullable: true),
                    Topflight = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightLogAnalyses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FlightLogAnalyses_FlightLogs_Id",
                        column: x => x.Id,
                        principalTable: "FlightLogs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FlightTasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    DeclarationDate = table.Column<DateTime>(type: "date", nullable: true),
                    DeclarationTime = table.Column<TimeSpan>(type: "time", nullable: true),
                    DeclarationTimestamp = table.Column<long>(type: "bigint", nullable: true),
                    FlightDate = table.Column<DateTime>(type: "date", nullable: true),
                    TaskNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NumTurnpoints = table.Column<int>(type: "int", nullable: true),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FlightTasks_FlightLogs_Id",
                        column: x => x.Id,
                        principalTable: "FlightLogs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Extensions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FXA = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ENL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GSP = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TRT = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VAT = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WDI = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WVE = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DataRecordsId = table.Column<int>(type: "int", nullable: false),
                    FixesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Extensions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Extensions_DataRecords_DataRecordsId",
                        column: x => x.DataRecordsId,
                        principalTable: "DataRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Extensions_Fixes_FixesId",
                        column: x => x.FixesId,
                        principalTable: "Fixes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Points",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Latitude = table.Column<double>(type: "float", nullable: true),
                    Longitude = table.Column<double>(type: "float", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FlightTaskId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Points", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Points_FlightTasks_FlightTaskId",
                        column: x => x.FlightTaskId,
                        principalTable: "FlightTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Discriminator", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "ADMIN", "5380fb20-6406-41d7-b7d0-c5686e517542", "PilotRole", "Administrator", "ADMINISTRATOR" },
                    { "PILOT", "6c71e837-05bc-4074-ba17-3bdd4d85f5d8", "PilotRole", "Pilot", "PILOT" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "FlightsNo", "Gender", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "SumKilometers", "TimeInSec", "TopScore", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "TOMAS123", 0, "c87a7fd4-8a80-42c3-aff4-90395cabbf30", "tomas.kulhavy@pslib.cz", true, "Tomáš", null, 0, "Kulhavý", false, null, "TOMAS.KULHAVY@PSLIB.CZ", "TOMASLKLB", "AQAAAAEAACcQAAAAEPA+OHEBmwrmY7U5MkPWF7QKO+TCzaOpHrNaWt7Wbe41y6xCM8nUX76345/4ikq5pA==", null, false, "", null, 0.0, null, false, "TomasLKLB" },
                    { "WOLF", 0, "3edc9bc6-a66e-4926-8377-6423b39e0a2a", "w.sluka@seznam.cz", true, "Wolfgang", null, 0, "Sluka", false, null, "W.SLUKA@SEZNAM.CZ", "WOLF", "AQAAAAEAACcQAAAAEHAexiVQgEe6SR6+bCuijka6//lgMyxFfgRooStOuv16/LYZuzANOdk07qp9TgkpUA==", null, false, "", null, 0.0, null, false, "Wolf" },
                    { "CICA", 0, "6fbee98c-3f11-4b1c-8dcf-ca3cce0771d9", "meta5@seznam.cz", true, "Martin", null, 0, "Cicvárek", false, null, "META5@SEZNAM.CZ", "CÍCA", "AQAAAAEAACcQAAAAEDNqXzgjfMdIUUGrRnXNJVAKuFtge0GIcTZI6QwTgjPoF0vgOVJDmDvUiZHL/TNwqw==", null, false, "", null, 0.0, null, false, "Cíca" },
                    { "LUKASZ", 0, "3b3f1f8e-3c94-4904-afd9-550980125ce1", "czajkolu@gmail.com", true, "Lukasz", null, 0, "Czaikowski", false, null, "CZAJKOLU@GMAIL.COM", "LUKASZ", "AQAAAAEAACcQAAAAEI8HiWFBBv1dSeJodvrZ2Sayrfnl58OIPHKo5LFCEtenHK9Q1BxjwT7+ZO3ponYGDg==", null, false, "", null, 0.0, null, false, "Lukasz" },
                    { "JANHYB", 0, "d957876f-9128-4447-817c-8f7b52269d2c", "jan.hyb@seznam.cz", true, "Jan", null, 0, "Hybner", false, null, "JAN.HYB@SEZNAM.CZ", "HONZAHYB", "AQAAAAEAACcQAAAAEMp0Bu3Mclb5OCdX1D9Qy5vg4QQ0L4DP7+uKS4Ng/0UCKvHFS5y5AymV7/0qU37jdA==", null, false, "", null, 0.0, null, false, "HonzaHyb" },
                    { "ZDENEK", 0, "25de64fa-0aef-48e3-af83-441d5ae1df7a", "Zdenek.Ulrych@seznam.cz", true, "Zdeněk", null, 0, "Ulrych", false, null, "ZDENEK.ULRYCH@SEZNAM.CZ", "ZDENEK", "AQAAAAEAACcQAAAAEE9h/v+sc6CuHE2VIcOKPSoSWSM9XaVT59HdRWR8PJrQcWmKfuSZxr6GcH5zG2cHZw==", null, false, "", null, 0.0, null, false, "Zdenek" },
                    { "PETRZA", 0, "e11ab7ed-ed0e-449e-a24b-4cc45b43d72b", "petr-zajic@volny.cz", true, "Petr", null, 0, "Zajíc", false, null, "PETR-ZAJIC@VOLNY.CZ", "ZAJDA", "AQAAAAEAACcQAAAAEKxjfncaCU780/nqcr4qGaNyhedf2WKN02aT+DTsqWyyRBZmQhvSauf6BuQn1cB5fA==", null, false, "", null, 0.0, null, false, "Zajda" },
                    { "PETRHYB", 0, "21b88aea-3644-4610-aa05-4ac57f910394", "petr-hybner@seznam.cz", true, "Petr", null, 0, "Hybner", false, null, "PETR-HYBNER@SEZNAM.CZ", "PETRHYB", "AQAAAAEAACcQAAAAEDfkx/D8cwSMTFIVa0KSWVAH+P2PaW86N2hANq9LP9CGPgSNQBDEfSNkaRHI2dwUvQ==", null, false, "", null, 0.0, null, false, "PetrHyb" },
                    { "RUDA", 0, "9f3d3978-bd4e-4e00-b6e2-d7245744b117", "patrman.rudolf@seznam.cz", true, "Rudolf", null, 0, "Patrman", false, null, "PATRMAN.RUDOLF@SEZNAM.CZ", "RUDA", "AQAAAAEAACcQAAAAENP98NtNRSPm951vmA+jhvyMKFp3rd44d50PGQBy5P1fhjPFAhnYd+WycPbdCYMLPw==", null, false, "", null, 0.0, null, false, "Ruda" },
                    { "MILAN", 0, "9b8945d9-6adb-4dc4-a147-3621395f61a1", "milandvorak.gld@seznam.cz", true, "Milan", null, 0, "Dvořák", false, null, "MILANDVORAK.GLD@SEZNAM.CZ", "MILAN", "AQAAAAEAACcQAAAAEMpEJYL+PSoFAyvWjpCH6y47U24mkqT+9klJ6hGSCg1pzQg1CaJfJ52OKIesm/Xy1Q==", null, false, "", null, 0.0, null, false, "Milan" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { "ADMIN", "TOMAS123" },
                    { "PILOT", "TOMAS123" },
                    { "PILOT", "MILAN" },
                    { "PILOT", "RUDA" },
                    { "PILOT", "LUKASZ" },
                    { "PILOT", "CICA" },
                    { "PILOT", "WOLF" },
                    { "PILOT", "PETRZA" },
                    { "PILOT", "PETRHYB" },
                    { "PILOT", "ZDENEK" },
                    { "PILOT", "JANHYB" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_DataRecords_FlightLogId",
                table: "DataRecords",
                column: "FlightLogId");

            migrationBuilder.CreateIndex(
                name: "IX_DeviceCodes_DeviceCode",
                table: "DeviceCodes",
                column: "DeviceCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DeviceCodes_Expiration",
                table: "DeviceCodes",
                column: "Expiration");

            migrationBuilder.CreateIndex(
                name: "IX_Extensions_DataRecordsId",
                table: "Extensions",
                column: "DataRecordsId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Extensions_FixesId",
                table: "Extensions",
                column: "FixesId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Fixes_FlightLogId",
                table: "Fixes",
                column: "FlightLogId");

            migrationBuilder.CreateIndex(
                name: "IX_FlightLogs_UserId",
                table: "FlightLogs",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PersistedGrants_Expiration",
                table: "PersistedGrants",
                column: "Expiration");

            migrationBuilder.CreateIndex(
                name: "IX_PersistedGrants_SubjectId_ClientId_Type",
                table: "PersistedGrants",
                columns: new[] { "SubjectId", "ClientId", "Type" });

            migrationBuilder.CreateIndex(
                name: "IX_PersistedGrants_SubjectId_SessionId_Type",
                table: "PersistedGrants",
                columns: new[] { "SubjectId", "SessionId", "Type" });

            migrationBuilder.CreateIndex(
                name: "IX_Points_FlightTaskId",
                table: "Points",
                column: "FlightTaskId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "DeviceCodes");

            migrationBuilder.DropTable(
                name: "Extensions");

            migrationBuilder.DropTable(
                name: "Feedbacks");

            migrationBuilder.DropTable(
                name: "FlightLogAnalyses");

            migrationBuilder.DropTable(
                name: "PersistedGrants");

            migrationBuilder.DropTable(
                name: "Points");

            migrationBuilder.DropTable(
                name: "Stats");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "DataRecords");

            migrationBuilder.DropTable(
                name: "Fixes");

            migrationBuilder.DropTable(
                name: "FlightTasks");

            migrationBuilder.DropTable(
                name: "FlightLogs");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
