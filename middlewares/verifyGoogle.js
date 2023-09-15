import { OAuth2Client } from "google-auth-library";
export default async (req, res, next) => {
    const client = new OAuth2Client();
    const { token_id } = req.body;
    const verifyTicket = await client.verifyIdToken({
        idToken: token_id,
        audience: process.env.GOOGLE_ID,
    });
    const payload = verifyTicket.getPayload();
    console.log(payload);
    const user = {
        name: payload.given_name,
        lastName: payload.family_name,
        email: payload.email,
        photo: payload.picture,
        country: payload.locale,
        google: true,
        role: "user",
    };
    req.user = user;
    return next();
};
