import React from 'react';
import { useAgent } from '../context/AgentContext.jsx';

export default function AgentThinking() {
	const agent = useAgent();
	if (!agent?.agentThinking) return null;
	return (
		<div className="premium-panel p-3 text-xs text-slate-300">
			Agent is thinking…
		</div>
	);
}
