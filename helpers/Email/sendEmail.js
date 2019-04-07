
// // codigo ejemplo  https://nodemailer.com/about/
// // config zoho https://www.zoho.com/mail/help/zoho-smtp.html
// // email zoho https://mail.zoho.com/zm/#settings/all/mailaccounts
// // mxtoolbox https://mxtoolbox.com/SuperTool.aspx?action=mx%3azoho._domainkey.oscarrosete.com&run=toolpage#
// // mx lookup oscarrosete.com
// // namesilo manage domain name https://www.namesilo.com/account_domain_manage_dns.php
// // domain status https://mail.zoho.com/cpanel/index.do?tabmode=domain#domains

"use strict";
const nodemailer = require("nodemailer");

exports.sendEmail = async (emailInfo) => {
    try {
        const transporter = nodemailer.createTransport(
            emailInfo.smtpClient
        );

        // setup email data with unicode symbols
        const mailOptions = {
            from: '"Oscar Rosete 👻" <admin@oscarrosete.com>', // sender address
            to: emailInfo.to, // list of receivers
            subject: emailInfo.subject, // Subject line
            html: emailInfo.htmlContent ,// html body,
            attachments:emailInfo.attachments
        };
        console.log("dentro de sendEmail")
        console.log(mailOptions.subject)
        // send mail with defined transport object
        const info = await transporter.sendMail(mailOptions)

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

