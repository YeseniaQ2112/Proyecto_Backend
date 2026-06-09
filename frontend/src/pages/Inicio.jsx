import React, { useState } from 'react'
import toast from 'react-hot-toast'

const servicios = [
  { titulo: 'Cambio de pastillas', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', alt: 'Cambio de pastillas' },
  { titulo: 'Cambio de amortiguadores', img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&q=80', alt: 'Amortiguadores' },
  { titulo: 'Rectificado de juntas', img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&q=80', alt: 'Juntas' },
  { titulo: 'Adaptado de bujes', img: 'https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=400&q=80', alt: 'Bujes' },
  { titulo: 'Cambio de balatas', img: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80', alt: 'Balatas' },
  { titulo: 'Adaptación de piezas', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80', alt: 'Piezas' },
{ titulo: 'Alineación y balanceo', img: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=400&q=80', alt: 'Alineación' },
{ titulo: 'Revisión de frenos', img: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=400&q=80', alt: 'Frenos' },
]

export default function Inicio() {
  const [form, setForm] = useState({ nombre: '', correo: '', mensaje: '' })

  const enviar = (e) => {
    e.preventDefault()
    toast.success('Mensaje enviado correctamente')
    setForm({ nombre: '', correo: '', mensaje: '' })
  }

  return (
    <div>
      {/* HERO */}
      <header style={s.hero}>
        <h1 style={s.heroH1}>SERVICIOS DE FRENOS Y MUÑONES</h1>
        <p style={s.heroP}>Descubre nuestros servicios y más</p>
      </header>

      {/* SERVICIOS */}
      <section id="servicios" style={s.cardsSection}>
        <h2 style={s.sectionTitle}>Nuestros servicios</h2>
        <div style={s.grid}>
          {servicios.map((sv) => (
            <div key={sv.titulo} style={s.card}>
              <h3 style={s.cardTitle}>{sv.titulo}</h3>
              <img src={sv.img} alt={sv.alt} style={s.cardImg} />
            </div>
          ))}
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" style={s.contactSection}>
        <h2 style={s.contactTitle}>Contacto</h2>
        <form onSubmit={enviar} style={s.contactForm}>
          <input
            style={s.contactInput}
            type="text" placeholder="Nombre" required
            value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          <input
            style={s.contactInput}
            type="email" placeholder="Correo Electrónico" required
            value={form.correo} onChange={(e) => setForm({ ...form, correo: e.target.value })}
          />
          <textarea
            style={{ ...s.contactInput, resize: 'vertical', minHeight: '100px' }}
            placeholder="Mensaje" required
            value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
          />
          <button type="submit" style={s.contactBtn}>Enviar</button>
        </form>
      </section>

      {/* ACERCA */}
      <section id="acerca" style={s.aboutSection}>
        <h2 style={s.sectionTitle}>Acerca de nosotros</h2>
        <p style={s.aboutP}>Somos un negocio que se enfoca en el mantenimiento del tren delantero de todo tipo de autos.</p>
        <p style={s.aboutP}><strong>Nro de Referencia:</strong> 7409544</p>
        <p style={s.aboutP}><strong>Dirección:</strong> Av. Landaeta Nº1317</p>
        <div style={s.mapWrap}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.33927587866!2d-68.13809382567374!3d-16.50896074095454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f207c6ce14e89%3A0xb976666a393edf5d!2sPlaza%20El%20C%C3%B3ndor!5e0!3m2!1ses!2sbo!4v1748859967393!5m2!1ses!2sbo"
            width="400" height="300" style={{ border: 0, borderRadius: '10px' }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            title="Mapa"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer style={s.footer}>
        <p>© 2025 - FRENOMAX</p>
      </footer>
    </div>
  )
}

const s = {
  hero: {
    background: 'linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.45)), url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=80) center/cover no-repeat',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    height: '90vh', color: 'black', textAlign: 'center', padding: '2rem',
  },
  heroH1: {
    fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', marginBottom: '1rem',
    background: 'rgba(255,255,255,0.3)', padding: '1rem', borderRadius: '10px',
    backdropFilter: 'blur(4px)', color: 'black',
  },
  heroP: {
    fontSize: '1.5rem', background: 'rgba(255,255,255,0.3)',
    padding: '1rem', borderRadius: '10px', backdropFilter: 'blur(4px)', color: 'black',
  },
  cardsSection: { padding: '3rem', background: '#f9f9f9' },
  sectionTitle: { textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem', color: '#000' },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem', maxWidth: '1100px', margin: '0 auto',
  },
  card: {
    background: '#868181', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden', textAlign: 'center', transition: 'transform 0.3s', color: '#000',
  },
  cardTitle: { margin: '1rem 0', fontSize: '1.3rem', fontWeight: 700, color: '#000' },
  cardImg: { width: '100%', height: '200px', objectFit: 'cover' },
  contactSection: { padding: '3rem', background: '#000', color: 'white', textAlign: 'center' },
  contactTitle: { marginBottom: '1.5rem', fontSize: '2.5rem', color: 'white' },
  contactForm: {
    display: 'flex', flexDirection: 'column', gap: '1rem',
    maxWidth: '500px', margin: '0 auto',
  },
  contactInput: {
    padding: '1rem', border: '1px solid #ddd', borderRadius: '10px',
    outline: 'none', fontSize: '1rem', color: '#000',
  },
  contactBtn: {
    background: '#0a071f', border: 'none', color: 'white', padding: '1rem',
    fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', borderRadius: '50px',
  },
  aboutSection: { padding: '3rem', textAlign: 'center', background: 'white', color: 'black' },
  aboutP: { fontSize: '1.2rem', marginBottom: '0.5rem' },
  mapWrap: { marginTop: '1rem', display: 'flex', justifyContent: 'center' },
  footer: { padding: '1.5rem', background: '#000', color: 'white', textAlign: 'center' },
}
