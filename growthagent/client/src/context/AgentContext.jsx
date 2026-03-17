import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getSocket } from '../services/socket.js';

const AgentContext = createContext(null);

export function AgentProvider({ children }) {
	const [agentThinking, setAgentThinking] = useState(false);
	const [agentStatus, setAgentStatus] = useState({ step: 0, message: '' });

	useEffect(() => {
		const socket = getSocket();
		const onStatus = (status) => {
			console.log('[SOCKET] Agent status update:', status);
			setAgentStatus(status);
		};

		socket.on('agent_status', onStatus);
		return () => {
			socket.off('agent_status', onStatus);
		};
	}, []);

	const value = useMemo(
		() => ({ 
			agentThinking, 
			setAgentThinking, 
			agentStatus, 
			setAgentStatus 
		}), 
		[agentThinking, agentStatus]
	);

	return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>;
}

export function useAgent() {
	return useContext(AgentContext);
}
