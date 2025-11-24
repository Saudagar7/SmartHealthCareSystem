import React from 'react'
import { Navigate } from 'react-router-dom'
import { getStoredAuth } from '../api/axiosClient'

export default function ProtectedRoute({ children }) {
  const auth = getStoredAuth()

  if (!auth?.token) {
    return <Navigate to="/login" replace />
  }

  return children
}
