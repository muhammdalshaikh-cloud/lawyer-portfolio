import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import './i18n'
import App from './App.jsx'

function RootLayout() {
  return (
    <Router>
      <Routes>
        <Route path="/ar" element={<App />} />
        <Route path="/en" element={<App />} />
        <Route path="/ur" element={<App />} />
        <Route path="/" element={<Navigate to="/ar" replace />} />
      </Routes>
    </Router>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootLayout />
  </StrictMode>,
)
