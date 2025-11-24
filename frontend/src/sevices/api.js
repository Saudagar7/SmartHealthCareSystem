const api = {

async startConsult(payload){

await new Promise(res => setTimeout(res, 1200))



const text = (payload.symptom || '').toLowerCase()
const preds = []
if (!text) {
preds.push({ label: 'No symptoms provided', confidence: 0.9 })
} else {
if (text.includes('fever') || text.includes('cough')) {
preds.push({ label: 'Common Cold / Viral Infection', confidence: 0.72 })
preds.push({ label: 'Flu', confidence: 0.42 })

}
if (text.includes('headache')) {
preds.push({ label: 'Tension Headache', confidence: 0.6 })
}
if (text.includes('pain') && text.includes('urine')) {
preds.push({ label: 'Urinary Tract Infection (UTI)', confidence: 0.7 })
}
if (preds.length === 0) {
preds.push({ label: 'General checkup recommended', confidence: 0.45 })
}
}



const advice = preds[0].label.includes('Emergency') ? 'Seek emergency care.' : 'If symptoms persist or worsen, consult a doctor.'


return { predictions: preds.slice(0,4), advice }
}
}


export default api