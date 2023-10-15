import { ethers } from "ethers";
import { Request, Response } from "express";
import { generateAccessToken } from "../services/jwt.service";

// TODO: Must change to composeMessage with OTP
const message = "SIGN_MESSAGE";

const getChallengeMessage = async (_: Request, res: Response) =>
  res.send({ message });

const login = async (req: Request, res: Response) => {
  const { signedMessage } = req.body;
  try {
    const message = "SIGN_MESSAGE"; // Add this line
    const decodedAddress = ethers.verifyMessage(message, signedMessage);
    const accessToken = generateAccessToken({ address: decodedAddress });
    res.send({ accessToken });
  } catch (error: any) { // Add type to error object
    res.status(401).json({
      message: 'Unauthorized',
      error: error?.message,
    })
  }
};

export default { getChallengeMessage, login };
