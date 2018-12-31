import nodemailer from 'nodemailer';
import { APPNAME, EMAIL } from './../../config';
const MailController    = {};



MailController.SendMail = (toMail, mailTitle, html, callBack) =>
{
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: EMAIL.user,
            pass: EMAIL.pass,
        }
    });

    let mailOptions = {
        from:`${ APPNAME } <${ EMAIL.user }>`,
        to: toMail,
        subject: mailTitle,
        html
    };

    return transporter.sendMail(mailOptions, callBack);
};



export default MailController;