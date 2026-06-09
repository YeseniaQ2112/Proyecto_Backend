import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

async function hashPassword(password) {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export default function Login() {
  const [form, setForm]     = useState({ nombre: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
      const passwordHash = await hashPassword(form.password)

      // Soporta cuentas antiguas (sin hash) y nuevas (con hash SHA-256)
      const user = usuarios.find(u =>
        u.email === form.email &&
        u.nombre === form.nombre &&
        (u.passwordHash === passwordHash || u.password === form.password)
      )

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user))
        toast.success('Sesión iniciada correctamente')
        navigate('/inicio')
      } else {
        toast.error('Nombre, correo o contraseña incorrectos')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.body}>
      <div style={s.wrapper}>
        <form onSubmit={submit} style={s.form}>
          <h1 style={s.title}>Iniciar Sesión</h1>
          <div style={s.inp}>
            <input name="nombre" type="text" style={s.input} placeholder="Nombre"
              required value={form.nombre} onChange={change} />
          </div>
          <div style={s.inp}>
            <input name="email" type="email" style={s.input} placeholder="Correo"
              required value={form.email} onChange={change} />
          </div>
          <div style={s.inp}>
            <input name="password" type="password" style={s.input} placeholder="Contraseña"
              required value={form.password} onChange={change} />
          </div>
          <div style={s.captchaBox}>
            <input type="checkbox" id="notRobot" style={{ marginRight: 8 }} />
            <label htmlFor="notRobot" style={{ color: '#333', fontSize: '0.9rem' }}>No soy un robot</label>
          </div>
          <button type="submit" style={s.submit} disabled={loading}>
            {loading ? 'Verificando…' : 'Ingresar'}
          </button>
          <p style={s.footer}>
            ¿No tienes una cuenta?{' '}
            <Link to="/register" style={s.link}>Regístrate</Link>
          </p>
        </form>
        <div style={s.banner}>
          <h1 style={s.welText}>¡Bienvenido de nuevo!</h1>
          <p style={s.para}>Inicia sesión para continuar</p>
        </div>
      </div>
    </div>
  )
}

const s = {
  body: { width: '100vw', minHeight: '100vh', background: '#081b29', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  wrapper: { position: 'relative', width: '800px', maxWidth: '95vw', height: '68vh', display: 'grid', gridTemplateColumns: '1fr 1fr', border: '3px solid #00ffff', boxShadow: '0 0 50px 0 #00a6bc' },
  form: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' },
  title: { fontSize: '35px', color: '#fff' },
  inp: { paddingBottom: '10px', borderBottom: '2px solid #eee', width: '100%', maxWidth: '290px' },
  input: { border: 'none', outline: 'none', background: 'none', width: '260px', marginTop: '30px', paddingRight: '10px', fontSize: '17px', color: '#0ef' },
  captchaBox: { marginTop: '18px', background: '#f9f9f9', border: '1px solid #ccc', borderRadius: '4px', padding: '14px 20px', display: 'flex', alignItems: 'center', width: '288px' },
  submit: { border: 'none', outline: 'none', width: '288px', marginTop: '20px', padding: '10px 0', fontSize: '20px', borderRadius: '40px', letterSpacing: '1px', cursor: 'pointer', background: 'linear-gradient(45deg, #0ef, #c800ff)', color: '#fff' },
  footer: { marginTop: '20px', letterSpacing: '0.5px', fontSize: '14px', color: '#fff' },
  link: { color: '#0ef', textDecoration: 'none' },
  banner: { position: 'absolute', top: 0, right: 0, width: '450px', height: '100%', background: 'linear-gradient(to right, #0ef, #c800ff)', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 60% 100%)', paddingRight: '70px', textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' },
  welText: { fontSize: '30px', marginTop: '-50px', lineHeight: '50px', color: '#fff' },
  para: { marginTop: '10px', fontSize: '18px', lineHeight: '24px', letterSpacing: '1px', color: '#fff' },
}
