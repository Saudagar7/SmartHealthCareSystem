import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../api/authApi'
import { getStoredAuth } from '../api/axiosClient'


export default function Register(){
const [formValues, setFormValues] = useState({ name: '', email: '', password: '' })
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')
const [success, setSuccess] = useState('')
const navigate = useNavigate()

useEffect(() => {
const auth = getStoredAuth()
if (auth?.token) {
navigate('/dashboard', { replace: true })
}
}, [navigate])

const handleChange = (event) => {
const { name, value } = event.target
setFormValues((prev) => ({ ...prev, [name]: value }))
}

const handleSubmit = async (event) => {
event.preventDefault()
setError('')
setSuccess('')
setLoading(true)

try {
const authData = await registerUser(formValues)
setSuccess(`Account created for ${authData.user.name}.`)
navigate('/dashboard', { replace: true })
} catch (apiError) {
const message = apiError.response?.data?.message || 'Registration failed. Please try again.'
setError(message)
} finally {
setLoading(false)
}
}

return (
<div className="grid lg:grid-cols-2 gap-12 items-center">
<div className="rounded-3xl border border-[#cfe9d8] bg-white/90 p-8 shadow-[0_20px_45px_rgba(6,38,21,0.12)]">
<p className="text-sm uppercase tracking-[0.3em] text-[#4a6b53]">Create account</p>
<h2 className="mt-3 text-3xl font-extrabold text-[#0f2418]">Join Smart Healthcare in seconds.</h2>
<p className="mt-4 text-sm text-[#4a6b53]">Unlock the dashboard, consultation history, and shareable AI guidance tailored to every symptom you report.</p>
<div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm text-[#274534]">
	<div className="rounded-2xl border border-[#dfeee5] bg-white/80 p-4">
		<p className="text-2xl font-bold text-[#00c454]">Unlimited</p>
		<p className="mt-1 text-xs text-[#4a6b53]">Consult storage</p>
	</div>
	<div className="rounded-2xl border border-[#dfeee5] bg-white/80 p-4">
		<p className="text-2xl font-bold text-[#00c454]">Sync</p>
		<p className="mt-1 text-xs text-[#4a6b53]">All devices</p>
	</div>
</div>
	<ul className="mt-6 space-y-3 text-sm text-[#274534]">
		<li className="flex gap-3">
			<span className="h-6 w-6 rounded-full bg-[#00ed64]/20 text-[#062615] flex items-center justify-center text-xs font-semibold">✓</span>
			<span>Store highlighted AI diagnosis & action items safely.</span>
		</li>
		<li className="flex gap-3">
			<span className="h-6 w-6 rounded-full bg-[#00ed64]/20 text-[#062615] flex items-center justify-center text-xs font-semibold">✓</span>
			<span>Export consult PDFs for real-world appointments.</span>
		</li>
		<li className="flex gap-3">
			<span className="h-6 w-6 rounded-full bg-[#00ed64]/20 text-[#062615] flex items-center justify-center text-xs font-semibold">✓</span>
			<span>Receive reminders when a follow-up is recommended.</span>
		</li>
	</ul>
</div>

<div className="rounded-3xl border border-[#dfeee5] bg-white/90 p-8 shadow-[0_20px_40px_rgba(15,36,24,0.1)]">
<h2 className="text-2xl font-semibold text-[#0f2418]">Register</h2>
<p className="text-sm text-[#4a6b53]">Set up your workspace in less than a minute.</p>
<form className="mt-6 space-y-5" onSubmit={handleSubmit}>
<div>
<label className="block text-sm font-medium text-[#274534]" htmlFor="register-name">Name</label>
<input
id="register-name"
name="name"
type="text"
required
autoComplete="name"
className="mt-2 block w-full rounded-2xl border border-[#d5ecdf] bg-white px-4 py-3 text-sm text-[#0f2418] focus:border-[#00ed64] focus:ring-2 focus:ring-[#00ed64]/30"
value={formValues.name}
onChange={handleChange}
disabled={loading}
 />
</div>
<div>
<label className="block text-sm font-medium text-[#274534]" htmlFor="register-email">Email</label>
<input
id="register-email"
name="email"
type="email"
required
autoComplete="email"
className="mt-2 block w-full rounded-2xl border border-[#d5ecdf] bg-white px-4 py-3 text-sm text-[#0f2418] focus:border-[#00ed64] focus:ring-2 focus:ring-[#00ed64]/30"
value={formValues.email}
onChange={handleChange}
disabled={loading}
 />
</div>
<div>
<label className="block text-sm font-medium text-[#274534]" htmlFor="register-password">Password</label>
<input
id="register-password"
name="password"
type="password"
required
autoComplete="new-password"
className="mt-2 block w-full rounded-2xl border border-[#d5ecdf] bg-white px-4 py-3 text-sm text-[#0f2418] focus:border-[#00ed64] focus:ring-2 focus:ring-[#00ed64]/30"
value={formValues.password}
onChange={handleChange}
disabled={loading}
 />
</div>
{error && <p className="text-sm text-red-600">{error}</p>}
{success && <p className="text-sm text-green-600">{success}</p>}
<div className="flex justify-end">
<button
type="submit"
className="px-5 py-2.5 rounded-2xl bg-[#00ed64] text-[#062615] font-semibold shadow-md shadow-[#00ed64]/30 disabled:opacity-60"
disabled={loading}
>
{loading ? 'Creating...' : 'Create account'}
</button>
</div>
</form>
</div>
</div>
)
}