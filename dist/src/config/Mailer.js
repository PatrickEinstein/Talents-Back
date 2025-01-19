import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const mailer = ({ mail, subject, text, html, }) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.USERMAIL,
                pass: process.env.MAILPASS,
            },
        });
        const mailOptions = {
            from: "HeartBeat",
            to: `${mail}, mohammedola1234@gmail.com`,
            subject: subject,
            text: text,
            html: html,
            // attachments: attachments,
        };
        transporter
            .sendMail(mailOptions)
            .then(() => {
            console.log("Mail sent successfully");
            resolve("Mail sent successfully");
        })
            .catch((error) => {
            console.error(error.message);
            resolve(error.message);
        });
    });
};
export default mailer;
