"use client";

import Link from "next/link";
import { Activity, AlertCircle, CheckCircle2, ChevronRight, Clock, RefreshCcw, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Monitor } from "@/types";

interface MonitorCardProps {
    monitor: Monitor;
    onTriggerCheck: (id: string) => void;
    onDelete: (id: string) => void;
}

export function MonitorCard({ monitor, onTriggerCheck, onDelete }: MonitorCardProps) {
    return (
        <div className="group bg-white border rounded-xl p-5 flex items-center justify-between hover:shadow-md hover:border-indigo-200 transition-all">
            <div className="flex items-center gap-4">
                <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center",
                    monitor.lastStatus === "changed" ? "bg-amber-100 text-amber-600" :
                        monitor.lastStatus === "unchanged" ? "bg-emerald-100 text-emerald-600" :
                            "bg-slate-100 text-slate-400"
                )}>
                    {monitor.lastStatus === "changed" ? <AlertCircle className="w-6 h-6" /> :
                        monitor.lastStatus === "unchanged" ? <CheckCircle2 className="w-6 h-6" /> :
                            <Activity className="w-6 h-6" />}
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {monitor.name}
                    </h3>
                    <p className="text-sm text-slate-400 font-medium truncate max-w-xs">{monitor.url}</p>
                </div>
            </div>

            <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border">
                    <Clock className="w-4 h-4 text-slate-400" />
                    Every {monitor.interval}m
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => onTriggerCheck(monitor.id)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Manual Check"
                    >
                        <RefreshCcw className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => onDelete(monitor.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Monitor"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                    <Link
                        href={`/monitors/${monitor.id}`}
                        className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
