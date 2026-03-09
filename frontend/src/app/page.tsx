"use client";

import { useEffect, useState } from "react";
import { monitorService } from "@/lib/api";
import Link from "next/link";
import { Activity, ChevronRight, Plus, RefreshCcw } from "lucide-react";
import { Monitor } from "@/types";
import { MonitorCard } from "@/components/MonitorCard";

export default function Dashboard() {
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMonitors = async () => {
    try {
      const data = await monitorService.getAll();
      setMonitors(data);
    } catch (error) {
      console.error("Failed to fetch monitors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonitors();
  }, []);

  const triggerManualCheck = async (id: string) => {
    try {
      await monitorService.triggerCheck(id);
      alert("Check triggered via n8n!");
    } catch (error) {
      alert("Failed to trigger check");
    }
  };

  const deleteMonitor = async (id: string) => {
    if (!confirm("Are you sure you want to delete this monitor? All check history will be lost.")) return;
    try {
      await monitorService.delete(id);
      setMonitors(monitors.filter(m => m.id !== id));
    } catch (error) {
      alert("Failed to delete monitor");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 mt-1">Monitor your website changes in real-time.</p>
        </div>
        <Link
          href="/monitors/new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-lg shadow-indigo-200 flex items-center gap-2 font-semibold transition-all"
        >
          <Plus className="w-5 h-5" />
          New Monitor
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
          <RefreshCcw className="w-8 h-8 animate-spin mb-4" />
          <p>Loading your monitors...</p>
        </div>
      ) : monitors.length === 0 ? (
        <div className="border-2 border-dashed rounded-2xl p-12 text-center bg-slate-50/50">
          <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
            <Activity className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No monitors found</h3>
          <p className="text-slate-500 mt-1 mb-6">Start by adding your first website to monitor.</p>
          <Link
            href="/monitors/new"
            className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
          >
            Create your first monitor <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {monitors.map((monitor) => (
            <MonitorCard
              key={monitor.id}
              monitor={monitor}
              onTriggerCheck={triggerManualCheck}
              onDelete={deleteMonitor}
            />
          ))}
        </div>
      )}
    </div>
  );
}
