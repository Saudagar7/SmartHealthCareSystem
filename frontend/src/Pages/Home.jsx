import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'


export default function Home(){
	return (
		<div className="space-y-12">
			<section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
				<div className="rounded-3xl border border-[#cfe9d8] bg-linear-to-br from-[#f4fff9] via-white to-[#e7f5ee] p-10 shadow-[0_30px_70px_rgba(6,38,21,0.12)]">
					<p className="text-sm uppercase tracking-[0.3em] text-[#4a6b53]">Smart Healthcare</p>
					<h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#0f2418] leading-tight">
						AI-powered triage for faster, calmer decisions
					</h1>
					<p className="mt-5 text-lg text-[#4a6b53]">
						Describe symptoms, surface probable causes, and get practical next steps—without leaving your couch.
					</p>
					<div className="mt-8 flex flex-wrap gap-4">
						<Link to="/consult" className="px-6 py-3 rounded-2xl bg-[#00ed64] text-[#062615] font-semibold shadow-lg shadow-[#00ed64]/30 hover:bg-[#1bff7a] transition">Start a consult</Link>
						<Link to="/register" className="px-6 py-3 rounded-2xl border border-[#9edbb5] text-[#0f2418] font-semibold bg-white/80 hover:bg-white transition">Create account</Link>
					</div>
					<div className="mt-10 grid sm:grid-cols-3 gap-4 text-sm text-[#274534]">
						<div className="rounded-2xl border border-white/70 bg-white/80 p-4">
							<p className="text-2xl font-bold text-[#00c454]">2 min</p>
							<p className="mt-1 text-xs text-[#4a6b53]">Average triage time</p>
						</div>
						<div className="rounded-2xl border border-white/70 bg-white/80 p-4">
							<p className="text-2xl font-bold text-[#00c454]">24/7</p>
							<p className="mt-1 text-xs text-[#4a6b53]">Always-on guidance</p>
						</div>
						<div className="rounded-2xl border border-white/70 bg-white/80 p-4">
							<p className="text-2xl font-bold text-[#00c454]">100%</p>
							<p className="mt-1 text-xs text-[#4a6b53]">Transparent explanations</p>
						</div>
					</div>
				</div>
				<Card className="h-full bg-white border border-[#cfe9d8] shadow-[0_20px_45px_rgba(8,54,28,0.08)]">
					<h3 className="text-lg font-semibold text-[#0f2418]">How it works</h3>
					<ol className="mt-4 space-y-4 text-sm text-[#4a6b53]">
						<li className="flex gap-3">
							<span className="h-8 w-8 rounded-2xl bg-[#00ed64]/20 text-[#062615] font-semibold flex items-center justify-center">1</span>
							<div>
								<p className="font-semibold text-[#0f2418]">Describe symptoms</p>
								<p>Capture age, context, and severity in one smart form.</p>
							</div>
						</li>
						<li className="flex gap-3">
							<span className="h-8 w-8 rounded-2xl bg-[#00ed64]/20 text-[#062615] font-semibold flex items-center justify-center">2</span>
							<div>
								<p className="font-semibold text-[#0f2418]">AI triage</p>
								<p>Our reasoning engine surfaces likely diagnoses and next steps.</p>
							</div>
						</li>
						<li className="flex gap-3">
							<span className="h-8 w-8 rounded-2xl bg-[#00ed64]/20 text-[#062615] font-semibold flex items-center justify-center">3</span>
							<div>
								<p className="font-semibold text-[#0f2418]">Move with confidence</p>
								<p>Share or revisit consults from your dashboard anytime.</p>
							</div>
						</li>
					</ol>
				</Card>
			</section>

			<section className="grid md:grid-cols-3 gap-6">
				<Card className="border border-[#cfe9d8] bg-white/90">
					<h4 className="font-semibold text-[#0f2418]">Fast reassurance</h4>
					<p className="mt-2 text-sm text-[#4a6b53]">Immediate, non-diagnostic guidance tailored to your inputs.</p>
				</Card>
				<Card className="border border-[#cfe9d8] bg-white/90">
					<h4 className="font-semibold text-[#0f2418]">Transparent logic</h4>
					<p className="mt-2 text-sm text-[#4a6b53]">See why each recommendation appears, with highlighted action items.</p>
				</Card>
				<Card className="border border-[#cfe9d8] bg-white/90">
					<h4 className="font-semibold text-[#0f2418]">Always-safe messaging</h4>
					<p className="mt-2 text-sm text-[#4a6b53]">Built-in disclaimers, red-flag alerts, and handoff paths to real clinicians.</p>
				</Card>
			</section>
		</div>
	)
}