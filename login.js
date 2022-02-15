import { client } from "./index.js";
import express from "express";
const router = express.Router();
import bcrypt from "bcrypt"
import { emailsender } from "./mailtransporter.js"

export const loginRouter = router;

// Login Part 

router.route("/login").post(async (request, response) => {
    const { emailId, password } = request.body;
    const userData = await client.db("login").collection("usersDetails").findOne({ emailId });
    if (!userData) {
        response.status(400).send({ message: "Invalid Email Id or Password" });
        return;
    }
    const storedPassword = userData.password;
    const comparison = await bcrypt.compare(password, storedPassword);
    if (comparison) {
    const message = (`<p>Welcome you have successfully logged in😊</p>`);
    emailsender(emailId, message,response);
    // return  response.send({ message: "Login successfull" });

    }
    else {
        response.status(400).send({ message: "Invalid password" });
      
    }
});

