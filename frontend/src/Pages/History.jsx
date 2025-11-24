import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { getConsultations } from '../api/consultationApi'
import { highlightBraceText } from '../utils/highlightText'


export default function History(){

const [items, setItems] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')
const [expandedItems, setExpandedItems] = useState(() => new Set())

useEffect(() => {
let ignore = false

const fetchHistory = async () => {
setLoading(true)
setError('')
try {
const data = await getConsultations()
if (!ignore) {
setItems(data)
}
} catch (err) {
if (!ignore) {
const message = err.response?.data?.message || 'Unable to load history.'
setError(message)
}
} finally {
if (!ignore) {
setLoading(false)
}
}
}

fetchHistory()

return () => {
ignore = true
}
}, [])

const toggleExpanded = (id) => {
setExpandedItems((prev) => {
const next = new Set(prev)
if (next.has(id)) {
next.delete(id)
} else {
next.add(id)
}
return next
})
}

const renderAiResponse = (item) => {
const base = item.aiResponse ?? {
diagnosis: item.diagnosis,
treatment: item.treatment,
immediate_actions: item.immediate_actions,
medication: item.medication,
}

return base
}


return (
<div>
<Card>
<h3 className="font-semibold">Consultation history</h3>
{loading && <div className="mt-3 text-sm text-gray-600">Loading consultations...</div>}
{error && <div className="mt-3 text-sm text-red-600">{error}</div>}
{!loading && !error && items.length === 0 && (
<div className="mt-3 text-sm text-gray-600">No history yet.</div>
)}
{!loading && !error && items.length > 0 && (
<ul className="mt-5 space-y-4">
{items.map(item => {
const itemId = item._id || item.id
const aiResponse = renderAiResponse(item)
const isExpanded = expandedItems.has(itemId)

return (
<li key={itemId} className="rounded-3xl border border-[#dfeee5] bg-white/90 p-5 shadow-[0_10px_25px_rgba(15,36,24,0.08)]">
<div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
<span>{new Date(item.createdAt || item.updatedAt || Date.now()).toLocaleString()}</span>
<span>{item.days} days</span>
</div>
<p className="mt-2 text-base font-semibold text-[#0f2418]">
{highlightBraceText(aiResponse?.diagnosis || 'Diagnosis pending', `${itemId}-diag`)}
</p>
<p className="mt-2 text-sm text-gray-600">
{highlightBraceText(item.symptoms, `${itemId}-symptoms`)}
</p>

<div className="mt-3 flex items-center justify-between text-xs text-gray-500">
<span>Weight: {item.weight} kg · Age: {item.age}</span>
<button
type="button"
onClick={() => toggleExpanded(itemId)}
className="text-[#0f2418] font-semibold text-xs px-3 py-1 rounded-full border border-[#cfe9d8] hover:bg-[#f4fff9]"
>
{isExpanded ? 'Hide details' : 'Show details'}
</button>
</div>

{isExpanded && (
<div className="mt-4 space-y-3 text-sm text-gray-700">
<div>
<strong>Treatment:</strong>
<p className="mt-1 text-gray-600">{aiResponse?.treatment || 'N/A'}</p>
</div>
{aiResponse?.immediate_actions && (
<div>
<strong>Immediate actions:</strong>
<p className="mt-1 text-gray-600">{aiResponse.immediate_actions}</p>
</div>
)}
{aiResponse?.medication && (
<div>
<strong>Medication:</strong>
<p className="mt-1 text-gray-600">{aiResponse.medication}</p>
</div>
)}
{item.context && (
<div>
<strong>Context:</strong>
<p className="mt-1 text-gray-600">{item.context}</p>
</div>
)}
</div>
)}
</li>
)
})}
</ul>
)}
</Card>
</div>
)
}