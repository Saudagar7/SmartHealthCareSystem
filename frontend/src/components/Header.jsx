import React, { useEffect, useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Stethoscope } from 'lucide-react'
import { logoutUser } from '../api/authApi'
import { getStoredAuth, AUTH_EVENT } from '../api/axiosClient'

export default function Header() {
	const [auth, setAuth] = useState(() => getStoredAuth())
	const navigate = useNavigate()

	const handleAuthChange = useCallback(() => {
		setAuth(getStoredAuth())
	}, [])

	useEffect(() => {
		window.addEventListener(AUTH_EVENT, handleAuthChange)
		window.addEventListener('storage', handleAuthChange)
		return () => {
			window.removeEventListener(AUTH_EVENT, handleAuthChange)
			window.removeEventListener('storage', handleAuthChange)
		}
	}, [handleAuthChange])

	const handleLogout = () => {
		logoutUser()
		navigate('/login')
	}

	return (
		<header className="sticky top-0 z-30 border-b border-[#cfe9d8] bg-[#f4fff9] backdrop-blur-sm shadow-sm">
			<div className="container mx-auto px-6 py-4 flex items-center justify-between">
				<Link to="/" className="flex items-center gap-3 text-[#183124]">
					<div className="w-11 h-11 rounded-2xl bg-[#00ed64] text-[#062615] flex items-center justify-center shadow-md shadow-[#00ed64]/30">
						<Stethoscope className="h-5 w-5" />
					</div>
					<div>
						<div className="font-semibold text-slate-800">Smart Healthcare</div>
						<div className="text-xs text-slate-500">AI-powered triage</div>
					</div>
				</Link>

				<nav className="flex items-center gap-2 text-sm font-medium text-[#274534]">
					<Link to="/consult" className="px-3 py-1.5 rounded-full hover:bg-white hover:text-[#0f2418] transition">Consult</Link>
					<Link to="/history" className="px-3 py-1.5 rounded-full hover:bg-white hover:text-[#0f2418] transition">History</Link>
					<Link to="/dashboard" className="px-3 py-1.5 rounded-full hover:bg-white hover:text-[#0f2418] transition">Dashboard</Link>
					{auth?.token ? (
						<button
							onClick={handleLogout}
							className="px-4 py-2 rounded-full bg-[#062615] text-white shadow-md hover:bg-[#0c3b22] transition"
						>
							Logout
						</button>
					) : (
						<Link to="/login" className="px-4 py-2 rounded-full bg-[#00ed64] text-[#062615] shadow-md shadow-[#00ed64]/30 hover:bg-[#1bff7a] transition">Login</Link>
					)}
				</nav>
			</div>
		</header>
	)
}