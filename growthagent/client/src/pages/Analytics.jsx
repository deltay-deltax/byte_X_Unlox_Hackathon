import React from 'react';
import NavBar from '../components/NavBar.jsx';

export default function Analytics() {
	return (
		<div className="auth-shell">
			<div className="bg-blob bg-blob-a" />
			<div className="bg-grid" />
			<NavBar />
			<div className="auth-container mx-auto w-full max-w-5xl px-4 py-6 lg:px-8">
				<h1 className="mb-1 text-2xl font-semibold text-slate-100">Advanced Analytics</h1>
				<p className="mb-6 text-sm premium-muted">Deep-dive intelligence and attribution views are currently being wired.</p>

				<div className="grid gap-5 md:grid-cols-2">
					<div className="premium-panel p-5">
						<div className="metric-label">Status</div>
						<div className="mt-2 text-base font-medium text-slate-100">Integration in progress</div>
						<p className="mt-3 text-sm text-slate-300">Backend endpoints for cohort and funnel reporting are not connected in this repo state.</p>
					</div>
					<div className="premium-panel p-5">
						<div className="metric-label">What’s Coming</div>
						<ul className="mt-3 space-y-2 text-sm text-slate-200">
							<li>• Channel-level attribution</li>
							<li>• Retention trend cohorts</li>
							<li>• Creative fatigue detection</li>
						</ul>
					</div>
				</div>

				<div className="premium-panel mt-5 p-5 text-sm text-slate-300">
					Analytics placeholder (not wired to backend in this repo state).
				</div>
			</div>
		</div>
	);
}
