import nodemailer from 'nodemailer';

export const sendEmailUtility = async (
  EmailTo:string,
  EmailText :string,
  EmailSubject :string,
  EmailHTML?:string
) => {
  let transport = nodemailer.createTransport({
    // host: 'mail.teamrabbil.com',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      // user: 'info@teamrabbil.com',
      // pass: '~sR4[bhaC[Qs',
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: 'Task Manger Asif <chymdasif7@gmail.com>',
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
    html: EmailHTML || `<p>${EmailText}</p>`,
  };
  return await transport.sendMail(mailOptions);
};
