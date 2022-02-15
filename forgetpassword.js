import { client } from "./index.js";
import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken"
import { emailsender } from "./mailtransporter.js"


export const forgetPasswordRouter = router;


router.route("/forgetpassword").post(async (request, response) => {
    const { emailId } = request.body;

    const userData = await client.db("login").collection("usersDetails").findOne({ emailId });
console.log(emailId)
    if (!userData) {
        response.status(400).send({ message: "Invalid Email Id" });
        return;
    }
    if (userData) {
        const genToken = jwt.sign({ id: userData._id }, process.env.secretkey);
        console.log(genToken)
        const updatePasswordWithToken = await client.db("login").collection("usersDetails").updateOne({ emailId }, { $set: { password: genToken } });
        response.send(updatePasswordWithToken);
        const resetPasswordLink = `https://basic-login-setup.herokuapp.com/user/forgetpassword/verify/${genToken}`;
        // const resetPasswordLink = `http://localhost:9000/user/forgetpassword/verify/${genToken}`;
        const message = (
            `<p>link to reset the password</p>
        <a href=${resetPasswordLink}> Click here to reset your password </a>`
        );
        emailsender(emailId, message);
    
    }
});

//verification for replaced token exist or not 


router.route("/forgetpassword/verify/:token").get(async (request, response) => {
    const { token: genToken } = request.params;
    const verification = await client.db("login").collection("usersDetails").findOne({ password: { $eq: genToken } })
    if (verification) {
        response.redirect(`https://epic-mcclintock-d7afca.netlify.app/changepassword/${genToken}`) 
        // response.redirect(`http://localhost:3000/changepassword/${genToken}`) 
    }
    else {
        response.send({ message: "verification failed" })
        return;
    }
})


