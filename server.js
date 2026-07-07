import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bookingRoutes from "./routes/booking.routes.js";
import { handleWebhook } from "./controllers/booking.controller.js";

dotenv.config();
const app = express();

// Stripe webhook needs the RAW body — must come BEFORE express.json()
app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  handleWebhook
);

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use("/api", bookingRoutes);

app.get("/health", (_, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on :${PORT}`));