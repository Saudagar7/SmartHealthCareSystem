import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import Consult from './Pages/Consult'
import History from './Pages/History'
import ProtectedRoute from './components/ProtectedRoute'


export default function App() {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="grow container mx-auto px-6 py-12">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/dashboard"
						element={(
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						)}
					/>
					<Route
						path="/consult"
						element={(
							<ProtectedRoute>
								<Consult />
							</ProtectedRoute>
						)}
					/>
					<Route
						path="/history"
						element={(
							<ProtectedRoute>
								<History />
							</ProtectedRoute>
						)}
					/>
				</Routes>
			</main>
			<Footer />
		</div>
	)
}