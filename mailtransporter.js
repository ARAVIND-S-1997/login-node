import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export function emailsender(emailId, message,response) {


  // Nodemail 

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.mailid,
      pass: process.env.password
    }
  })
  const mailContent = {
    from: process.env.mailid,
    to: emailId,
    subject: "Forget Password",
    html: message,
  }
  transporter.sendMail(mailContent, (err, info) => {
    if (err) {
      console.log("err");
      response.send(err)
      console.log(err)

    } else {
      response.send(info)
      console.log(info)

    }
  }
  )
}



