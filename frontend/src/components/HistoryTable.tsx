"use client";

import { Check } from "@/types";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

interface HistoryTableProps {
    checks: Check[];
}

export function HistoryTable({ checks }: HistoryTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <tr>
                        <th className="px-6 py-4">Timestamp</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Response Time</th>
                        <th className="px-6 py-4">SHA256 Hash</th>
                    </tr>
                </thead>
                <tbody className="divide-y text-sm">
                    {checks.length > 0 ? checks.map((check) => (
                        <tr key={check.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 text-slate-600 font-medium">
                                {new Date(check.timestamp).toLocaleString()}
                            </td>
                            <td className="px-6 py-4">
                                <span className={cn(
                                    "px-2.5 py-1 rounded-full text-xs font-bold capitalize",
                                    check.status === "changed" ? "bg-amber-100 text-amber-700" :
                                        check.status === "unchanged" ? "bg-emerald-100 text-emerald-700" :
                                            "bg-indigo-100 text-indigo-700"
                                )}>
                                    {check.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-slate-600">
                                <div className="flex items-center gap-1.5">
                                    <Zap className="w-4 h-4 text-amber-500" />
                                    {check.responseTime || "--"} ms
                                </div>
                            </td>
                            <td className="px-6 py-4 text-slate-400 font-mono text-xs max-w-[150px] truncate">
                                {check.hash}
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                                No check history available yet.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
