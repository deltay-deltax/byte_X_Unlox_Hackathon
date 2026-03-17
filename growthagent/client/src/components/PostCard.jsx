import React, { useMemo, useState } from 'react';
import { Eye, Heart, ImageOff, MessageCircle, Repeat2, Bookmark, Sparkles } from 'lucide-react';

function formatDate(dateString) {
	if (!dateString) return '';
	const d = new Date(dateString);
	if (Number.isNaN(d.getTime())) return '';
	return d.toLocaleString([], {
		day: '2-digit',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit',
	});
}

export default function PostCard({ post }) {
	const metrics = post?.metrics;
	const [imgError, setImgError] = useState(false);

	const safeImageUrl = useMemo(() => {
		const raw = (post?.imageUrl || '').trim();
		if (!raw) return '';
		return /^https?:\/\//i.test(raw) ? raw : '';
	}, [post?.imageUrl]);

	const showImage = Boolean(safeImageUrl) && !imgError;

	return (
		<article className="premium-panel post-card overflow-hidden transition hover:-translate-y-0.5">
			<div className="flex items-center justify-between px-4 py-3">
				<div className="text-base font-semibold text-slate-100">@{post?.handle}</div>
				<div className="text-xs text-slate-400">{formatDate(post?.postedAt)}</div>
			</div>

			{showImage ? (
				<div className="post-image-wrap bg-slate-900/60">
					<img
						src={safeImageUrl}
						alt={post.caption || 'post image'}
						className="post-image w-full max-h-[560px] object-cover"
						loading="lazy"
						onError={() => setImgError(true)}
					/>
				</div>
			) : (
				<div className="post-image-fallback px-4 py-7">
					<div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/70 px-3 py-1 text-xs text-slate-300">
						<ImageOff className="h-3.5 w-3.5" /> No media preview
					</div>
				</div>
			)}

			<div className="px-4 py-3">
				<div className="flex items-center gap-2">
					<div className="type-chip">{post?.type}</div>
					{post?.isAgentGenerated ? (
						<div className="type-chip flex items-center gap-1 border-violet-300/35 bg-violet-400/15 text-violet-200">
							<Sparkles className="h-3 w-3" />
							Agent
						</div>
					) : null}
				</div>
				{post?.caption ? <div className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-slate-100">{post.caption}</div> : null}

				{Array.isArray(post?.hashtags) && post.hashtags.length ? (
					<div className="mt-2 flex flex-wrap gap-2">
						{post.hashtags.map((h) => (
							<span key={h} className="text-xs text-cyan-200/90">
								{h}
							</span>
						))}
					</div>
				) : null}

				{metrics ? (
					<div className="post-metrics mt-4 grid grid-cols-2 gap-2 text-xs text-slate-200 sm:grid-cols-3">
						<div className="post-metric"><Eye className="h-3.5 w-3.5" /> {metrics.views ?? 0} views</div>
						<div className="post-metric"><Heart className="h-3.5 w-3.5" /> {metrics.likes ?? 0} likes</div>
						<div className="post-metric"><MessageCircle className="h-3.5 w-3.5" /> {metrics.comments ?? 0} comments</div>
						<div className="post-metric"><Bookmark className="h-3.5 w-3.5" /> {metrics.saves ?? 0} saves</div>
						<div className="post-metric"><Repeat2 className="h-3.5 w-3.5" /> {metrics.shares ?? 0} shares</div>
						{metrics.engagementRate ? <div className="post-metric">ER {metrics.engagementRate}</div> : null}
					</div>
				) : null}
			</div>
		</article>
	);
}
