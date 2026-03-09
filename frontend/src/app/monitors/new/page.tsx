"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { monitorService } from "@/lib/api";
import { ArrowLeft, Globe, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewMonitor() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        url: "",
        interval: 30,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await monitorService.create(formData);
            router.push("/");
        } catch (error) {
            alert("Failed to create monitor. Ensure the backend is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </Link>

            <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b bg-slate-50/50">
                    <h1 className="text-2xl font-bold text-slate-900">Add New Website</h1>
                    <p className="text-slate-500">We'll notify you whenever the content of this page changes.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Monitor Name</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. My Portfolio"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Website URL</label>
                        <div className="relative">
                            <Globe className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                            <input
                                type="url"
                                required
                                placeholder="https://example.com"
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                value={formData.url}
                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Check Interval (minutes)</label>
                        <select
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            value={formData.interval}
                            onChange={(e) => setFormData({ ...formData, interval: Number(e.target.value) })}
                        >
                            <option value={5}>Every 5 minutes</option>
                            <option value={15}>Every 15 minutes</option>
                            <option value={30}>Every 30 minutes</option>
                            <option value={60}>Every hour</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Monitor"}
                    </button>
                </form>
            </div>
        </div>
    );
}
