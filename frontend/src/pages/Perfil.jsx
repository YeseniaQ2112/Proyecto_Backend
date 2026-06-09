import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Perfil() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null')

  if (!user) {
    return (
      <div style={s.bg}>
        <div style={s.card}>
          <h2 style={s.title}>Mi Perfil</h2>
          <p style={{ color: '#666', marginTop: '1rem' }}>No hay sesión activa.</p>
          <button style={s.btn} onClick={() => navigate('/login')}>Iniciar sesión</button>
        </div>
      </div>
    )
  }

  return (
    <div style={s.bg}>
      <div style={s.card}>
        <h2 style={s.title}>Mi Perfil</h2>
        <div style={s.iconWrap}>👤</div>
        <div style={s.info}>
          <p style={s.infoRow}><strong>👤 Usuario:</strong> {user.nombre}</p>
          <p style={s.infoRow}><strong>✉️ Correo:</strong> {user.email}</p>
        </div>
        <button style={s.btn} onClick={() => navigate('/inicio')}>Volver a Inicio</button>
      </div>
    </div>
  )
}

const s = {
  bg: {
    backgroundColor: '#dcdde1', minHeight: '100vh',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    background: 'white', width: '400px', padding: '30px',
    borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.2)',
    textAlign: 'center',
  },
  title: { fontSize: '1.5rem', fontWeight: 700, color: '#000' },
  iconWrap: { fontSize: '60px', marginTop: '10px' },
  info: { textAlign: 'left', marginTop: '20px' },
  infoRow: { marginBottom: '12px', fontSize: '1rem', color: '#000' },
  btn: {
    marginTop: '20px', padding: '10px 20px', background: '#2f3640',
    color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer',
    fontSize: '1rem',
  },
}
