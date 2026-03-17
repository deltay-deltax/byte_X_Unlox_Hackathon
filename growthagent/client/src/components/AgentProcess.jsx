import React from 'react';
import { useAgent } from '../context/AgentContext.jsx';
import { CheckCircle2, Circle, Loader2, AlertCircle } from 'lucide-react';

const STEPS = [
	{ id: 1, label: 'Context', description: 'Analyzing history' },
	{ id: 2, label: 'Profile', description: 'Refining strategy' },
	{ id: 3, label: 'Memory', description: 'Updating records' },
	{ id: 4, label: 'Creative', description: 'AI Generation' },
	{ id: 5, label: 'Polish', description: 'Formatting content' },
	{ id: 6, label: 'Publish', description: 'Finalizing post' },
];

export default function AgentProcess() {
	const { agentThinking, agentStatus } = useAgent();

	if (!agentThinking && agentStatus.step === 0) return null;

	return (
		<div className="premium-panel overflow-hidden p-0">
			<div className="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 px-5 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-300">
							{agentStatus.step === -1 ? (
								<AlertCircle className="h-5 w-5 text-red-400" />
							) : agentStatus.step >= 7 ? (
								<CheckCircle2 className="h-5 w-5 text-emerald-400" />
							) : (
								<Loader2 className="h-5 w-5 animate-spin" />
							)}
						</div>
						<div>
							<h3 className="text-sm font-semibold text-slate-100">
								{agentStatus.step === -1 ? 'Generation Failed' : agentStatus.step >= 7 ? 'Generation Complete' : 'AI Agent Active'}
							</h3>
							<p className="text-[10px] uppercase tracking-wider text-slate-400">
								{agentStatus.message || 'Initializing sequence...'}
							</p>
						</div>
					</div>
					<div className="text-xs font-medium text-cyan-400">
						{Math.min(100, Math.round((Math.max(0, agentStatus.step) / 6) * 100))}%
					</div>
				</div>
			</div>

			<div className="p-5">
				<div className="relative flex justify-between">
					{/* Progress Line Background */}
					<div className="absolute top-4 left-0 h-[2px] w-full bg-slate-800" />
					{/* Progress Line Active */}
					<div 
						className="absolute top-4 left-0 h-[2px] bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-500" 
						style={{ width: `${Math.min(100, ((Math.max(0, agentStatus.step) - 1) / 5) * 100)}%` }}
					/>

					{STEPS.map((step) => {
						const isCompleted = agentStatus.step > step.id || agentStatus.step >= 7;
						const isActive = agentStatus.step === step.id;
						const isError = agentStatus.step === -1;

						return (
							<div key={step.id} className="relative z-10 flex flex-col items-center">
								<div 
									className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${
										isCompleted 
											? 'border-cyan-500 bg-cyan-500 text-slate-950' 
											: isActive 
												? 'border-cyan-400 bg-slate-900 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]' 
												: isError
													? 'border-red-500/50 bg-slate-900 text-red-400'
													: 'border-slate-800 bg-slate-900 text-slate-600'
									}`}
								>
									{isCompleted ? (
										<CheckCircle2 className="h-4 w-4" />
									) : isActive ? (
										<Loader2 className="h-4 w-4 animate-spin" />
									) : (
										<Circle className="h-3 w-3 fill-current" />
									)}
								</div>
								<div className="mt-3 text-center">
									<p className={`text-[10px] font-bold ${isActive ? 'text-cyan-300' : 'text-slate-500'}`}>
										{step.label}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
