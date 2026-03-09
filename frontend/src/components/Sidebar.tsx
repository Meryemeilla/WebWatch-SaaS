"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, LayoutDashboard, PlusCircle, Settings, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Add New", href: "/monitors/new", icon: PlusCircle },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col w-64 border-r bg-slate-50 min-h-screen">
            <div className="flex items-center gap-2 px-6 h-16 border-b bg-white">
                <Shield className="w-8 h-8 text-indigo-600" />
                <span className="font-bold text-xl tracking-tight">WebWatch</span>
            </div>
            <nav className="flex-1 p-4 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-indigo-50 text-indigo-700 shadow-sm"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-indigo-600" : "text-slate-400")} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t bg-white">
                <Link
                    href="/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                    <Settings className="w-5 h-5 text-slate-400" />
                    Settings
                </Link>
            </div>
        </div>
    );
}
