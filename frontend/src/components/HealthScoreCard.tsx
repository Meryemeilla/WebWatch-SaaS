"use client";

import { BarChart3 } from "lucide-react";

interface HealthScoreCardProps {
    score: number;
}

export function HealthScoreCard({ score }: HealthScoreCardProps) {
    return (
        <div className="w-full md:w-72 bg-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200 flex flex-col justify-between">
            <div>
                <BarChart3 className="w-8 h-8 mb-4 opacity-80" />
                <h3 className="text-xl font-bold">Health Score</h3>
                <p className="text-indigo-100 text-sm mt-1">Based on the last 50 checks.</p>
            </div>
            <div className="mt-8">
                <span className="text-5xl font-black">{score}%</span>
                <div className="w-full bg-indigo-500 h-2 rounded-full mt-4">
                    <div className="bg-white h-full rounded-full transition-all duration-500" style={{ width: `${score}%` }}></div>
                </div>
            </div>
        </div>
    );
}
