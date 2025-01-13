import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "secret";

export const generateAccessToken = (
    email: string,
    uid: string,
    expiresIn = "1h"
) => {
    return jwt.sign({ email, uid }, secret, {
        expiresIn,
    });
};

export const verifyAccessToken = (token: string) => {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    const payload = jwt.verify(token, secret) as jwt.JwtPayload;
    logger("payload", payload);
    req.user = { id_user: payload.uid, email: payload.email };
    return payload;
};
