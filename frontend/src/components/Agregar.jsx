import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { agregarTaller } from '../api/tallerApi'

const HORAS = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00']
const DIAS = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']

const EMPTY = { nombre_prop:'', nro_celular:'', tipo_auto:'', tipo_trabajo:'', hora_atencion:'', dia:'' }

const regexLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,200}$/
const regexNumeros = /^[0-9]{5,20}$/

function validate(form) {
  const errs = {}
  if (!form.nombre_prop) errs.nombre_prop = 'Nombre requerido'
  else if (!regexLetras.test(form.nombre_prop)) errs.nombre_prop = 'Solo letras y espacios (2–200 caracteres)'
  if (!form.nro_celular) errs.nro_celular = 'Número requerido'
  else if (!regexNumeros.test(form.nro_celular)) errs.nro_celular = 'Solo números (5–20 dígitos)'
  if (!form.tipo_auto) errs.tipo_auto = 'Tipo de auto requerido'
  else if (!regexLetras.test(form.tipo_auto)) errs.tipo_auto = 'Solo letras y espacios (2–200 caracteres)'
  if (!form.tipo_trabajo) errs.tipo_trabajo = 'Tipo de trabajo requerido'
  else if (!regexLetras.test(form.tipo_trabajo)) errs.tipo_trabajo = 'Solo letras y espacios (2–200 caracteres)'
  if (!form.hora_atencion) errs.hora_atencion = 'Seleccione una hora'
  if (!form.dia) errs.dia = 'Seleccione un día'
  return errs
}

export default function Agregar({ onAgregado }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const submit = async () => {
    const errs = validate(form)
    if (Object.keys(errs).length) {
      setErrors(errs)
      toast.error('Completa todos los campos correctamente')
      return
    }
    setLoading(true)
    try {
      await agregarTaller(form)
      toast.success('Registro agregado correctamente')
      setForm(EMPTY)
      setOpen(false)
      onAgregado?.()
    } catch {
      toast.error('Error al agregar el registro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button style={styles.btnAdd} onClick={() => setOpen(true)}>
        + Añadir registro
      </button>

      {open && (
        <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Nuevo registro</h2>
              <button style={styles.closeBtn} onClick={() => setOpen(false)}>✕</button>
            </div>

            <div style={styles.form}>
              {[
                { name: 'nombre_prop', label: 'Nombre del propietario', type: 'text' },
                { name: 'nro_celular', label: 'Nro. Celular', type: 'text' },
                { name: 'tipo_auto', label: 'Tipo de Auto', type: 'text' },
                { name: 'tipo_trabajo', label: 'Tipo de Trabajo', type: 'text' },
              ].map(({ name, label }) => (
                <div key={name} style={styles.field}>
                  <label style={styles.label}>{label}</label>
                  <input
                    name={name}
                    value={form[name]}
                    onChange={change}
                    style={{ ...styles.input, ...(errors[name] ? styles.inputError : {}) }}
                  />
                  {errors[name] && <span style={styles.err}>{errors[name]}</span>}
                </div>
              ))}

              <div style={styles.field}>
                <label style={styles.label}>Hora de Atención</label>
                <select name="hora_atencion" value={form.hora_atencion} onChange={change}
                  style={{ ...styles.input, ...(errors.hora_atencion ? styles.inputError : {}) }}>
                  <option value="">Selecciona hora</option>
                  {HORAS.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
                {errors.hora_atencion && <span style={styles.err}>{errors.hora_atencion}</span>}
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Día</label>
                <select name="dia" value={form.dia} onChange={change}
                  style={{ ...styles.input, ...(errors.dia ? styles.inputError : {}) }}>
                  <option value="">Selecciona día</option>
                  {DIAS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.dia && <span style={styles.err}>{errors.dia}</span>}
              </div>
            </div>

            <div style={styles.footer}>
              <button style={styles.btnCancel} onClick={() => setOpen(false)}>Cancelar</button>
              <button style={styles.btnConfirm} onClick={submit} disabled={loading}>
                {loading ? 'Guardando…' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const styles = {
  btnAdd: {
    background: '#006900',
    color: 'white',
    border: '3px solid #0a0a0a',
    padding: '10px 20px',
    fontWeight: 700,
    fontSize: '0.9rem',
    borderRadius: '6px',
    letterSpacing: '0.5px',
    transition: 'background 0.2s',
  },
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000,
  },
  modal: {
    background: 'white', borderRadius: '12px', width: '100%', maxWidth: '480px',
    maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  modalHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '1.25rem 1.5rem', borderBottom: '1px solid #e2e8f0',
  },
  modalTitle: { fontSize: '1.2rem', fontWeight: 700, color: '#0a0a0a' },
  closeBtn: {
    background: 'none', border: 'none', fontSize: '1.2rem',
    color: '#64748b', cursor: 'pointer', padding: '4px',
  },
  form: { padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '4px' },
  label: { fontSize: '0.85rem', fontWeight: 600, color: '#475569' },
  input: {
    padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: '6px',
    fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s',
    width: '100%',
  },
  inputError: { borderColor: '#dc2626' },
  err: { fontSize: '0.78rem', color: '#dc2626' },
  footer: {
    display: 'flex', justifyContent: 'flex-end', gap: '0.75rem',
    padding: '1rem 1.5rem', borderTop: '1px solid #e2e8f0',
  },
  btnCancel: {
    padding: '8px 18px', borderRadius: '6px', border: '1.5px solid #e2e8f0',
    background: 'white', color: '#475569', fontWeight: 600, fontSize: '0.9rem',
  },
  btnConfirm: {
    padding: '8px 18px', borderRadius: '6px', border: 'none',
    background: '#16a34a', color: 'white', fontWeight: 700, fontSize: '0.9rem',
  },
}
