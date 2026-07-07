import express from "express";
import { createBooking, handleWebhook } from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/booking", createBooking);

export default router;