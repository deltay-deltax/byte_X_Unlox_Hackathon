import React from 'react';
import { BookOpen, Terminal, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';

export default function TesterGuide() {
	return (
		<div className="premium-panel border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm">
			<div className="flex items-center gap-3 border-b border-white/10 px-6 py-4">
				<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400 text-slate-950">
					<BookOpen className="h-5 w-5" />
				</div>
				<div>
					<h2 className="text-sm font-semibold text-slate-100">Tester's Mission Control</h2>
					<p className="text-[10px] uppercase tracking-widest text-cyan-400">Guide & Debugging</p>
				</div>
			</div>

			<div className="p-6">
				<div className="grid gap-6 md:grid-cols-2">
					<div className="space-y-4">
						<section>
							<h3 className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-100 uppercase tracking-wide">
								<Terminal className="h-3 w-3 text-cyan-400" /> 1. Setup n8n Webhooks
							</h3>
							<div className="rounded-lg bg-slate-950/50 p-3 text-xs leading-relaxed text-slate-300 border border-white/5">
								Ensure your <code className="text-cyan-300">.env</code> has active Webhook URLs. Use 
								<span className="text-violet-400 font-medium"> Production mode</span> (Activate Workflow) in n8n for smooth testing.
							</div>
						</section>

						<section>
							<h3 className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-100 uppercase tracking-wide">
								<CheckCircle className="h-3 w-3 text-emerald-400" /> 2. Generate Content
							</h3>
							<p className="text-xs text-slate-400 leading-relaxed">
								Go to the <span className="text-slate-100 font-medium">New Post</span> page and click 
								<span className="text-cyan-400 font-medium italic"> "Generate with AI"</span>. 
								Observe the 9-step chain reaction in the real-time status bar.
							</p>
						</section>
					</div>

					<div className="space-y-4">
						<section>
							<h3 className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-100 uppercase tracking-wide">
								<AlertTriangle className="h-3 w-3 text-amber-400" /> Common Issues
							</h3>
							<ul className="space-y-2 text-xs text-slate-400">
								<li className="flex items-start gap-2">
									<div className="mt-1 h-1 w-1 rounded-full bg-cyan-500" />
									<span><strong className="text-slate-200">Repetitive Posts:</strong> Check console logs for "Webhook URL not set" or "404". Activate n8n workflow.</span>
								</li>
								<li className="flex items-start gap-2">
									<div className="mt-1 h-1 w-1 rounded-full bg-cyan-500" />
									<span><strong className="text-slate-200">Socket Errors:</strong> Ensure port 5000 is open and server is running.</span>
								</li>
							</ul>
						</section>

						<div className="mt-4 rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-600/20 p-4 border border-white/10">
							<div className="flex items-center justify-between">
								<span className="text-xs font-medium text-slate-200">View detailed walkthrough</span>
								<ExternalLink className="h-4 w-4 text-slate-400" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
