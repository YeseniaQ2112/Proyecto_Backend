import React, { useRef } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Agregar from './components/Agregar'
import Listado from './components/Listado'
import AgenteIA from './components/AgenteIA'
import Inicio from './pages/Inicio'
import Login from './pages/Login'
import Register from './pages/Register'
import Perfil from './pages/Perfil'

function AdminLayout() {
  const listadoRef = useRef(null)
  return (
    <div>
      <Navbar />
      <main style={{ padding: '1.5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', letterSpacing: '1px' }}>
              Panel de Administración
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '2px' }}>Gestión de registros del taller</p>
          </div>
          <Agregar onAgregado={() => listadoRef.current?.cargarTalleres()} />
        </div>
        <Listado ref={listadoRef} />
      </main>
      <AgenteIA />
    </div>
  )
}

function InicioLayout() {
  return (
    <div>
      <Navbar />
      <Inicio />
      <AgenteIA />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Raíz → login (flujo correcto: login primero, luego panel) */}
        <Route path="/"         element={<Navigate to="/login" replace />} />
        {/* Rutas de autenticación */}
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Rutas protegidas */}
        <Route path="/admin"    element={<AdminLayout />} />
        <Route path="/inicio"   element={<InicioLayout />} />
        <Route path="/perfil"   element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  )
}
