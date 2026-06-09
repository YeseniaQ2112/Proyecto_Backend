import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const cerrarSesion = () => {
    localStorage.removeItem('currentUser')
    toast.success('Sesión cerrada correctamente.')
    navigate('/login')
  }

  return (
    <nav style={s.nav}>
      <Link to="/inicio" style={s.logo}>FRENOMAX</Link>

      <button style={s.hamburger} onClick={() => setOpen(!open)} aria-label="Menú">
        <span style={s.bar} /><span style={s.bar} /><span style={s.bar} />
      </button>

      <ul style={{ ...s.links, ...(open ? s.linksOpen : {}) }}>
        <li><Link to="/inicio" style={s.link} onClick={() => setOpen(false)}>INICIO</Link></li>
        <li><Link to="/admin" style={s.link} onClick={() => setOpen(false)}>REGISTRO</Link></li>
        <li><Link to="/perfil" style={s.link} onClick={() => setOpen(false)}>MI PERFIL</Link></li>
        <li>
          <button onClick={cerrarSesion} style={s.linkBtn}>CERRAR SESIÓN</button>
        </li>
      </ul>
    </nav>
  )
}

const s = {
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '1rem 2rem', background: '#000', color: 'white',
    position: 'sticky', top: 0, zIndex: 1000,
  },
  logo: {
    fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem',
    background: 'linear-gradient(120deg, #16a34a, #3b82f6)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    letterSpacing: '2px', textDecoration: 'none',
  },
  links: { listStyle: 'none', display: 'flex', gap: '1.5rem', alignItems: 'center' },
  linksOpen: {
    flexDirection: 'column', position: 'absolute', top: '64px', right: '1rem',
    background: '#0a0a0a', padding: '1rem', borderRadius: '8px', gap: '1rem',
  },
  link: {
    textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.5px',
    background: 'linear-gradient(120deg, hsl(136,62%,46%), hsl(239,69%,51%))',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  },
  linkBtn: {
    background: 'linear-gradient(120deg, hsl(136,62%,46%), hsl(239,69%,51%))',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    border: 'none', cursor: 'pointer', fontSize: '0.85rem',
    fontWeight: 700, letterSpacing: '0.5px', padding: 0,
  },
  hamburger: {
    display: 'none', flexDirection: 'column', gap: '4px',
    background: 'none', border: 'none', padding: '4px', cursor: 'pointer',
  },
  bar: { display: 'block', width: '24px', height: '3px', background: 'white', borderRadius: '2px' },
}
