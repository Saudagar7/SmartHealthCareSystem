import React from 'react'

export default function Footer(){
	return (
		<footer className="mt-10 rounded-3xl border-t border-[#cfe9d8] bg-[#f4fff9] shadow-inner shadow-white/60">
			<div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-[#274534] gap-3">
				<div>© {new Date().getFullYear()} Smart Healthcare — Not a medical professional tool</div>
				<div className="flex items-center gap-2 text-xs text-[#1b5c3b]">
					<span className="h-2.5 w-2.5 rounded-full bg-[#00ed64] animate-pulse" />
					<span>Stay proactive about your health</span>
				</div>
			</div>
		</footer>
	)
}
