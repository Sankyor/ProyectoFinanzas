import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
if (!secret) {
    throw new Error("JWT_SECRET must be set");
}

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
    const payload = jwt.verify(token, secret) as jwt.JwtPayload;
    return payload;
};
