'use client';

import { useState } from 'react';
import { Check, ChevronRight, X, Server, List, Lock, Rocket } from 'lucide-react';

interface SetupWizardProps {
    onClose: () => void;
}

export function SetupWizard({ onClose }: SetupWizardProps) {
    const [step, setStep] = useState(1);
    const [config, setConfig] = useState({
        n8nUrl: '',
        apiKey: '',
        selectedWorkflows: [] as string[],
        credentials: {} as Record<string, string>
    });

    const steps = [
        { id: 1, title: 'n8n Bağlantısı', icon: <Server className="w-5 h-5" /> },
        { id: 2, title: 'Workflow Seçimi', icon: <List className="w-5 h-5" /> },
        { id: 3, title: 'Credentials', icon: <Lock className="w-5 h-5" /> },
        { id: 4, title: 'Kurulum', icon: <Rocket className="w-5 h-5" /> }
    ];

    const handleInstall = async () => {
        // Mock installation
        setTimeout(() => {
            alert('Simulation: Installation Complete!');
            onClose();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl w-full max-w-2xl p-8 border border-gray-800 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">Kurulum Sihirbazı</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Progress */}
                <div className="flex items-center justify-between mb-10 px-4">
                    {steps.map((s, i) => (
                        <div key={s.id} className="flex items-center relative">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all z-10 ${step >= s.id ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/20' : 'bg-gray-800 border-gray-700 text-gray-500'
                                }`}>
                                {s.icon}
                            </div>
                            {i < steps.length - 1 && (
                                <div className={`absolute left-10 w-full h-[2px] -z-0 ${step > s.id ? 'bg-amber-500' : 'bg-gray-800' // Fixed width line logic would be complex here, simplified for demo
                                    }`} style={{ width: '6rem', transform: 'translateX(50%)' }} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <div className="min-h-[300px]">
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">n8n URL</label>
                                <input
                                    type="url"
                                    placeholder="https://n8n.yourdomain.com"
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                                    value={config.n8nUrl}
                                    onChange={(e) => setConfig({ ...config, n8nUrl: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">API Key</label>
                                <input
                                    type="password"
                                    placeholder="n8n API anahtarınız"
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                                    value={config.apiKey}
                                    onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <p className="text-gray-400 mb-4">Select workflows to install:</p>
                            <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto pr-2">
                                {['General Suite', 'SEO Pack', 'AI Agents', 'Hr Ops'].map(pkg => (
                                    <label key={pkg} className="flex items-center p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-750 border border-gray-700">
                                        <input type="checkbox" className="w-5 h-5 rounded text-amber-500 focus:ring-amber-500 bg-gray-700 border-gray-600" />
                                        <span className="ml-3 text-white">{pkg}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {step >= 3 && (
                        <div className="text-center py-10 animate-in fade-in slide-in-from-right-4 duration-300">
                            <p className="text-gray-400">Advanced configuration is available in the Pro version.</p>
                            <p className="text-sm text-gray-500 mt-2">Click Install to proceed with default settings.</p>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
                    <button
                        onClick={() => setStep(Math.max(1, step - 1))}
                        className={`px-6 py-2 rounded-lg text-white transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'bg-gray-800 hover:bg-gray-700'}`}
                        disabled={step === 1}
                    >
                        ← Geri
                    </button>
                    <button
                        onClick={() => step < 4 ? setStep(step + 1) : handleInstall()}
                        className="px-8 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-black font-bold flex items-center gap-2 transition-all"
                    >
                        {step < 4 ? <>İleri <ChevronRight className="w-4 h-4" /></> : <>🚀 Kur</>}
                    </button>
                </div>
            </div>
        </div>
    );
}
