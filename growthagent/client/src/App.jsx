import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

import Login from './pages/Login.jsx';
import Feed from './pages/Feed.jsx';
import Onboarding from './pages/Onboarding.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Analytics from './pages/Analytics.jsx';
import Landing from './pages/Landing.jsx';

function RequireAuth({ children }) {
	const { isAuthed } = useAuth();
	if (!isAuthed) return <Navigate to="/login" replace />;
	return children;
}

export default function App() {
	const { isAuthed } = useAuth();

	return (
		<Routes>
			<Route path="/" element={<Navigate to={isAuthed ? '/feed' : '/login'} replace />} />
			<Route path="/landing" element={<Landing />} />
			<Route path="/login" element={isAuthed ? <Navigate to="/feed" replace /> : <Login />} />
			<Route
				path="/feed"
				element={
					<RequireAuth>
						<Feed />
					</RequireAuth>
				}
			/>
			<Route
				path="/onboarding"
				element={
					<RequireAuth>
						<Onboarding />
					</RequireAuth>
				}
			/>
			<Route
				path="/dashboard"
				element={
					<RequireAuth>
						<Dashboard />
					</RequireAuth>
				}
			/>
			<Route
				path="/analytics"
				element={
					<RequireAuth>
						<Analytics />
					</RequireAuth>
				}
			/>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}
