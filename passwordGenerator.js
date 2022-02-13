import bcrypt from "bcrypt";

// Hashed password generator

export async function genPassword(password) {
    const noOfRounds = 5;
    const salt = await bcrypt.genSalt(noOfRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

