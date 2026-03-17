import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
	const navigate = useNavigate();
	const { login } = useAuth();

	const [handle, setHandle] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	async function onSubmit(e) {
		e.preventDefault();
		setError('');
		setLoading(true);
		try {
			await login(handle.trim(), password);
			navigate('/feed');
		} catch (err) {
			const message = err?.response?.data?.message || err?.message || 'Login failed';
			setError(message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="auth-shell flex items-center justify-center px-4">
			<div className="bg-blob bg-blob-a" />
			<div className="bg-blob bg-blob-b" />
			<div className="bg-grid" />
			<div className="auth-container w-full max-w-md premium-panel p-7">
				<div className="mb-5 flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-semibold text-slate-100">GrowthAgent</h1>
						<p className="mt-1 text-sm text-slate-300">Log in with your demo handle.</p>
					</div>
					<div className="rounded-xl bg-gradient-to-r from-cyan-300 to-violet-500 p-2 text-slate-950 shadow-lg shadow-cyan-500/30">
						<Sparkles className="h-4 w-4" />
					</div>
				</div>

				<form className="mt-6 space-y-4" onSubmit={onSubmit}>
					<div>
						<label className="premium-label">Handle</label>
						<input
							value={handle}
							onChange={(e) => setHandle(e.target.value)}
							className="premium-input mt-1"
							placeholder="thecrumbstory"
							autoComplete="username"
						/>
					</div>

					<div>
						<label className="premium-label">Password</label>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="premium-input mt-1"
							placeholder="demo1234"
							type="password"
							autoComplete="current-password"
						/>
					</div>

					{error ? <div className="text-sm text-red-200">{error}</div> : null}

					<button
						type="submit"
						disabled={loading || !handle.trim() || !password}
						className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
					>
						{loading ? 'Logging in…' : (
							<>
								Login
								<ArrowRight className="h-4 w-4" />
							</>
						)}
					</button>
				</form>

				<div className="mt-5 text-xs text-slate-400">
					Demo users: <span className="text-slate-200">thecrumbstory</span>, <span className="text-slate-200">fitmovebangalore</span>, <span className="text-slate-200">techlabnest</span>
				</div>
				<div className="mt-4 text-xs text-slate-400">
					Prefer browsing first? <Link to="/landing" className="text-cyan-200 hover:text-cyan-100">View product overview</Link>
				</div>
			</div>
		</div>
	);
}
