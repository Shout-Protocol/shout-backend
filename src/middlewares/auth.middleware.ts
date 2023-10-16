import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../services/jwt.service";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = verifyAccessToken(
      req.headers.authorization?.split(" ")[1] || ""
    );
    console.log(status);
    next();
  } catch (error) {
    res.status(401).send({ error: "Unauthorized" });
  }
};

export default authMiddleware;
