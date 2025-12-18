import express from "express";
import { getJWT, loginUser, loginWithGoogle } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/jwt", getJWT);
router.post("/google-login", loginWithGoogle);

export default router;
