import nodemailer from "nodemailer";
import passwordRecoveryTemplate from "./EmailTemplates/passwordRecoveryTemplate.js";

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_PROVIDER,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export default async (req, res) => {
    const recoveryLink = `${process.env.APP_URL}/password-recovery?token=${req.token}`;
    const mailOptions = {
        from: `MyTinerary <${process.env.EMAIL_USER}>`,
        to: req.body.email,
        subject: "Password recovery request",
        html: passwordRecoveryTemplate(req.user.name, recoveryLink),
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "PASSWORD_RECOVERY_EMAIL_SENT" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "RECOVERY_EMAIL_FAILURE" });
    }
};
