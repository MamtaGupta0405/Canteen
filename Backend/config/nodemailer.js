
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Email send function
const sendEmail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text: text
        });

        
        return true;

    } catch (error) {
        console.log("Email sending error:", error);
        return false;
    }
};

export default sendEmail;
