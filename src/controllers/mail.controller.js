import nodemailer from 'nodemailer';
const MailController    = {};



MailController.SendMail = (toMail, mailTitle, html, callBack) =>
{
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'no.replyteacherapp@gmail.com',
            pass: 'Perro123'
        }
    });

    let mailOptions = {
        from:'TeacherApp <no.replyteacherapp@gmail.com>',
        to: toMail,
        subject: mailTitle,
        html
    };

    return transporter.sendMail(mailOptions, callBack);
};



export default MailController;