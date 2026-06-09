import axios from 'axios'

const API = '/api/taller'

export const getTalleres = async () => {
  const { data } = await axios.get(API)
  return data
}

export const agregarTaller = async (taller) => {
  const { data } = await axios.post(API, taller)
  return data
}

export const actualizarTaller = async (taller) => {
  const { data } = await axios.put(`${API}/${taller.id}`, taller)
  return data
}

export const eliminarTaller = async (id) => {
  const { data } = await axios.delete(`${API}/${id}`)
  return data
}
