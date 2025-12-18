import express from "express";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../controllers/services.controller.js";

import { verifyJWT, verifyRole } from "../middlewares/verifyJWT.js";

const router = express.Router();

// Public route
router.get("/", getServices);

// Admin only
router.post("/", verifyJWT, verifyRole(["Admin"]), createService);
router.put("/:id", verifyJWT, verifyRole(["Admin"]), updateService);
router.delete("/:id", verifyJWT, verifyRole(["Admin"]), deleteService);

export default router;
