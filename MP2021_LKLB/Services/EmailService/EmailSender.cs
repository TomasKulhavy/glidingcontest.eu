using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Configuration;
using MimeKit;
using System;
using System.IO;
using System.Threading.Tasks;

namespace MP2021_LKLB.Services.EmailService
{
    public class EmailSender : IEmailSender
    {
        public IConfiguration Configuration { get; protected set; }
        public EmailSender(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public async Task SendEmailAsync(string email, string subject, string message)
        {
            // Plug in your email service here to send an email.
            var emailMessage = new MimeMessage();

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
