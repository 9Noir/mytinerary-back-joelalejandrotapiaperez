import { OAuth2Client } from "google-auth-library";
export default async (req, res, next) => {
    const client = OAuth2Client();
    const { token_google } = req.body;
    const verifyTicket = await client.verifyIdToken({
        idToken: token_google,
        audience: process.env.GOOGLE_ID,
    });
    const payload = verifyTicket.getPayload();
    console.log(payload);
    const user = {
        name: payload.given_name,
        lastName: payload.family_name,
        email: payload.email,
        photo: payload.picture,
        crountry: payload.local,
        google: true,
    };
    req.user = user;
    return next();
};
