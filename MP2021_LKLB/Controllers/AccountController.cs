using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MP2021_LKLB.Data;
using MP2021_LKLB.Models;
using MP2021_LKLB.Services;
using MP2021_LKLB.Services.UserService;

namespace MP2021_LKLB.Controllers
{
    // https://www.c-sharpcorner.com/article/jwt-json-web-token-authentication-in-asp-net-core/
    // https://codeburst.io/jwt-auth-in-asp-net-core-148fb72bed03

    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IConfiguration _config;
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private ApplicationDbContext _db;
        private IUserService _user;
        public AccountController(IConfiguration config, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IUserService user, ApplicationDbContext db)
        {
            _config = config;
            _userManager = userManager;
            _signInManager = signInManager;
            _db = db;
            _user = user;
        }

        [HttpGet]
        [Authorize]
        public ActionResult<string> GetAccount()
        {
            var c = User.Claims.Where(c => c.Type == ClaimTypes.Name).FirstOrDefault();
            if (c != null)
            {
                return Ok(c.Value);
            }
            return NotFound();
        }

        [HttpGet("getToken")]
        public async Task<IActionResult> GetAccountToken()
        {
            var c = User.Claims.Where(c => c.Type == ClaimTypes.Name).FirstOrDefault();
            if (c != null)
            {
                var user = await _userManager.FindByNameAsync(c.Value);
                AuthorizationToken token = GenerateJSONWebToken(user);
                return Ok(token);
            }
            return Unauthorized();
        }

        [HttpGet("id")]
        [Authorize]
        public ActionResult<string> GetAccountId()
        {
            var c = User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).FirstOrDefault();
            if (c != null)
            {
                return Ok(c.Value);
            }
            return NotFound();
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetAccount(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                return NotFound();
            }
            return Ok(new { Id = user.Id, UserName = user.UserName });
        }

        [HttpDelete("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        [Authorize]
        public async Task<ActionResult<ApplicationUser>> DeleteUser(string id)
        {
            ApplicationUser user = await _db.Pilots.Where(f => f.Id == id).FirstOrDefaultAsync();
            await _user.Delete(user.UserName);
            await _userManager.DeleteAsync(user);
            return NoContent();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterIM userData)
        {
            var user = await _userManager.FindByNameAsync(userData.Email);
            if (user != null)
            {
                return BadRequest("user already registered");
            }
            var hasher = new PasswordHasher<ApplicationUser>();
            var newUser = new ApplicationUser
            {
                Id = userData.UserName,
                UserName = userData.UserName,
                Email = userData.Email,
                FirstName = userData.FirstName,
                LastName = userData.LastName,
                EmailConfirmed = true,
                PasswordHash = hasher.HashPassword(null, userData.Password)
            };
            var result = await _userManager.CreateAsync(newUser);
            if (result.Succeeded)
            {
                return CreatedAtAction("GetAccount", new { id = newUser.Id }, newUser);
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserIM userData)
        {
            var result = await _signInManager.PasswordSignInAsync(userData.Email, userData.Password, userData.isPersistant, false);
            if (result.Succeeded)
            {
                var user = await _userManager.FindByNameAsync(userData.Email);
                AuthorizationToken token = GenerateJSONWebToken(user);
                return Ok(token);
            }
            return Unauthorized();
        }

        private AuthorizationToken GenerateJSONWebToken(ApplicationUser user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var expiration = DateTime.Now.AddMinutes(60);
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                expires: expiration,
                signingCredentials: credentials);
            var accessToken = new JwtSecurityTokenHandler().WriteToken(token);
            return new AuthorizationToken { AccessToken = accessToken };
        }
    }
}