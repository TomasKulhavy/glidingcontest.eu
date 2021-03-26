using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MP2021_LKLB.Data;
using MP2021_LKLB.InputModels;
using MP2021_LKLB.Models;
using MP2021_LKLB.Services;
using MP2021_LKLB.Services.UserService;
using MP2021_LKLB.ViewModels;

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
        private IEmailSender _emailSender;
        private IUserService _user;
        public AccountController(IConfiguration config, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IEmailSender emailSender, IUserService user, ApplicationDbContext db)
        {
            _config = config;
            _userManager = userManager;
            _signInManager = signInManager;
            _db = db;
            _user = user;
            _emailSender = emailSender;
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

        [HttpGet("profile/{id}")]
        [Authorize]
        public async Task<PilotProfileVM> GetPilotProfile(string id)
        {
            return await _user.GetUserProfile(id);
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
            await _user.Delete(user.Id);
            await _userManager.DeleteAsync(user);
            return NoContent();
        }

        [HttpDelete("deleteUser/{id}")]
        [Authorize]
        public async Task<ActionResult<ApplicationUser>> DeleteUserOur(string id)
        {
            ApplicationUser user = await _db.Pilots.Where(f => f.Id == id).FirstOrDefaultAsync();
            await Logout();
            await _user.Delete(user.Id);
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
                await _emailSender.SendEmailAsync(userData.Email, "Vítejte na Glidingcontest.eu!", $"Dobrý den {userData.FirstName} {userData.LastName},\nděkujeme, že jste se zaregistrovali na naší stránce https://glidingcontest.eu/. \n\nEmail: {userData.Email} \nUživatelské jméno: {userData.UserName} \n\n Glidingcontest.eu");
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
            var userName = await _userManager.Users.Where(u => u.Email == userData.Email).FirstOrDefaultAsync();
            var result = await _signInManager.PasswordSignInAsync(userName.UserName, userData.Password, false, false);
            if (result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(userData.Email);
                AuthorizationToken token = GenerateJSONWebToken(user);
                return Ok(token);
            }
            return Unauthorized();
        }

        [HttpPost("forgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] UserIM userData)
        {
            
            var user = await _userManager.Users.Where(u => u.Email == userData.Email).FirstOrDefaultAsync();

            var code = await _userManager.GeneratePasswordResetTokenAsync(user);

            string origin = Request.Headers["origin"];
            var link = $"{origin}/password/reset?token={code}";

            await _emailSender.SendEmailAsync(
                userData.Email,
                "Zapomenuté heslo na Glidingcontest.eu",
                $"Dobrý den {user.FullName}, \nodkaz na obnovení hesla: {link} \n\n Glidingcontest.eu.");

            return Ok();
        }

        [HttpPut("changePassword")]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordIM userData)
        {
            var user = await _userManager.Users.Where(u => u.Id == userData.Id).FirstOrDefaultAsync();

            var changePasswordResult = await _userManager.ChangePasswordAsync(user, userData.OldPassword, userData.NewPassword);
            if (!changePasswordResult.Succeeded)
            {
                return BadRequest();
            }

            await _signInManager.RefreshSignInAsync(user);
            return Ok();
        }

        [HttpPost("changeEmail/{id}/{email}")]
        [Authorize]
        public async Task<IActionResult> ChangeEmail(string id, string email)
        {
            var user = await _userManager.Users.Where(u => u.Id == id).FirstOrDefaultAsync();

            if (user == null)
            {
                return BadRequest();
            }

            user.Email = email;
            await _db.SaveChangesAsync();
            return Ok(new { user = user });
        }

        [HttpPost("changeBirth/{id}/{date}")]
        [Authorize]
        public async Task<IActionResult> ChangeEmail(string id, DateTime birth)
        {
            var user = await _userManager.Users.Where(u => u.Id == id).FirstOrDefaultAsync();

            if (user == null)
            {
                return BadRequest();
            }

            user.BirthDay = birth;
            await _db.SaveChangesAsync();
            return Ok(new { user = user });
        }


        [HttpPost("changePhone/{id}/{number}")]
        [Authorize]
        public async Task<IActionResult> ChangeNumber(string id, string number)
        {
            var user = await _userManager.Users.Where(u => u.Id == id).FirstOrDefaultAsync();

            if (user == null)
            {
                return BadRequest();
            }

            user.PhoneNumber = number;
            await _db.SaveChangesAsync();
            return Ok(new { user = user });
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordIM resetPassword)
        {
            var user = await _userManager.FindByEmailAsync(resetPassword.Email);
            if (user == null)
                return BadRequest();
            resetPassword.Token = resetPassword.Token.Replace(' ', '+');
            var result = await _userManager.ResetPasswordAsync(user, resetPassword.Token, resetPassword.Password);
            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        private AuthorizationToken GenerateJSONWebToken(ApplicationUser user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.GivenName, user.UserName),
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