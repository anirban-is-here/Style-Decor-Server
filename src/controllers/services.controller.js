
import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

// Get all services (public)
export const getServices = async (req, res) => {
  try {
    const services = await getDB().collection("services").find({}).toArray();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch services" });
  }
};

// Create service (Admin only)
export const createService = async (req, res) => {
  try {
    const service = req.body;
    service.createdByEmail = req.user.email || req.user.id;
    const result = await getDB().collection("services").insertOne(service);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to create service" });
  }
};

// Update service (Admin only)
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const result = await getDB()
      .collection("services")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to update service" });
  }
};

// Delete service (Admin only)
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getDB()
      .collection("services")
      .deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to delete service" });
  }
};
