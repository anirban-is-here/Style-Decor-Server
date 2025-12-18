import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

// 1️⃣ Create a booking (User only)
export const createBooking = async (req, res) => {
  try {
    const booking = req.body;
    booking.userEmail = req.user.email; // assign user from JWT
    booking.status = "Pending";
    booking.paymentStatus = "Unpaid";

    const result = await getDB().collection("bookings").insertOne(booking);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to create booking" });
  }
};

// 2️⃣ Get bookings
export const getBookings = async (req, res) => {
  try {
    const { role, email } = req.user;

    let query = {};
    if (role === "User") {
      query.userEmail = email; // user sees only their bookings
    }

    const bookings = await getDB().collection("bookings").find(query).toArray();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// 3️⃣ Update booking status (Admin / Decorator)
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await getDB()
      .collection("bookings")
      .updateOne({ _id: new ObjectId(id) }, { $set: { status } });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to update booking" });
  }
};

// 4️⃣ Delete/cancel booking (User or Admin)
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, email } = req.user;

    const booking = await getDB()
      .collection("bookings")
      .findOne({ _id: new ObjectId(id) });

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // User can delete only their own bookings
    if (role === "User" && booking.userEmail !== email) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const result = await getDB()
      .collection("bookings")
      .deleteOne({ _id: new ObjectId(id) });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to delete booking" });
  }
};
