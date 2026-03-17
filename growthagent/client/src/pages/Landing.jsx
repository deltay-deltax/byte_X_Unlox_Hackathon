import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	ArrowRight,
	Bot,
	ChartNoAxesCombined,
	Check,
	CirclePlay,
	Clock3,
	Layers3,
	Rocket,
	ShieldCheck,
	Sparkles,
	WandSparkles,
	Zap,
} from 'lucide-react';

const featureItems = [
	{
		icon: WandSparkles,
		title: 'AI Content Manager',
		description: 'Autonomous agents that learn your brand voice and draft posts that actually sound like you.',
	},
	{
		icon: ChartNoAxesCombined,
		title: 'Boardroom Analytics',
		description: 'Get clear, jargon-free insights into what drives your business growth, 24/7.',
	},
	{
		icon: ShieldCheck,
		title: 'Brand Safety Control',
		description: 'Enforce voice, compliance, and quality with AI checks before publishing to any channel.',
	},
];

const steps = [
	{
		icon: Layers3,
		title: 'Connect your channels',
		description: 'Plug in socials and assets once. Unified data powers every recommendation instantly.',
	},
	{
		icon: Bot,
		title: 'Activate autonomous agents',
		description: 'AI agents draft, score, and optimize campaigns while your team focuses on strategy.',
	},
	{
		icon: Rocket,
		title: 'Launch and compound growth',
		description: 'Publish faster, learn from real outcomes, and scale what converts with confidence.',
	},
];

const tiers = [
	{
		name: 'Starter',
		price: '$49',
		desc: 'For fast-moving creators and small teams.',
		features: ['Up to 3 workspaces', 'AI content briefs', 'Weekly analytics digest'],
	},
	{
		name: 'Growth',
		price: '$149',
		desc: 'For startups shipping campaigns every week.',
		featured: true,
		features: ['Unlimited campaigns', 'Autonomous scheduling', 'Realtime growth dashboard'],
	},
	{
		name: 'Scale',
		price: '$399',
		desc: 'For high-volume brands and agencies.',
		features: ['Multi-brand management', 'Advanced governance', 'Priority AI support'],
	},
];

