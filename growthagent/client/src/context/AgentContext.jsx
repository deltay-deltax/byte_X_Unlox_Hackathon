import React, { createContext, useContext, useMemo, useState } from 'react';

const AgentContext = createContext(null);

export function AgentProvider({ children }) {
	const [agentThinking, setAgentThinking] = useState(false);
	const value = useMemo(() => ({ agentThinking, setAgentThinking }), [agentThinking]);
	return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>;
}

export function useAgent() {
	return useContext(AgentContext);
}
