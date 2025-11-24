import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { Link } from 'react-router-dom'
import { Activity } from 'lucide-react'
import { getStoredAuth } from '../api/axiosClient'
import { getConsultations } from '../api/consultationApi'
import { highlightBraceText } from '../utils/highlightText'


export default function Dashboard(){
const authUser = getStoredAuth()?.user
const [recentConsultations, setRecentConsultations] = useState([])
const [historyLoading, setHistoryLoading] = useState(true)
const [historyError, setHistoryError] = useState('')

useEffect(() => {
let ignore = false

const fetchRecent = async () => {
setHistoryLoading(true)
setHistoryError('')
try {
const data = await getConsultations()
if (!ignore) {
const sorted = [...data]
  .sort((a, b) => new Date(b.createdAt || b.updatedAt || 0) - new Date(a.createdAt || a.updatedAt || 0))
  .slice(0, 3)
setRecentConsultations(sorted)
}
} catch (error) {
if (!ignore) {
const message = error.response?.data?.message || 'Unable to load recent consultations.'
setHistoryError(message)
}
} finally {
if (!ignore) {
setHistoryLoading(false)
}
}
}

fetchRecent()

return () => {
ignore = true
}
}, [])

const getAiData = (item) => item.aiResponse ?? {
diagnosis: item.diagnosis,
treatment: item.treatment,
}


return (
<div className="min-h-[75vh] rounded-3xl bg-[#e7f5ee] border border-[#cfe9d8] p-8 shadow-[0_15px_40px_rgba(5,51,28,0.08)] space-y-6 text-[#0f2418]">
<Card className="bg-[#f4fff9] text-[#0f2418] border border-[#bbe3c9] shadow-[0_15px_35px_rgba(15,36,24,0.08)]">
	<div className="flex items-center gap-3">
		<span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00ed64] text-[#08361c] shadow-lg shadow-[#00ed64]/30">
			<Activity className="h-5 w-5" />
		</span>
		<h2 className="text-2xl font-semibold">Welcome back, {authUser?.name || 'there'}</h2>
	</div>
	<p className="text-sm text-[#4a6b53] mt-2">Pick up right where you left off.</p>
	<div className="mt-6 flex flex-wrap gap-3">
		<Link to="/consult" className="px-5 py-2.5 rounded-2xl bg-[#00ed64] text-[#062615] text-sm font-semibold shadow-md shadow-[#00ed64]/30 hover:bg-[#1bff7a] transition">
			Start consult
		</Link>
		<Link to="/history" className="px-5 py-2.5 rounded-2xl border border-[#8bcda9] text-[#0f2418] text-sm font-semibold bg-white/80 hover:bg-white transition">
			View history
		</Link>
	</div>
</Card>

<Card className="bg-white text-[#0f2418] border border-[#c1e4d1] shadow-md">
	<h3 className="font-semibold flex items-center gap-2">
		<span className="h-2.5 w-2.5 rounded-full bg-[#00ed64] animate-pulse" />
		Recent consultations
	</h3>
	<div className="mt-3 text-sm text-[#4d6355] space-y-3">
		{historyLoading && <p>Loading your latest cases...</p>}
		{historyError && <p className="text-red-600">{historyError}</p>}
		{!historyLoading && !historyError && recentConsultations.length === 0 && (
			<p>No consultations yet. Start your first consult.</p>
		)}
		{!historyLoading && !historyError && recentConsultations.length > 0 && (
			<ul className="space-y-3">
				{recentConsultations.map((item) => {
					const ai = getAiData(item)
					return (
						<li key={item._id || item.id} className="rounded-2xl border border-[#e3f1e9] p-4">
								<p className="text-sm font-semibold text-[#0f2418]">
									{highlightBraceText(ai?.diagnosis || 'Diagnosis pending', `${item._id || item.id}-diag`)}
								</p>
							<p className="mt-1 text-xs text-gray-500">{new Date(item.createdAt || item.updatedAt || Date.now()).toLocaleDateString()}</p>
								<p className="mt-2 text-sm text-gray-600 overflow-hidden text-ellipsis">
									{highlightBraceText(item.symptoms, `${item._id || item.id}-symptoms`)}
								</p>
							{ai?.treatment && (
								<p className="mt-2 text-xs text-gray-500">
										<strong>Treatment:</strong> {highlightBraceText(ai.treatment, `${item._id || item.id}-treatment`)}
								</p>
							)}
						</li>
					)
				})}
			</ul>
		)}
	</div>
</Card>
</div>
)
}