import { Router } from "express";
import { createMonitor, getMonitors, getMonitorById, triggerCheck, deleteMonitor } from "../services/monitor.service";

const router = Router();

router.post("/", createMonitor);
router.get("/", getMonitors);
router.get("/:id", getMonitorById);
router.post("/:id/check", triggerCheck);
router.delete("/:id", deleteMonitor);

export default router;