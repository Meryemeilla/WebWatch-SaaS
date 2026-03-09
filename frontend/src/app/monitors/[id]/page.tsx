"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { monitorService } from "@/lib/api";
import { Activity, ArrowLeft, Clock, Globe, RefreshCcw, ShieldCheck, Trash2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Monitor } from "@/types";
import { HealthScoreCard } from "@/components/HealthScoreCard";
import { HistoryTable } from "@/components/HistoryTable";

export default function MonitorDetails() {
    const { id } = useParams();
    const router = useRouter();
    const [monitor, setMonitor] = useState<Monitor | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const data = await monitorService.getById(id as string);
            setMonitor(data);
        } catch (error) {
            console.error("Failed to fetch monitor details");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this monitor and its entire history?")) return;
        try {
            await monitorService.delete(id as string);
            router.push("/");
        } catch (error) {
            alert("Failed to delete monitor");
        }
    };

    const handleManualRefresh = async () => {
        try {
            await monitorService.triggerCheck(id as string);
            alert("New scan triggered via n8n! The history will update in a few seconds.");
            fetchData();
        } catch (error) {
            alert("Failed to trigger scan");
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <RefreshCcw className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
    );

    if (!monitor) return <div>Monitor not found.</div>;

    const calculateHealthScore = () => {
        if (!monitor.checks || monitor.checks.length === 0) return 0;
        const successfulChecks = monitor.checks.filter((c: any) => c.status !== "error").length;
        return Math.round((successfulChecks / monitor.checks.length) * 100);
    };

    const healthScore = calculateHealthScore();

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </Link>

            <div className="flex flex-col md:flex-row gap-6 mb-10">
                <div className="flex-1 bg-white border rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                            <Globe className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">{monitor.name}</h1>
                            <p className="text-slate-500 truncate">{monitor.url}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className={cn("w-5 h-5", monitor.lastStatus === "unchanged" ? "text-emerald-500" : "text-amber-500")} />
                                <span className="font-bold text-slate-700 capitalize">{monitor.lastStatus || "Unchecked"}</span>
                            </div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Interval</p>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-indigo-500" />
                                <span className="font-bold text-slate-700">Every {monitor.interval}m</span>
                            </div>
                        </div>
                    </div>
                </div>

                <HealthScoreCard score={healthScore} />
            </div>

            <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-indigo-600" />
                        Check History
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={handleDelete}
                            className="text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-colors text-sm font-bold flex items-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" /> Delete
                        </button>
                        <button
                            onClick={handleManualRefresh}
                            className="text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors text-sm font-bold flex items-center gap-2"
                        >
                            <RefreshCcw className="w-4 h-4" /> Trigger Scan & Refresh
                        </button>
                    </div>
                </div>

                <HistoryTable checks={monitor.checks || []} />
            </div>
        </div>
    );
}
