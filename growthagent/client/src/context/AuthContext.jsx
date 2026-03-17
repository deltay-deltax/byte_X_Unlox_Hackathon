import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { login as loginApi } from '../services/api';

const AuthContext = createContext(null);

const STORAGE_KEY = 'growthagent.auth';

function safeParse(json) {
	try {
		return JSON.parse(json);
	} catch {
		return null;
	}
}

export function AuthProvider({ children }) {
	const [user, setUser] = useState(() => {
		const raw = localStorage.getItem(STORAGE_KEY);
		const parsed = raw ? safeParse(raw) : null;
		if (parsed?.userId && parsed?.handle) return parsed;
		return null;
	});

	useEffect(() => {
		if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
		else localStorage.removeItem(STORAGE_KEY);
	}, [user]);

	const value = useMemo(() => {
		return {
			user,
			isAuthed: Boolean(user?.userId && user?.handle),
			async login(handle, password) {
				const data = await loginApi({ handle, password });
				setUser({ userId: data.userId, handle: data.handle });
				return data;
			},
			logout() {
				setUser(null);
			},
		};
	}, [user]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within AuthProvider');
	return ctx;
}
