import { client } from "./index.js";
import express from "express";
import { genPassword } from "./passwordGenerator.js";
const router = express.Router();

// Change password Part

export const changepasswordRouter = router;

router.route("/changepassword").post(async (request, response) => {
    const { password, token } = request.body;
    const verification = await client.db("login").collection("usersDetails").findOne({ password: { $eq: token } })
    const { emailId } = await verification;
    console.log(emailId)
    if (verification) {
        const finalPassword = await genPassword(password)
        const updatePassword = await client.db("login").collection("usersDetails").updateOne({ emailId }, { $set: { password: finalPassword } })
        response.redirect(`https://epic-mcclintock-d7afca.netlify.app/`)
        const message = (`<p>Password changed sucessFully😊</p>`);
        emailsender(emailId, message, response);
    }
    else {
        response.send({ message: "link expired" })
    }
})
