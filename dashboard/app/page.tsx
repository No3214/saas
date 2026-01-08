'use client';

import { useState } from 'react';
import { SetupWizard } from '@/components/SetupWizard';

export default function GrainDashboard() {
    const [showWizard, setShowWizard] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white font-sans">
            <header className="border-b border-amber-500/20 p-6 backdrop-blur-sm bg-black/20">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                            🌾 Grain Workflow Suite
                        </h1>
                        <p className="text-gray-400 mt-2">
                            45+ Production-Ready n8n Automations
                        </p>
                    </div>
                    <button
                        onClick={() => setShowWizard(true)}
                        className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg transition-all shadow-lg shadow-amber-500/20"
                    >
                        🚀 Hızlı Kurulum
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                        <h3 className="text-gray-400 text-sm uppercase">Total Workflows</h3>
                        <p className="text-4xl font-bold text-white mt-2">48</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                        <h3 className="text-gray-400 text-sm uppercase">AI Agents</h3>
                        <p className="text-4xl font-bold text-amber-400 mt-2">12</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                        <h3 className="text-gray-400 text-sm uppercase">Active Users</h3>
                        <p className="text-4xl font-bold text-green-400 mt-2">0</p>
                    </div>
                </div>

                <section className="mt-8">
                    <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-amber-500 pl-4">
                        Kategoriler
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {['AI Automation', 'SEO & Marketing', 'Hospitality', 'Agency & RevOps', 'HR & Ops', 'General'].map((cat) => (
                            <div key={cat} className="p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-amber-500/50 transition-colors group cursor-pointer">
                                <h3 className="text-lg font-bold group-hover:text-amber-400 transition-colors">{cat}</h3>
                                <p className="text-gray-500 mt-2 text-sm">Explore workflows in {cat}...</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {showWizard && (
                <SetupWizard onClose={() => setShowWizard(false)} />
            )}
        </div>
    );
}
