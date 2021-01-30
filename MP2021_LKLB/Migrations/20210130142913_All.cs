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
                name: "Images",
                columns: table => new
                {
                    ImageId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ImageName = table.Column<string>(type: "nvarchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.ImageId);
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
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
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
                    DeclarationDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeclarationTime = table.Column<TimeSpan>(type: "time", nullable: true),
                    DeclarationTimestamp = table.Column<long>(type: "bigint", nullable: true),
                    FlightDate = table.Column<DateTime>(type: "datetime2", nullable: true),
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
                    { "ADMIN", "68304c85-f3b2-4c86-a78b-cf225c5563f8", "PilotRole", "Administrator", "ADMINISTRATOR" },
                    { "PILOT", "ae497b7f-04bd-421e-b622-cef66b89e621", "PilotRole", "Pilot", "PILOT" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "Gender", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TopScore", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "TOMAS123", 0, "502e17ab-5c9e-46be-b253-3810deaa2274", "tomas.kulhavy@pslib.cz", true, "Tomáš", 0, "Kulhavý", false, null, "TOMAS.KULHAVY@PSLIB.CZ", "TOMASLKLB", "AQAAAAEAACcQAAAAEJZjIuDuluSqEgmN5vDCUNIBdf8vLUXzY4aHKs1bV//tF16YY40WP+sRDyH6V6UPJg==", null, false, "", null, false, "TomasLKLB" },
                    { "WOLF", 0, "5649595a-6b8b-48ce-9f56-28474d5de805", "w.sluka@seznam.cz", true, "Wolfgang", 0, "Sluka", false, null, "W.SLUKA@SEZNAM.CZ", "WOLF", "AQAAAAEAACcQAAAAEAjK2ksJNjhMytxK9oLsqKNOC3wq5D6Y+jhP46EgrmYIvoK7002OivbRbDfYGSX4Cg==", null, false, "", null, false, "Wolf" },
                    { "CICA", 0, "3cf3de7a-195b-41a6-8dd3-54f06d51d83b", "meta5@seznam.cz", true, "Martin", 0, "Cicvárek", false, null, "META5@SEZNAM.CZ", "CÍCA", "AQAAAAEAACcQAAAAEIVoPM+qq40TjiKahHL5beSmL7nAQ3vRZO4Mt9IObY/OA8I7YdZMAkQaeEJpxXo/ag==", null, false, "", null, false, "Cíca" },
                    { "LUKASZ", 0, "ace64d63-4b83-44f9-b8f3-e1276f7fa796", "czajkolu@gmail.com", true, "Lukasz", 0, "Czaikowski", false, null, "CZAJKOLU@GMAIL.COM", "LUKASZ", "AQAAAAEAACcQAAAAEJBQPeoWSmcDuPZW9+teeSiSzYqV2wMGwxAaV+IA4gRsXGy7Z8dk7pieLpZ1FZqnXQ==", null, false, "", null, false, "Lukasz" },
                    { "JANHYB", 0, "64902d3e-cb1c-4d3b-8799-117187a629c3", "jan.hyb@seznam.cz", true, "Jan", 0, "Hybner", false, null, "JAN.HYB@SEZNAM.CZ", "HONZAHYB", "AQAAAAEAACcQAAAAEK4Gf9XEEYFUxA7GtEOrzq3piyjyv3ZFs7qW6Pvft35IwUU0DKAY9bgj8RTX/cgYVg==", null, false, "", null, false, "HonzaHyb" },
                    { "ZDENEK", 0, "2d354d0c-4bcf-48f1-9930-5aee2d97f3be", "Zdenek.Ulrych@seznam.cz", true, "Zdeněk", 0, "Ulrych", false, null, "ZDENEK.ULRYCH@SEZNAM.CZ", "ZDENEK", "AQAAAAEAACcQAAAAELB+B6Bk5HgoOUP92MBBg66O6gDUcbQ9OrzH/V+6opXG8ifhWVhiIs8knqzdCwMVAA==", null, false, "", null, false, "Zdenek" },
                    { "PETRZA", 0, "77948275-d015-4acf-af82-6d339085c87d", "petr-zajic@volny.cz", true, "Petr", 0, "Zajíc", false, null, "PETR-ZAJIC@VOLNY.CZ", "ZAJDA", "AQAAAAEAACcQAAAAEKUjUDrVOjcHxVtihEcyy6i6Ky+qhW/sjdide/KmhyDgZ2jU+YmGe1N7OS+UeLDEGA==", null, false, "", null, false, "Zajda" },
                    { "PETRHYB", 0, "94048acc-a326-470d-92c9-05f1734dfcf8", "petr-hybner@seznam.cz", true, "Petr", 0, "Hybner", false, null, "PETR-HYBNER@SEZNAM.CZ", "PETRHYB", "AQAAAAEAACcQAAAAEHcLjgVktVwIYBaevB2M2cZ9C/grE4Z8LXr5qdND6/BmUaZ+3EW8Y/5X452beZ+Bmw==", null, false, "", null, false, "PetrHyb" },
                    { "RUDA", 0, "befbebc6-0f86-4f24-af24-4d92732ab37f", "patrman.rudolf@seznam.cz", true, "Rudolf", 0, "Patrman", false, null, "PATRMAN.RUDOLF@SEZNAM.CZ", "RUDA", "AQAAAAEAACcQAAAAEN7Tj/GxJ2RtrSx4DfrXqU0bSbOOvN2UnFqmHuaMttbVIBcTEhlVb3KgTPIf/0E5rQ==", null, false, "", null, false, "Ruda" },
                    { "MILAN", 0, "ac39836c-baa1-49e4-a0fd-76577a1688c1", "milandvorak.gld@seznam.cz", true, "Milan", 0, "Dvořák", false, null, "MILANDVORAK.GLD@SEZNAM.CZ", "MILAN", "AQAAAAEAACcQAAAAECsMgrVmnRqsnjIk+yWx1KZ5ArKSbVN4cd2cYTCOgU6Dlqo4TtdoIBtWdxIywQZurw==", null, false, "", null, false, "Milan" }
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
                name: "FlightLogAnalyses");

            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropTable(
                name: "PersistedGrants");

            migrationBuilder.DropTable(
                name: "Points");

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
