import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
const AUTH_STORAGE_KEY = 'authData'

const axiosClient = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
})

const AUTH_EVENT = 'auth-changed'

const notifyAuthChange = () => {
	if (typeof window !== 'undefined') {
		window.dispatchEvent(new Event(AUTH_EVENT))
	}
}

const parseStoredAuth = () => {
	try {
		const raw = localStorage.getItem(AUTH_STORAGE_KEY)
		return raw ? JSON.parse(raw) : null
	} catch (error) {
		console.warn('Failed to parse auth data from storage', error)
		return null
	}
}

export const getStoredAuth = () => parseStoredAuth()

export const storeAuth = (authData) => {
	if (!authData) return
	localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData))
	if (authData.token) {
		axiosClient.defaults.headers.common.Authorization = `Bearer ${authData.token}`
	}
	notifyAuthChange()
}

export const clearStoredAuth = () => {
	localStorage.removeItem(AUTH_STORAGE_KEY)
	delete axiosClient.defaults.headers.common.Authorization
	notifyAuthChange()
}

const existingAuth = parseStoredAuth()
if (existingAuth?.token) {
	axiosClient.defaults.headers.common.Authorization = `Bearer ${existingAuth.token}`
}

axiosClient.interceptors.request.use(
	(config) => {
		const token = parseStoredAuth()?.token
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => Promise.reject(error)
)

export { AUTH_STORAGE_KEY, AUTH_EVENT }
export default axiosClient
