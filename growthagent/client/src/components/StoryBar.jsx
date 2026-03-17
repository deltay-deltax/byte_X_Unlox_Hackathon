import React from 'react';

function initialsFromHandle(handle = '') {
	return handle
		.replace('@', '')
		.slice(0, 2)
		.toUpperCase();
}

export default function StoryBar({ stories }) {
	return (
		<div className="premium-panel p-4">
			<div className="flex gap-3 overflow-x-auto">
				{(stories || []).map((s) => (
					<div key={s.handle} className="flex min-w-[80px] flex-col items-center">
						<div className="story-avatar flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/50 bg-gradient-to-br from-cyan-400/35 to-violet-500/35 text-xs font-semibold text-slate-50 shadow-md shadow-cyan-500/25">
							{initialsFromHandle(s.handle)}
						</div>
						<div className="mt-2 max-w-[80px] truncate text-xs text-slate-200" title={`@${s.handle}`}>@{s.handle}</div>
					</div>
				))}
			</div>
		</div>
	);
}
