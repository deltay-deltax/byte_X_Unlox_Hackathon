import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Wand2 } from 'lucide-react';
import NavBar from '../components/NavBar.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { createPost, generateAIPost } from '../services/api.js';
import { useAgent } from '../context/AgentContext.jsx';
import AgentProcess from '../components/AgentProcess.jsx';

const POST_TYPES = ['Static', 'Reel', 'Carousel'];

function parseHashtags(input) {
	return input
		.split(',')
		.map((t) => t.trim())
		.filter(Boolean)
		.map((t) => (t.startsWith('#') ? t : `#${t}`));
}

export default function Onboarding() {
	const navigate = useNavigate();
	const { user } = useAuth();
	const { agentThinking, setAgentThinking, setAgentStatus } = useAgent();

	const [type, setType] = useState('Static');
	const [caption, setCaption] = useState('');
	const [hashtagsText, setHashtagsText] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const hashtagsPreview = useMemo(() => parseHashtags(hashtagsText), [hashtagsText]);

	async function onSubmit(e) {
		e.preventDefault();
		setError('');
		setLoading(true);
		try {
			await createPost({
				userId: user.userId,
				handle: user.handle,
				type,
				caption: caption.trim(),
				hashtags: hashtagsPreview,
				imageUrl: imageUrl.trim(),
			});
			navigate('/feed');
		} catch (err) {
			const message = err?.response?.data?.message || err?.message || 'Failed to create post';
			setError(message);
		} finally {
			setLoading(false);
		}
	}

	async function onGenerateAI() {
		setError('');
		setAgentStatus({ step: 0, message: 'Initializing agent...' });
		setAgentThinking(true);
		setLoading(true);
		try {
			// Trigger n8n agent on backend, which saves the post and redirects we handle here
			await generateAIPost({
				userId: user.userId,
				handle: user.handle,
				contentType: type,
				goal: 'Engage and grow audience'
			});
			// Give a small delay for the socket to definitely hit if and then navigate
			setTimeout(() => {
				navigate('/feed');
			}, 1000);
		} catch (err) {
			const message = err?.response?.data?.message || err?.message || 'Failed to generate post';
			setError(message);
			setLoading(false);
		} finally {
			setAgentThinking(false);
		}
	}

	return (
		<div className="auth-shell">
			<div className="bg-blob bg-blob-a" />
			<div className="bg-grid" />
			<NavBar />
			<div className="auth-container mx-auto w-full max-w-3xl px-4 py-6 lg:px-8">
				<div className="premium-panel p-5">
					<div className="mb-5 flex items-start justify-between gap-3">
						<div>
							<h2 className="text-lg font-semibold text-slate-100">New Post</h2>
							<p className="mt-1 text-sm text-slate-300">Creates a post via POST /api/posts and broadcasts newPost.</p>
						</div>
						<div className="rounded-xl bg-gradient-to-r from-cyan-400/25 to-violet-500/25 p-2 text-cyan-100">
							<Sparkles className="h-4 w-4" />
						</div>
					</div>

					<AgentProcess />

					<form className="mt-5 space-y-4" onSubmit={onSubmit}>
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div>
								<label className="premium-label">Type</label>
								<select
									className="premium-select mt-1"
									value={type}
									onChange={(e) => setType(e.target.value)}
								>
									{POST_TYPES.map((t) => (
										<option key={t} value={t}>
											{t}
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="premium-label">Image URL</label>
								<input
									className="premium-input mt-1"
									value={imageUrl}
									onChange={(e) => setImageUrl(e.target.value)}
									placeholder="https://..."
								/>
							</div>
						</div>

						<div>
							<label className="premium-label">Caption</label>
							<textarea
								className="premium-textarea mt-1"
								rows={4}
								value={caption}
								onChange={(e) => setCaption(e.target.value)}
								placeholder="Write a caption…"
							/>
						</div>

						<div>
							<label className="premium-label">Hashtags (comma separated)</label>
							<input
								className="premium-input mt-1"
								value={hashtagsText}
								onChange={(e) => setHashtagsText(e.target.value)}
								placeholder="#bakery, #reels, bangalorefood"
							/>
							{hashtagsPreview.length ? (
								<div className="mt-2 flex flex-wrap gap-2">
									{hashtagsPreview.map((h) => (
										<span key={h} className="premium-chip">
											{h}
										</span>
									))}
								</div>
							) : null}
						</div>

						{error ? <div className="text-sm text-red-200">{error}</div> : null}

						<div className="flex gap-3 mt-6">
							<button
								type="submit"
								disabled={loading || !caption.trim() || !imageUrl.trim()}
								className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-60"
							>
								{loading && !agentThinking ? 'Posting…' : 'Manual Post'}
							</button>
							<button
								type="button"
								onClick={onGenerateAI}
								disabled={loading}
								className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:scale-[1.02] hover:shadow-violet-500/30 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
							>
								<Wand2 className="h-4 w-4" />
								{agentThinking ? 'Generating...' : 'Generate with AI'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
