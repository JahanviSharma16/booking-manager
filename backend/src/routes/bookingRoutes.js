import express from "express"
import {
  createBooking,
  getAllBooking,
} from "../controllers/bookingController.js"

const router = express.Router()

router.post("/", createBooking)
router.get("/", getAllBooking)

export default router
