import nodemailer from 'nodemailer'
import config from '../config';

export const sendEmail = async (to:string,html:string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.NODE_ENV === 'production', // true for port 465, false for other ports
        auth: {
            user: "postbox7406@gmail.com",
            pass: "ibsu pigp novh qbig",
        },
    });
    await transporter.sendMail({
        from: 'postbox7406@gmail.com', // sender address
        to: to, // list of receivers
        subject: "Rest your password", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>${html}</b>`, // html body
    });
}