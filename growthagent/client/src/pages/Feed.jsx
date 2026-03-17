import React, { useEffect, useMemo, useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import StoryBar from '../components/StoryBar.jsx';
import PostCard from '../components/PostCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { getPostsByHandle } from '../services/api.js';
import { getSocket } from '../services/socket.js';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Feed() {
	const { user } = useAuth();
	const handle = user?.handle;

	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const stories = useMemo(() => {
		const base = [
			{ handle: 'thecrumbstory' },
			{ handle: 'fitmovebangalore' },
			{ handle: 'techlabnest' },
		];
		return base;
	}, []);

	useEffect(() => {
		let cancelled = false;
		async function load() {
			if (!handle) return;
			setLoading(true);
			setError('');
			try {
				const data = await getPostsByHandle(handle);
				if (!cancelled) setPosts(Array.isArray(data) ? data : []);
			} catch (err) {
				const message = err?.response?.data?.message || err?.message || 'Failed to load posts';
				if (!cancelled) setError(message);
			} finally {
				if (!cancelled) setLoading(false);
			}
		}
		load();
		return () => {
			cancelled = true;
		};
	}, [handle]);

	useEffect(() => {
		if (!handle) return;
		const socket = getSocket();

		function onNewPost(post) {
			if (!post) return;
			if (post.handle !== handle) return;
			setPosts((prev) => [post, ...prev]);
		}

		socket.on('new_post', onNewPost);
		return () => {
			socket.off('new_post', onNewPost);
		};
	}, [handle]);

	return (
		<div className="auth-shell">
			<div className="bg-blob bg-blob-a" />
			<div className="bg-blob bg-blob-b" />
			<div className="bg-grid" />
			<NavBar />
			<div className="auth-container mx-auto w-full max-w-3xl px-4 py-6">
				<div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-center sm:text-left">
					<div>
						<h1 className="text-2xl font-semibold text-slate-100">Content Feed</h1>
						<p className="mt-1 text-sm premium-muted">Track live posts and monitor performance in real time.</p>
					</div>
					
					<Link 
						to="/onboarding" 
						className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-violet-500/20 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] border border-cyan-400/30"
					>
						<Sparkles className="h-4 w-4 animate-pulse" />
						Try AI Generator
						<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Link>
				</div>

				{/* AI Strategy Mission Banner */}
				<div className="premium-panel mb-8 border-cyan-400/50 bg-gradient-to-br from-cyan-400/10 to-transparent p-5 shadow-[0_0_30px_rgba(34,211,238,0.1)] relative overflow-hidden group">
					<div className="absolute top-0 right-0 p-1 opacity-20 group-hover:opacity-40 transition-opacity">
						<Sparkles className="h-16 w-16 text-cyan-400 -mr-4 -mt-4" />
					</div>
					<div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 relative z-10">
						<div className="rounded-xl bg-cyan-400/20 p-2.5 text-cyan-300 shadow-inner">
							<Zap className="h-5 w-5 animate-pulse" />
						</div>
						<div className="text-center sm:text-left">
							<h3 className="text-sm font-bold text-slate-100 uppercase tracking-[0.1em] mb-1.5 flex items-center justify-center sm:justify-start gap-2">
								AI Strategy Mission
								<span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping"></span>
							</h3>
							<p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
								Experience the autonomous core of GrowthAgent. Click <Link to="/onboarding" className="text-cyan-300 font-bold decoration-cyan-400/30 underline-offset-4 hover:underline">New Post</Link> and select 
								<span className="text-cyan-300 font-bold ml-1">"Generate with AI"</span> to trigger the 9-step engine that rewrites your brand strategy based on your unique history.
							</p>
						</div>
					</div>
				</div>

				<StoryBar stories={stories} />

				{loading ? (
					<div className="premium-panel mt-6 p-4">
						<div className="loading-skeleton h-4 w-36" />
						<div className="loading-skeleton mt-3 h-20 w-full" />
					</div>
				) : error ? (
					<div className="premium-panel mt-6 border-red-300/40 p-4 text-sm text-red-200">{error}</div>
				) : posts.length === 0 ? (
					<div className="premium-panel mt-6 p-4 text-sm text-slate-300">
						No posts yet. Create one from “New Post”.
					</div>
				) : (
					<div className="mt-4 space-y-4">
						{posts.map((p) => (
							<PostCard key={p._id || `${p.handle}-${p.postedAt}-${p.caption}`} post={p} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}
