import express from "express"
import { addUser, getCurrentUser, getUsers } from "../controllers/users.controller.js"
import { verifyJWT } from "../middlewares/verifyJWT.js"


const router = express.Router()

router.get("/", getUsers)
router.post('/', addUser)
router.get("/me", verifyJWT, getCurrentUser);

export default router