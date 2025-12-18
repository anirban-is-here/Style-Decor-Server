import express from "express";
import {
  createBooking,
  getBookings,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/bookings.controller.js";

import { verifyJWT, verifyRole } from "../middlewares/verifyJWT.js";

const router = express.Router();

// User creates booking
router.post("/", verifyJWT, verifyRole(["User"]), createBooking);

// Get bookings
router.get("/", verifyJWT, getBookings); // Admin sees all, User sees theirs

// Update booking status (Admin / Decorator)
router.patch(
  "/:id",
  verifyJWT,
  verifyRole(["Admin", "Decorator"]),
  updateBookingStatus
);

// Delete booking (User / Admin)
router.delete("/:id", verifyJWT, deleteBooking);

export default router;
