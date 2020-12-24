import React from 'react'
import { useState } from 'react'
import { Error } from './Error'
import PropTypes from 'prop-types'
export const Formulario = ({ busqueda, setbusqueda, setconsultar }) => {
  const [error, seterror] = useState(false)
  //destructuring
  const { ciudad, pais } = busqueda
  const handleChange = (e) => {
    setbusqueda({
      ...busqueda,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (ciudad.trim() === '' || pais.trim() === '') {
      seterror(true)
      return
    }
    seterror(false)
    setconsultar(true)
  }
  return (
    <form onSubmit={handleSubmit}>
      {error && <Error mensaje='ambos campos son obligatorios' />}
      <div className='input-field col s12'>
        <input
          autoComplete='off'
          id='ciudad'
          name='ciudad'
          onChange={handleChange}
          type='text'
          value={ciudad}
        />
        <label htmlFor='ciudad'>Ciudad</label>
      </div>
      <div className='input-field col s12'>
        <select name='pais' id='pais' value={pais} onChange={handleChange}>
          <option value=''>-- Seleccione un pais --</option>
          <option value='US'>Estados Unidos</option>
          <option value='MX'>México</option>
          <option value='AR'>Argentina</option>
          <option value='CO'>Colombia</option>
          <option value='CR'>Costa Rica</option>
          <option value='ES'>España</option>
          <option value='PE'>Perú</option>
        </select>
        <label htmlFor='pais'>Pais</label>
      </div>
      <div className='input-field col s12'>
        <button
          type='submit'
          className='waves-effect waves-light btn-large btn-block grey darken-4 col s12'>
          Buscar Clima
        </button>
      </div>
    </form>
  )
}
Formulario.propTypes = {
  busqueda: PropTypes.object.isRequired,
  setbusqueda: PropTypes.func.isRequired,
  setconsultar: PropTypes.func.isRequired
}
