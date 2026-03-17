import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BarChart3, LogOut, Newspaper, PenSquare, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

function NavLink({ to, label, icon: Icon }) {
	const location = useLocation();
	const active = location.pathname === to;
	return (
		<Link
			to={to}
			aria-label={label}
			className={
				active
					? 'premium-link premium-link-active text-sm font-medium'
					: 'premium-link text-sm font-medium'
			}
		>
			<Icon className="h-4 w-4" />
			<span className="premium-link-label">{label}</span>
		</Link>
	);
}

export default function NavBar() {
	const navigate = useNavigate();
	const { user, logout } = useAuth();

	return (
		<div className="premium-nav sticky top-0 z-30">
			<div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-2 text-base font-semibold text-slate-100">
						<span className="rounded-xl bg-gradient-to-r from-cyan-300 to-violet-500 p-2 text-slate-950 shadow-md shadow-cyan-500/30">
							<Sparkles className="h-3.5 w-3.5" />
						</span>
						GrowthAgent
					</div>
					<div className="hidden text-xs premium-muted sm:block">
						@{user?.handle}
					</div>
				</div>

				<div className="nav-links-row flex items-center gap-2 sm:gap-4">
					<NavLink to="/feed" label="Feed" icon={Newspaper} />
					<NavLink to="/dashboard" label="Analytics" icon={BarChart3} />
					<NavLink 
						to="/onboarding" 
						label="New Post" 
						icon={PenSquare} 
						className="relative rounded-lg bg-cyan-500/10 px-3 py-1.5 transition-all hover:bg-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
					/>
					<button
						className="premium-link text-sm font-medium"
						aria-label="Logout"
						onClick={() => {
							logout();
							navigate('/login');
						}}
					>
						<LogOut className="h-4 w-4" />
						<span className="premium-link-label">Logout</span>
					</button>
				</div>
			</div>
		</div>
	);
}
