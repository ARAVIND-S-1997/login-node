import { client } from "./index.js";
import { genPassword } from "./passwordGenerator.js";
import express from "express";
import { emailsender } from "./mailtransporter.js"

const router = express.Router();
export const signupRouter = router;

// Signup Part

router.route("/signup").post(async (request, response) => {
    const { userName, emailId, dob, password } = request.body;
    const userData = await client.db("login").collection("usersDetails").findOne({ emailId });
    if (userName.length === 0 || emailId.length === 0 || dob.length === 0 || password.length === 0) {
        response.status(400).send("Please fill the required coloumn")
        return;
    }
    if (userData) {
        response.send("Email id already exist")
    }
    else {
        const { userName, emailId, dob, password } = request.body;
        console.log(userName, emailId, dob, password)
        const finalPassword = await genPassword(password)
        const createUserDetails = await client.db("login").collection("usersDetails").insertOne({ userName, emailId, dob, password: finalPassword });
        response.send(createUserDetails);
        const message = (`<p>Congrats you have successfully signed in😊</p>`);
        emailsender(emailId, message);
    }
});

