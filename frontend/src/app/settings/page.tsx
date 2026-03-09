"use client";

import { Settings as SettingsIcon, Shield } from "lucide-react";

export default function Settings() {
    return (
        <div className="p-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600">
                    <SettingsIcon className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
                    <p className="text-slate-500 mt-1">Manage your notification preferences and account.</p>
                </div>
            </div>

            <div className="bg-white border rounded-2xl p-6 shadow-sm mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-indigo-600" />
                    General Settings
                </h3>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Email for Alerts</label>
                        <input
                            type="email"
                            disabled
                            className="w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-slate-500 cursor-not-allowed"
                            placeholder="admin@example.com"
                        />
                        <p className="text-xs text-slate-400 mt-2 italic">This is the email where n8n will send alerts (Configuration coming soon).</p>
                    </div>
                </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-800 text-sm italic">
                Settings are currently read-only. We're working on making these editable!
            </div>
        </div>
    );
}
