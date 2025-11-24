import axiosClient, { storeAuth, getStoredAuth, clearStoredAuth } from './axiosClient'

const AUTH_PATH = '/auth'

export const registerUser = async (payload) => {
  const response = await axiosClient.post(`${AUTH_PATH}/register`, payload)
  storeAuth(response.data)
  return response.data
}

export const loginUser = async (payload) => {
  const response = await axiosClient.post(`${AUTH_PATH}/login`, payload)
  storeAuth(response.data)
  return response.data
}

export const getCurrentUser = () => getStoredAuth()?.user || null

export const logoutUser = () => clearStoredAuth()
