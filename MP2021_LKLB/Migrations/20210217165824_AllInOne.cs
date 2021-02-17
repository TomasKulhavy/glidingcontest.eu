using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MP2021_LKLB.Migrations
{
    public partial class AllInOne : Migration
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
                    { "ADMIN", "e2da6a9b-46b2-4d44-835b-5a4de0269e33", "PilotRole", "Administrator", "ADMINISTRATOR" },
                    { "PILOT", "6544bab8-088b-4982-9007-3f55bd932bfc", "PilotRole", "Pilot", "PILOT" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "FlightsNo", "Gender", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "SumKilometers", "TimeInSec", "TopScore", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "TOMAS123", 0, "d4a680e9-0df5-4d1b-8f87-757343f92b3e", "tomas.kulhavy@pslib.cz", true, "Tomáš", null, 0, "Kulhavý", false, null, "TOMAS.KULHAVY@PSLIB.CZ", "TOMASLKLB", "AQAAAAEAACcQAAAAEEAA5sXEnm/mOe8eppYR3bTbt5hoxjMgZ2J/4bVz13YQtU6PeczAtli1+jqtR5kWvw==", null, false, "", null, 0.0, null, false, "TomasLKLB" },
                    { "WOLF", 0, "72546789-c0d0-41f0-baa5-e6e7285bde94", "w.sluka@seznam.cz", true, "Wolfgang", null, 0, "Sluka", false, null, "W.SLUKA@SEZNAM.CZ", "WOLF", "AQAAAAEAACcQAAAAEEuAE9md08Jdv08pQlJDhjHMvQ5ClOpeDy6N7Jmt++Zk48Ftar3zEBGIgz1HjeaRYA==", null, false, "", null, 0.0, null, false, "Wolf" },
                    { "CICA", 0, "cc25b397-109e-49ac-8b17-6407ead93975", "meta5@seznam.cz", true, "Martin", null, 0, "Cicvárek", false, null, "META5@SEZNAM.CZ", "CÍCA", "AQAAAAEAACcQAAAAEJUTOlQpSrp7UZ5B0jM4BWY2r2umhOtXm74Dc4t7TEWnzy2fQwIemhACQ1zw0kIgzg==", null, false, "", null, 0.0, null, false, "Cíca" },
                    { "LUKASZ", 0, "e1468da5-e818-4834-a074-27b301467be5", "czajkolu@gmail.com", true, "Lukasz", null, 0, "Czaikowski", false, null, "CZAJKOLU@GMAIL.COM", "LUKASZ", "AQAAAAEAACcQAAAAEPR2j0QcPLj8Uy1TRz97J2wvA/tkUXVRHgMwKzWio3SjbYoVbT4u8rDmqrgXQmpHgQ==", null, false, "", null, 0.0, null, false, "Lukasz" },
                    { "JANHYB", 0, "168794fd-19d5-47e3-b472-cd49bf764dad", "jan.hyb@seznam.cz", true, "Jan", null, 0, "Hybner", false, null, "JAN.HYB@SEZNAM.CZ", "HONZAHYB", "AQAAAAEAACcQAAAAEPnRD17EcTOYuSfMwqcrHR31dD091DnPp5FjcZ7zbTtGC7NoXJpn7GOho+Tr3XMKcA==", null, false, "", null, 0.0, null, false, "HonzaHyb" },
                    { "ZDENEK", 0, "bd0a8ddd-a980-4d91-91f2-183212c81975", "Zdenek.Ulrych@seznam.cz", true, "Zdeněk", null, 0, "Ulrych", false, null, "ZDENEK.ULRYCH@SEZNAM.CZ", "ZDENEK", "AQAAAAEAACcQAAAAENYsYvZ059n67jAVk8YFn/oB/E5BTEXLPcbvDvP8uBBBX6bciarMbGT6ARA8XCRM4A==", null, false, "", null, 0.0, null, false, "Zdenek" },
                    { "PETRZA", 0, "d47630f1-6146-4e4b-ba14-a47d694e2c73", "petr-zajic@volny.cz", true, "Petr", null, 0, "Zajíc", false, null, "PETR-ZAJIC@VOLNY.CZ", "ZAJDA", "AQAAAAEAACcQAAAAEIPew/EBJP8aEMbndxZqRUh6+JxcwBHH1ZGn/fbTJFoGKcHUM/qJ8pFYvfN/EYVIrA==", null, false, "", null, 0.0, null, false, "Zajda" },
                    { "PETRHYB", 0, "5b25b92d-8f6a-4724-9efa-ab1654f03211", "petr-hybner@seznam.cz", true, "Petr", null, 0, "Hybner", false, null, "PETR-HYBNER@SEZNAM.CZ", "PETRHYB", "AQAAAAEAACcQAAAAEHG2Oe50/96N4TgKZ8LWKgoZgS2bmytUd1HREPvIx4d+wQZzSia6oAMyaa+ZEjJVmQ==", null, false, "", null, 0.0, null, false, "PetrHyb" },
                    { "RUDA", 0, "f6ab1798-dabf-4cc9-a0ed-b272ee78f70a", "patrman.rudolf@seznam.cz", true, "Rudolf", null, 0, "Patrman", false, null, "PATRMAN.RUDOLF@SEZNAM.CZ", "RUDA", "AQAAAAEAACcQAAAAECLSkfKkaEj9VTGzvwn14Q+vEkalu5rmgMPH88F0wvXveLxI5uxBGZFN/TZaBk6L5w==", null, false, "", null, 0.0, null, false, "Ruda" },
                    { "MILAN", 0, "900d0660-58a7-4c74-b8dd-6e407609a422", "milandvorak.gld@seznam.cz", true, "Milan", null, 0, "Dvořák", false, null, "MILANDVORAK.GLD@SEZNAM.CZ", "MILAN", "AQAAAAEAACcQAAAAEIFBV3bBPhOq6Ex/ztAo6AUcpSjKe4qJjeE/AdofpwEOB0oUdZO3F2yIDrRoRb9dAg==", null, false, "", null, 0.0, null, false, "Milan" }
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
