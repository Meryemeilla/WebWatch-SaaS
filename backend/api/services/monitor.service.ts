import axios from "axios";
import { db } from "../../db";
import { monitors } from "../../db/schema/monitor";
import { checks } from "../../db/schema/check";
import { eq, desc } from "drizzle-orm";
import { Request, Response } from "express";
import { Monitor, Check, CreateMonitorInput } from "../types";

export const createMonitor = async (req: Request<{}, {}, CreateMonitorInput>, res: Response) => {
    try {
        const { name, url, interval } = req.body;

        const [newMonitor] = await db.insert(monitors).values({
            name,
            url,
            interval: interval || 30,
        }).returning();

        await triggerCheck({ params: { id: newMonitor.id } } as any, res);
    } catch (error) {
        console.error("Create Monitor Error:", error);
        res.status(500).json({ error: "Failed to create monitor" });
    }
};

export const getMonitors = async (req: Request, res: Response) => {
    try {
        const allMonitors = await db.select().from(monitors);
        res.json(allMonitors as Monitor[]);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch monitors" });
    }
};

export const getMonitorById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const monitor = await db.query.monitors.findFirst({
            where: eq(monitors.id, req.params.id),
        });

        if (!monitor) return res.status(404).json({ error: "Monitor not found" });

        const monitorChecks = await db.select()
            .from(checks)
            .where(eq(checks.monitorId, monitor.id))
            .orderBy(desc(checks.timestamp))
            .limit(50);

        res.json({ ...monitor, checks: monitorChecks as Check[] });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch monitor details" });
    }
};

export const triggerCheck = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;

        const monitor = await db.query.monitors.findFirst({
            where: eq(monitors.id, id),
        });

        if (!monitor) return res.status(404).json({ error: "Monitor not found" });

        const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || "http://localhost:5678/webhook/check-monitor";

        const response = await axios.post(n8nWebhookUrl, {
            website: monitor.url,
            monitorId: monitor.id
        });

        res.json({
            status: "Check triggered",
            message: "n8n workflow started",
            n8nResponse: response.data
        });
    } catch (error) {
        console.error("Trigger Check Error:", error);
        res.status(500).json({ error: "Failed to communicate with n8n" });
    }
};

export const handleWebhookCallback = async (req: Request<{}, {}, { monitorId: string, status: 'unchanged' | 'changed' | 'error', currentHash: string, responseTime: number }>, res: Response) => {
    try {
        const { monitorId, status, currentHash, responseTime } = req.body;

        await db.insert(checks).values({
            monitorId,
            status,
            hash: currentHash,
            responseTime,
        });

        await db.update(monitors)
            .set({ lastStatus: status, updatedAt: new Date() })
            .where(eq(monitors.id, monitorId));

        res.json({ success: true });
    } catch (error) {
        console.error("Webhook Callback Error:", error);
        res.status(500).json({ error: "Failed to process callback" });
    }
};

export const deleteMonitor = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;

        await db.delete(checks).where(eq(checks.monitorId, id));
        await db.delete(monitors).where(eq(monitors.id, id));

        res.json({ message: "Monitor deleted successfully" });
    } catch (error) {
        console.error("Delete Monitor Error:", error);
        res.status(500).json({ error: "Failed to delete monitor" });
    }
};
