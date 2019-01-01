import nodemailer from 'nodemailer';
import { APPNAME, EMAIL } from './../../config';
import handlebars, { template } from 'handlebars';
import path from 'path';
import fs from 'fs';


const MailController    = {};
const DIR = path.join(__dirname + '/../public/mail');
const templates = [ 
    `${DIR}/passwordrecovery.hbs`
];



MailController.SendMail = (toMail, mailTitle, template, data={},callBack) =>
{
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: EMAIL.user,
            pass: EMAIL.pass,
        }
    });


    const html = MailController.RenderToString( templates[template] , data);

    let mailOptions = {
        from:`${ APPNAME } <${ EMAIL.user }>`,
        to: toMail,
        subject: mailTitle,
        html
    };

    return transporter.sendMail(mailOptions, callBack);
};


MailController.RenderToString = (dir, data) =>
{
    const source        = fs.readFileSync( dir ).toString();
    const template      = handlebars.compile( source );
    const outputString  = template( data );
    
    return outputString;
};


export default MailController;