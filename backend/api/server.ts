import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import monitorsRouter from "./routes/monitors";
import { handleWebhookCallback } from "./services/monitor.service";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    res.json({ message: "Backend monitoring is running" });
});

// Main routes
app.use("/monitors", monitorsRouter);

// n8n Webhook Callback
app.post("/webhook/checks", handleWebhookCallback);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});