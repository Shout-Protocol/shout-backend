import express from "express";

import authController from "../controllers/auth.controller";

const router = express.Router();

router.get("/challenge-message", authController.getChallengeMessage);

router.post("/login", authController.login);

export default router;