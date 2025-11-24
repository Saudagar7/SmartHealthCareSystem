import axiosClient from './axiosClient'

const CONSULTATION_PATH = '/consultations'

const extractSingle = (payload) => payload?.consultation ?? payload?.data ?? payload

const extractList = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.consultations)) return payload.consultations
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

export const createConsultation = async (payload) => {
  const response = await axiosClient.post(CONSULTATION_PATH, payload)
  const data = extractSingle(response?.data)

  if (data?.consultationId) {
    return {
      _id: data.consultationId,
      ...payload,
      aiResponse: {
        diagnosis: data.diagnosis,
        treatment: data.treatment,
        immediate_actions: data.immediate_actions,
        medication: data.medication,
      },
    }
  }

  return data
}

export const getConsultations = async () => {
  const response = await axiosClient.get(CONSULTATION_PATH)
  return extractList(response?.data)
}
