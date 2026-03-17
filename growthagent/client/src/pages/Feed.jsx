import React, { useEffect, useMemo, useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import StoryBar from '../components/StoryBar.jsx';
import PostCard from '../components/PostCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { getPostsByHandle } from '../services/api.js';
import { getSocket } from '../services/socket.js';

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
				<div className="mb-5">
					<h1 className="text-2xl font-semibold text-slate-100">Content Feed</h1>
					<p className="mt-1 text-sm premium-muted">Track live posts and monitor performance in real time.</p>
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
