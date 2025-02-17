const sendExternalMail = async (emailObject: {
  fromUsername: string;
  tomail: string;
  subject: string;
  text: string;
  html: string;
}) => {
  try {
    const sendMailer = await fetch(
      "https://new-mailer-5hpr.onrender.com/api/sendMail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "username": "patoctave99@gmail.com",
          "password": "kjksxvvyxtoldilv",
        },
        body: JSON.stringify(emailObject),
      }
    );
    const mailRes = await sendMailer.json();
  } catch (e: any) {
    console.log(`mailer response error`, e.message);
  }
};


export default sendExternalMail