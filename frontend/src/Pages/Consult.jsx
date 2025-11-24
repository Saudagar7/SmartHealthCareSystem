import React, { useState } from 'react'
import Card from '../components/Card'
import SymptomForm from '../components/SymptomForm'
import { createConsultation } from '../api/consultationApi'
import { highlightBraceText } from '../utils/highlightText'

export default function Consult() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const derivedAiResponse = result
    ? result.aiResponse ?? {
        diagnosis: result.diagnosis,
        treatment: result.treatment,
        immediate_actions: result.immediate_actions,
        medication: result.medication,
      }
    : null

  async function handleSubmit(data) {
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const consultation = await createConsultation(data)
      setResult(consultation)
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to create consultation right now.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* LEFT SIDE */}
      <div className="md:col-span-2">
        <Card>
          <h3 className="text-lg font-semibold">New Consult</h3>
          <p className="text-sm text-gray-600">
            Describe your symptoms below. This is a prototyping tool only.
          </p>

          <div className="mt-4">
            <SymptomForm onSubmit={handleSubmit} isSubmitting={loading} />
          </div>
        </Card>

        {/* RESULTS SECTION */}
        <div className="mt-4">
          {loading && (
            <Card>
              <div>Analyzing symptoms...</div>
            </Card>
          )}

          {error && (
            <Card className="border-red-200">
              <div className="text-red-600">{error}</div>
            </Card>
          )}

          {result && (
            <Card>
              <h4 className="font-semibold">Consultation summary</h4>

              <div className="mt-3 space-y-3 text-sm text-gray-700">
                <div>
                  <p className="font-semibold text-gray-900">Patient details</p>
                  <ul className="mt-1 space-y-1 text-gray-600">
                    <li>Age: {result.age}</li>
                    <li>Weight: {result.weight} kg</li>
                    <li>Duration: {result.days} days</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-gray-900">Symptoms</p>
                  <p className="mt-1 text-gray-600">{result.symptoms}</p>
                  {result.context && (
                    <p className="mt-1 text-gray-500">Context: {result.context}</p>
                  )}
                </div>

                {derivedAiResponse && (
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-900">AI recommendations</p>
                    <div>
                      <strong>Diagnosis:</strong>
                      <p>{highlightBraceText(derivedAiResponse.diagnosis || 'Not provided', 'diag')}</p>
                    </div>
                    <div>
                      <strong>Treatment:</strong>
                      <p>{highlightBraceText(derivedAiResponse.treatment || 'Not provided', 'treat')}</p>
                    </div>
                    {derivedAiResponse.immediate_actions && (
                      <div>
                        <strong>Immediate actions:</strong>
                        <p>{highlightBraceText(derivedAiResponse.immediate_actions, 'actions')}</p>
                      </div>
                    )}
                    {derivedAiResponse.medication && (
                      <div>
                        <strong>Medication:</strong>
                        <p>{highlightBraceText(derivedAiResponse.medication, 'meds')}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div>
        <Card>
          <h4 className="font-semibold">Quick tips</h4>
          <ul className="mt-3 text-sm text-gray-600 list-disc ml-6">
            <li>For emergency symptoms, call your local emergency number.</li>
            <li>Do not rely on this app for diagnosis.</li>
            <li>Share accurate symptom details for better results.</li>
          </ul>
        </Card>

        <Card className="mt-4">
          <h4 className="font-semibold">Model info</h4>
          <p className="text-sm text-gray-600 mt-2">
            Baseline TF-IDF model (demo) — replace with your ML service endpoint
            when ready.
          </p>
        </Card>
      </div>
    </div>
  )
}
