import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { getAnalyticsSummary } from '../services/api.js';

export default function Dashboard() {
	const { user } = useAuth();
	const [analytics, setAnalytics] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		let cancelled = false;
		async function load() {
			if (!user?.userId) return;
			setLoading(true);
			setError('');
			try {
				const data = await getAnalyticsSummary(user.userId);
				if (!cancelled) setAnalytics(data);
			} catch (err) {
				const message = err?.response?.data?.message || err?.message || 'Failed to load analytics';
				if (!cancelled) setError(message);
			} finally {
				if (!cancelled) setLoading(false);
			}
		}
		load();
		return () => {
			cancelled = true;
		};
	}, [user]);

	if (loading) {
		return (
			<div className="auth-shell">
				<div className="bg-blob bg-blob-a" />
				<div className="bg-grid" />
				<NavBar />
				<div className="auth-container mx-auto w-full max-w-6xl px-4 py-6 lg:px-8">
					<div className="premium-panel p-5">
						<div className="loading-skeleton h-4 w-40" />
						<div className="loading-skeleton mt-4 h-28 w-full" />
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="auth-shell">
				<div className="bg-grid" />
				<NavBar />
				<div className="auth-container mx-auto w-full max-w-6xl px-4 py-6 lg:px-8">
					<div className="premium-panel border-red-300/40 p-5 text-sm text-red-200">{error}</div>
				</div>
			</div>
		);
	}

	const total = analytics?.totalMetrics || {};

	return (
		<div className="auth-shell">
			<div className="bg-blob bg-blob-a" />
			<div className="bg-blob bg-blob-b" />
			<div className="bg-grid" />
			<NavBar />
			<div className="auth-container mx-auto w-full max-w-6xl px-4 py-6 lg:px-8">
				<h1 className="mb-1 text-2xl font-semibold text-slate-100">Analytics Dashboard</h1>
				<p className="mb-6 text-sm premium-muted">Realtime campaign signals and post-level outcomes.</p>

				{/* Overall Metrics */}
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mb-6">
					<div className="metric-tile">
						<div className="metric-label">Total Views</div>
						<div className="metric-value">{total.totalViews?.toLocaleString() || 0}</div>
					</div>
					<div className="metric-tile">
						<div className="metric-label">Total Likes</div>
						<div className="metric-value">{total.totalLikes?.toLocaleString() || 0}</div>
					</div>
					<div className="metric-tile">
						<div className="metric-label">Avg Engagement</div>
						<div className="metric-value">{total.avgEngagement || '0%'}</div>
					</div>
					<div className="metric-tile">
						<div className="metric-label">Comments</div>
						<div className="metric-value">{total.totalComments?.toLocaleString() || 0}</div>
					</div>
					<div className="metric-tile">
						<div className="metric-label">Shares</div>
						<div className="metric-value">{total.totalShares?.toLocaleString() || 0}</div>
					</div>
					<div className="metric-tile">
						<div className="metric-label">Saves</div>
						<div className="metric-value">{total.totalSaves?.toLocaleString() || 0}</div>
					</div>
				</div>

				{/* Posts Breakdown */}
				<div className="premium-panel p-5">
					<h2 className="mb-4 text-lg font-semibold text-slate-100">Posts Breakdown</h2>
					{analytics?.posts && analytics.posts.length > 0 ? (
						<div className="space-y-3">
							{analytics.posts.map((post) => (
								<div key={post._id} className="border-b border-slate-700/50 pb-3 last:border-b-0">
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<div className="text-sm font-medium text-slate-100">{post.type}</div>
											<div className="mt-1 line-clamp-2 text-xs text-slate-300">{post.caption}</div>
										</div>
										<div className="ml-4 text-right text-xs text-slate-300">
											<div>{post.metrics?.views || 0} views</div>
											<div>{post.metrics?.likes || 0} likes</div>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-sm text-slate-300">No posts yet.</div>
					)}
				</div>
			</div>
		</div>
	);
}

