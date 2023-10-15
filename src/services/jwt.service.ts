import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY || "secret";

export const generateAccessToken = (payload: Record<string, any>) => {
  return jwt.sign(payload, secretKey, {
    expiresIn: "1d",
  });
};

export const verifyAccessToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    throw new Error(err?.toString());
  }
}