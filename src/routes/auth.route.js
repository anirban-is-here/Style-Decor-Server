import express from "express";
import { getJWT, loginUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/jwt", getJWT);
export default router;
