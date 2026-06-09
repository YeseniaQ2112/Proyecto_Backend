import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import toast from 'react-hot-toast'
import { getTalleres, actualizarTaller, eliminarTaller } from '../api/tallerApi'

const HORAS = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00']
const DIAS = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']

const Listado = forwardRef(function Listado(_, ref) {
  const [talleres, setTalleres] = useState([])
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(false)

  const cargar = async () => {
    try {
      const data = await getTalleres()
      setTalleres(data)
    } catch {
      toast.error('Error al cargar los registros')
    }
  }

  useEffect(() => { cargar() }, [])
  useImperativeHandle(ref, () => ({ cargarTalleres: cargar }))

  const abrirEditar = (t) => {
    setEditando(t.id)
    setForm({ ...t })
  }

  const guardar = async () => {
    setLoading(true)
    try {
      await actualizarTaller(form)
      toast.success('Registro actualizado')
      setEditando(null)
      await cargar()
    } catch {
      toast.error('Error al actualizar')
    } finally {
      setLoading(false)
    }
  }

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar este registro?')) return
    try {
      await eliminarTaller(id)
      toast.success('Registro eliminado')
      await cargar()
    } catch {
      toast.error('Error al eliminar')
    }
  }

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <div style={styles.wrapper}>
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              {['Propietario','Celular','Tipo de Auto','Trabajo','Hora','Día'].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {talleres.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                  No hay registros. Agrega el primero.
                </td>
              </tr>
            )}
            {talleres.map((t, i) => (
              <tr key={t.id} style={{ background: i % 2 === 0 ? 'white' : '#f8fafc' }}>
                <td style={styles.td}>{t.nombre_prop}</td>
                <td style={styles.td}>{t.nro_celular}</td>
                <td style={styles.td}>{t.tipo_auto}</td>
                <td style={styles.td}>{t.tipo_trabajo}</td>
                <td style={styles.td}>{t.hora_atencion}</td>
                <td style={styles.td}>{t.dia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editando !== null && (
        <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && setEditando(null)}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Editar registro</h2>
              <button style={styles.closeBtn} onClick={() => setEditando(null)}>✕</button>
            </div>
            <div style={styles.formGrid}>
              {[
                { name: 'nombre_prop', label: 'Propietario' },
                { name: 'nro_celular', label: 'Celular' },
                { name: 'tipo_auto', label: 'Tipo de Auto' },
                { name: 'tipo_trabajo', label: 'Tipo de Trabajo' },
              ].map(({ name, label }) => (
                <div key={name} style={styles.field}>
                  <label style={styles.label}>{label}</label>
                  <input name={name} value={form[name] || ''} onChange={change} style={styles.input} />
                </div>
              ))}
              <div style={styles.field}>
                <label style={styles.label}>Hora Atención</label>
                <select name="hora_atencion" value={form.hora_atencion || ''} onChange={change} style={styles.input}>
                  {HORAS.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Día</label>
                <select name="dia" value={form.dia || ''} onChange={change} style={styles.input}>
                  {DIAS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div style={styles.footer}>
              <button style={styles.btnCancel} onClick={() => setEditando(null)}>Cancelar</button>
              <button style={styles.btnConfirm} onClick={guardar} disabled={loading}>
                {loading ? 'Guardando…' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
})

export default Listado

const styles = {
  wrapper: { width: '100%' },
  tableWrap: { overflowX: 'auto', borderRadius: '10px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' },
  table: { width: '100%', borderCollapse: 'collapse', background: 'white' },
  th: {
    background: '#006400', color: 'white', padding: '12px 16px',
    textAlign: 'left', fontSize: '0.8rem', fontWeight: 700,
    letterSpacing: '0.5px', textTransform: 'uppercase',
  },
  td: { padding: '11px 16px', fontSize: '0.88rem', color: '#1e293b', borderBottom: '1px solid #f1f5f9' },
  btnEdit: {
    background: '#1d4ed8', color: 'white', border: 'none',
    padding: '5px 12px', borderRadius: '5px', fontSize: '0.8rem',
    fontWeight: 600, marginRight: '6px', cursor: 'pointer',
  },
  btnDel: {
    background: '#dc2626', color: 'white', border: 'none',
    padding: '5px 12px', borderRadius: '5px', fontSize: '0.8rem',
    fontWeight: 600, cursor: 'pointer',
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
  modalTitle: { fontSize: '1.2rem', fontWeight: 700 },
  closeBtn: { background: 'none', border: 'none', fontSize: '1.2rem', color: '#64748b', cursor: 'pointer' },
  formGrid: { padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '4px' },
  label: { fontSize: '0.85rem', fontWeight: 600, color: '#475569' },
  input: {
    padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: '6px',
    fontSize: '0.9rem', outline: 'none', width: '100%',
  },
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
