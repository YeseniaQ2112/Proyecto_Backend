import React, { useState, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

// ── Encriptación con Web Crypto API (SHA-256) ──────────────────────────────
async function hashPassword(password) {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// ── Evaluador de fortaleza de contraseña ──────────────────────────────────
function evaluarFortaleza(password) {
  if (!password) return { nivel: '', color: '', porcentaje: 0, texto: '' }

  let puntos = 0
  if (password.length >= 8) puntos++
  if (password.length >= 12) puntos++
  if (/[A-Z]/.test(password)) puntos++
  if (/[a-z]/.test(password)) puntos++
  if (/[0-9]/.test(password)) puntos++
  if (/[^A-Za-z0-9]/.test(password)) puntos++

  if (puntos <= 2) return { nivel: 'débil',      color: '#ff4d4d', porcentaje: 25,  texto: 'Débil — agrega mayúsculas, números y símbolos' }
  if (puntos <= 4) return { nivel: 'intermedia', color: '#ffaa00', porcentaje: 60,  texto: 'Intermedia — puedes hacerla más segura' }
  return               { nivel: 'fuerte',      color: '#00e676', porcentaje: 100, texto: 'Fuerte — ¡excelente contraseña!' }
}

export default function Register() {
  const [form, setForm]           = useState({ nombre: '', email: '', password: '' })
  const [fortaleza, setFortaleza] = useState({ nivel: '', color: '', porcentaje: 0, texto: '' })
  const [loading, setLoading]     = useState(false)
  const navigate = useNavigate()

  const change = useCallback((e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (name === 'password') setFortaleza(evaluarFortaleza(value))
  }, [])

  const submit = async (e) => {
    e.preventDefault()

    if (fortaleza.nivel === 'débil') {
      toast.error('La contraseña es demasiado débil. Mejórala antes de continuar.')
      return
    }

    setLoading(true)
    try {
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
      if (usuarios.find(u => u.email === form.email)) {
        toast.error('El correo ya está registrado')
        setLoading(false)
        return
      }

      const passwordHash = await hashPassword(form.password)

      usuarios.push({
        nombre:       form.nombre,
        email:        form.email,
        passwordHash,                    // guardada encriptada (SHA-256)
      })
      localStorage.setItem('usuarios', JSON.stringify(usuarios))
      toast.success('Cuenta creada correctamente. Inicia sesión.')
      navigate('/login')
    } catch {
      toast.error('Error al crear la cuenta')
    } finally {
      setLoading(false)
    }
  }

  const { color, porcentaje, texto, nivel } = fortaleza

  return (
    <div style={s.body}>
      <div style={s.wrapper}>
        <form onSubmit={submit} style={s.form}>
          <h1 style={s.title}>Registro</h1>

          <div style={s.inp}>
            <input name="nombre" type="text" style={s.input}
              placeholder="Nombre" required value={form.nombre} onChange={change} />
          </div>

          <div style={s.inp}>
            <input name="email" type="email" style={s.input}
              placeholder="Correo" required value={form.email} onChange={change} />
          </div>

          <div style={s.inp}>
            <input name="password" type="password" style={s.input}
              placeholder="Contraseña" required value={form.password} onChange={change} />
          </div>

          {/* ── Indicador de fortaleza ── */}
          {form.password && (
            <div style={s.strengthWrapper}>
              <div style={s.barBg}>
                <div style={{ ...s.barFill, width: `${porcentaje}%`, background: color }} />
              </div>
              <p style={{ ...s.strengthLabel, color }}>
                {nivel.charAt(0).toUpperCase() + nivel.slice(1)}{' '}
                <span style={s.strengthHint}>— {texto.split('—')[1]?.trim()}</span>
              </p>
            </div>
          )}

          <button type="submit" style={s.submit} disabled={loading}>
            {loading ? 'Creando cuenta…' : 'Registrarse'}
          </button>

          <p style={s.footer}>
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" style={s.link}>Inicia sesión</Link>
          </p>
        </form>

        <div style={s.banner}>
          <h1 style={s.welText}>¡Bienvenido!</h1>
          <p style={s.para}>Crea tu cuenta para continuar</p>
        </div>
      </div>
    </div>
  )
}

const s = {
  body: {
    width: '100vw', minHeight: '100vh', background: '#081b29',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
  wrapper: {
    position: 'relative', width: '800px', maxWidth: '95vw',
    minHeight: '60vh', display: 'grid', gridTemplateColumns: '1fr 1fr',
    border: '3px solid #00ffff', boxShadow: '0 0 50px 0 #00a6bc',
  },
  form: {
    display: 'flex', flexDirection: 'column',
    justifyContent: 'center', alignItems: 'center', padding: '2rem',
  },
  title: { fontSize: '35px', color: '#fff' },
  inp: { paddingBottom: '10px', borderBottom: '2px solid #eee', width: '100%', maxWidth: '290px' },
  input: {
    border: 'none', outline: 'none', background: 'none',
    width: '260px', marginTop: '30px', paddingRight: '10px',
    fontSize: '17px', color: '#0ef',
  },
  strengthWrapper: {
    width: '100%', maxWidth: '290px', marginTop: '14px',
  },
  barBg: {
    width: '100%', height: '6px', background: '#1e3a4a',
    borderRadius: '3px', overflow: 'hidden',
  },
  barFill: {
    height: '100%', borderRadius: '3px',
    transition: 'width 0.3s ease, background 0.3s ease',
  },
  strengthLabel: {
    fontSize: '13px', marginTop: '6px', fontWeight: '600',
  },
  strengthHint: {
    fontWeight: '400', opacity: 0.8, fontSize: '12px',
  },
  submit: {
    border: 'none', outline: 'none', width: '288px', marginTop: '22px',
    padding: '10px 0', fontSize: '20px', borderRadius: '40px', letterSpacing: '1px',
    cursor: 'pointer', background: 'linear-gradient(45deg, #0ef, #c800ff)', color: '#fff',
    opacity: 1, transition: 'opacity 0.2s',
  },
  footer: { marginTop: '20px', letterSpacing: '0.5px', fontSize: '14px', color: '#fff' },
  link: { color: '#0ef', textDecoration: 'none' },
  banner: {
    position: 'absolute', top: 0, right: 0,
    width: '450px', height: '100%',
    background: 'linear-gradient(to right, #0ef, #c800ff)',
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 60% 100%)',
    paddingRight: '70px', textAlign: 'right',
    display: 'flex', flexDirection: 'column',
    justifyContent: 'center', alignItems: 'flex-end',
  },
  welText: { fontSize: '30px', marginTop: '-50px', lineHeight: '50px', color: '#fff' },
  para: { marginTop: '10px', fontSize: '18px', lineHeight: '24px', letterSpacing: '1px', color: '#fff' },
}
