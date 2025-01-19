import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";
import dotenv from "dotenv";
dotenv.config();

type Attaches = {
  filename: string;
  content: string;
  cid: string;
};

type Attachmments = Attaches[];
const mailer = ({
  mail,
  subject,
  text,
  html,
}: {
  mail: string;
  subject: string;
  text: string;
  html: string;
}) =>
  // attachments: Attachmments
  {
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

      const mailOptions: MailOptions = {
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
        .catch((error: any) => {
          console.error(error.message);
          resolve(error.message);
        });
    });
  };

export default mailer;