export default function Landing() {
	const [loading, setLoading] = useState(true);
	const [activeMetric, setActiveMetric] = useState(0);

	const metrics = useMemo(
		() => [
			{ label: 'Campaign velocity', value: '+3.1x' },
			{ label: 'Engagement uplift', value: '+42%' },
			{ label: 'Execution time saved', value: '18h/wk' },
		],
		[]
	);

	useEffect(() => {
		const timer = window.setTimeout(() => setLoading(false), 1200);
		return () => window.clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (loading) return undefined;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
					}
				});
			},
			{ threshold: 0.2 }
		);

		document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
		return () => observer.disconnect();
	}, [loading]);

	useEffect(() => {
		const intervalId = window.setInterval(() => {
			setActiveMetric((prev) => (prev + 1) % metrics.length);
		}, 2400);
		return () => window.clearInterval(intervalId);
	}, [metrics.length]);

	if (loading) {
		return (
			<div className="loading-screen">
				<div className="loader-ring" />
				<p className="loading-copy">Calibrating your growth engine...</p>
			</div>
		);
	}

	return (
		<div className="premium-app">
			<div className="bg-blob bg-blob-a" />
			<div className="bg-blob bg-blob-b" />
			<div className="bg-grid" />

			<header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/50 backdrop-blur-xl">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
					<div className="flex items-center gap-2">
						<div className="rounded-xl bg-gradient-to-r from-cyan-300 to-violet-500 p-2 shadow-lg shadow-cyan-500/30">
							<Sparkles className="h-4 w-4 text-slate-950" />
						</div>
						<span className="text-sm font-semibold tracking-wide text-slate-100">GrowthAgent</span>
					</div>
					<nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
						<a href="#features" className="link-hover">Features</a>
						<a href="#workflow" className="link-hover">Workflow</a>
						<a href="#pricing" className="link-hover">Pricing</a>
					</nav>
					<div className="landing-header-actions flex items-center gap-3">
						<Link to="/login" className="btn-ghost">Sign in</Link>
						<Link to="/login" className="btn-primary">Get Started</Link>
					</div>
				</div>
			</header>

			<main>
				<section className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-16 lg:grid-cols-2 lg:px-8 lg:pt-24">
					<div className="reveal">
						<p className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-medium text-cyan-100">
							<Zap className="h-3.5 w-3.5" /> AI-powered growth orchestration platform
						</p>
						<h1 className="hero-title">Hire your first autonomous Social Media Manager.</h1>
						<p className="hero-subtitle">
							GrowthAgent handles your SMB's content strategy, generation, and analytics. Stop paying for agencies—activate your AI employee today.
						</p>
						<div className="mt-8 flex flex-wrap gap-4">
							<Link to="/login" className="btn-primary group">
								Start Free Trial
								<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Link>
							<button type="button" className="btn-secondary">
								<CirclePlay className="h-4 w-4" />
								Watch Demo
							</button>
						</div>
						<div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-300">
							<div className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-cyan-300" /> 5-minute setup</div>
							<div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-violet-300" /> Enterprise-grade trust</div>
						</div>
					</div>

					<div className="hero-card reveal">
						<div className="animate-gradient absolute inset-0 rounded-3xl opacity-70" />
						<div className="relative rounded-3xl border border-white/20 bg-slate-950/80 p-7 backdrop-blur-xl">
							<div className="mb-5 flex items-center justify-between text-sm text-slate-300">
								<span>Realtime Growth Pulse</span>
								<span className="rounded-full bg-emerald-400/20 px-3 py-1 text-emerald-300">Live</span>
							</div>
							<div className="space-y-4">
								{metrics.map((metric, index) => (
									<div
										key={metric.label}
										className={`metric-row ${activeMetric === index ? 'metric-row-active' : ''}`}
									>
										<span>{metric.label}</span>
										<strong>{metric.value}</strong>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<section id="features" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
					<div className="mb-12 reveal">
						<p className="section-tag">Product Advantage</p>
						<h2 className="section-title">Everything your growth team needs in one elegant workspace.</h2>
					</div>
					<div className="grid gap-6 md:grid-cols-3">
						{featureItems.map((item, index) => {
							const Icon = item.icon;
							return (
								<article key={item.title} className="glass-card reveal" style={{ transitionDelay: `${index * 120}ms` }}>
									<Icon className="mb-5 h-7 w-7 text-cyan-200" />
									<h3 className="mb-3 text-lg font-semibold text-slate-100">{item.title}</h3>
									<p className="text-sm text-slate-300">{item.description}</p>
								</article>
							);
						})}
					</div>
				</section>

				<section id="workflow" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
					<div className="mb-12 reveal">
						<p className="section-tag">How It Works</p>
						<h2 className="section-title">From idea to impact in three smooth steps.</h2>
					</div>
					<div className="grid gap-6 md:grid-cols-3">
						{steps.map((step, index) => {
							const Icon = step.icon;
							return (
								<div className="workflow-card reveal" key={step.title} style={{ transitionDelay: `${index * 120}ms` }}>
									<div className="mb-5 inline-flex rounded-xl bg-gradient-to-r from-cyan-400/30 to-violet-500/30 p-3">
										<Icon className="h-5 w-5 text-cyan-100" />
									</div>
									<h3 className="mb-3 text-lg font-semibold text-slate-100">{step.title}</h3>
									<p className="text-sm text-slate-300">{step.description}</p>
								</div>
							);
						})}
					</div>
				</section>

				<section id="pricing" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
					<div className="mb-12 reveal">
						<p className="section-tag">Pricing</p>
						<h2 className="section-title">Simple plans designed for modern growth teams.</h2>
					</div>
					<div className="grid gap-6 lg:grid-cols-3">
						{tiers.map((tier, index) => (
							<div
								key={tier.name}
								className={`pricing-card reveal ${tier.featured ? 'pricing-featured' : ''}`}
								style={{ transitionDelay: `${index * 100}ms` }}
							>
								<p className="text-sm font-medium text-cyan-200">{tier.name}</p>
								<p className="mt-4 text-4xl font-semibold text-white">{tier.price}<span className="text-base text-slate-400">/mo</span></p>
								<p className="mt-3 text-sm text-slate-300">{tier.desc}</p>
								<ul className="mt-6 space-y-3 text-sm text-slate-200">
									{tier.features.map((feature) => (
										<li key={feature} className="flex items-center gap-2">
											<Check className="h-4 w-4 text-emerald-300" />
											{feature}
										</li>
									))}
								</ul>
								<Link to="/login" className="mt-7 inline-flex w-full items-center justify-center rounded-xl border border-white/20 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-cyan-300/60 hover:bg-cyan-300/10">
									Choose {tier.name}
								</Link>
							</div>
						))}
					</div>
				</section>

				<section className="mx-auto max-w-7xl px-6 pb-24 pt-6 lg:px-8">
					<div className="cta-panel reveal">
						<h2 className="text-3xl font-semibold text-white">Ship your next growth cycle with confidence.</h2>
						<p className="mt-4 max-w-2xl text-slate-200">Give your team the product-grade AI platform built for speed, consistency, and measurable outcomes.</p>
						<div className="mt-8 flex flex-wrap gap-4">
							<Link to="/login" className="btn-primary">Start building now</Link>
							<Link to="/login" className="btn-ghost">Talk to sales</Link>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
