using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MP2021_LKLB.Models;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MP2021_LKLB.Services.EmailService
{
    public class EmailSender : IEmailSender
    {
        public IConfiguration Configuration { get; protected set; }
        private UserManager<ApplicationUser> _userManager;
        public EmailSender(IConfiguration configuration, UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
            Configuration = configuration;
        }
        private string PopulateBody(string userName, string fullName, string url, string email)
        {
            string body = string.Empty;
            string dir = System.IO.Path.GetDirectoryName(
      System.Reflection.Assembly.GetExecutingAssembly().Location);
            using (StreamReader reader = new StreamReader(dir + @"\Email\EmailWelcome.html"))
            {
                body = reader.ReadToEnd();
            }
            body = body.Replace("{UserName}", userName);
            body = body.Replace("{FullName}", fullName);
            body = body.Replace("{URL}", url);
            body = body.Replace("{Email}", email);
            return body;
        }
        public async Task SendEmailAsync(string email, string subject, string message)
        {
            // Plug in your email service here to send an email.
            var emailMessage = new MimeMessage();
            var user = await _userManager.Users.Where(u => u.Email == email).FirstOrDefaultAsync();
            //var body = PopulateBody(user.UserName, user.FullName, message, email);
            emailMessage.From.Add(new MailboxAddress(Configuration["EmailSender:FromName"], Configuration["EmailSender:From"]));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart("plain") { Text = message };

            await Task.Run(() =>
            {
                using (var client = new SmtpClient())
                {
                    client.Connect(Configuration["EmailSender:Server"], 465, true);

                    // Note: since we don't have an OAuth2 token, disable
                    // the XOAUTH2 authentication mechanism.
                    client.AuthenticationMechanisms.Remove("XOAUTH2");

                    // Note: only needed if the SMTP server requires authentication
                    client.Authenticate(Configuration["EmailSender:Username"], Configuration["EmailSender:Password"]);

                    client.Send(emailMessage);
                    client.Disconnect(true);
                }
            });
        }
    }
}
