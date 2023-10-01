import { Router } from "express";
import nodemailer from "nodemailer";
import emailNotExists from "../middlewares/emailNotExistsMiddleware.js";
import tokenValidation from "../middlewares/tokenValidationMiddleware.js";
const emailRouter = Router();

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_PROVIDER,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Ruta para enviar un correo de recuperación de contraseña
// emailRouter.post("/forgot-password", emailNotExists(), tokenValidation, async (req, res) => {
emailRouter.post("/password-recovery", emailNotExists(), tokenValidation, async (req, res) => {
    const recoveryLink = `${process.env.APP_URL}/password-recovery?token=${req.token}`;
    try {
        // const { to, subject, text } = req.body;

        const mailOptions = {
            from: `MyTinerary <${process.env.EMAIL_USER}>`,
            to: req.body.email,
            subject: "Password recovery request",
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Password Reset</title>
            </head>
            
            <body style="font-family: Arial, sans-serif; background-color: #f0f0f0; margin: 0; padding: 0;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e0e0e0;">
                <div style="background-color: #2563eb; color: #ffffff; text-align: center; padding: 20px 0;">
                  <h1>Password Reset</h1>
                </div>
                <div style="padding: 20px;">
                  <p>Dear ${req.user.name},</p>
                  <p>You are receiving this email because you have requested to reset the password for your account on MyTinerary.</p>
                  <p>Please click the button below to reset your password securely:</p>
                  <a href="${recoveryLink}" style="text-decoration: none; background-color: #2563eb; padding: 10px 20px; border-radius: 5px; display: inline-block; color: #fff">Reset Password</a>
                  <p>If you are unable to click the button above, you can also copy and paste the following link into your web browser's address bar:</p>
                  <a href="${recoveryLink}" style="color: #2563eb; text-decoration: underline; display: inline-block;">${recoveryLink}</a>
                  <p>If you did not request a password reset, you can safely ignore this email.</p>
                  <p>Thank you for choosing MyTinerary.</p>
                  <p>Best regards,</p>
                  <p>The Support Team at MyTinerary</p>
                </div>
                <div style="text-align: center; background-color: #f0f0f0; padding: 10px;">
                  &copy; 2023 MyTinerary
                </div>
              </div>
            </body>
            
            </html>            
                `,
            //     html: `
            //             <!DOCTYPE html>
            //             <html lang="en">
            //             <head>
            //                 <meta charset="UTF-8">
            //                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
            //                 <title>Correo con Tailwind CSS</title>
            //             </head>
            //             <body>
            //                 <div style="display: flex; background-color: #E2E8F0; padding: 2rem 1rem;">
            //                     <div style="max-width: 24rem; gap: 1rem; border: 1px solid #CBD5E0; padding-bottom: 1rem; margin: 0 auto; background-color: #fff; border-radius: 0.5rem; overflow: hidden;">
            //                         <div style="background-color: #000; padding: 1rem; text-align: center; font-weight: 500; color: #fff;">FORGOT-PASSWORD REQUEST</div>
            //                         <p style="white-space: pre-wrap; padding: 1rem;">Hello,

            // We have sent you this email in response to your request to reset your password on company name.

            // To reset your password, please follow the link below:</p>
            //                         <a href="${process.env.APP_URL}/password-recovery?token=${req.token}" style="text-decoration: none; margin-left: auto; margin-rigth: auto; background-color: #000; padding: 0.5rem 1rem; color: #fff;">CHANGE PASSWORD</a>
            //                     </div>
            //                 </div>
            //             </body>
            //             </html>
            //         `,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "PASSWORD_RECOVERY_EMAIL_SENT" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "RECOVERY_EMAIL_FAILURE" });
    }
});

// Ruta para enviar un correo de verificación de correo electrónico
emailRouter.post("/verify-email", async (req, res) => {
    try {
        const { to, subject, text } = req.body;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Correo de verificación de correo electrónico enviado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al enviar el correo de verificación de correo electrónico" });
    }
});

// Ruta para enviar notificaciones
emailRouter.post("/send-notification", async (req, res) => {
    try {
        const { to, subject, text } = req.body;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Notificación enviada por correo electrónico" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al enviar la notificación por correo electrónico" });
    }
});

export default emailRouter;
