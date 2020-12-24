import { Formulario } from './components/Formulario'
import { Header } from './components/Header'
import { useEffect, useState } from 'react'
import { Clima } from './components/Clima'
import { Error } from './components/Error'
function App() {
  const [busqueda, setbusqueda] = useState({
    ciudad: '',
    pais: ''
  })
  const [consultar, setconsultar] = useState(false)
  const [resultado, setResultado] = useState({})
  const [error, setError] = useState(false)
  const { ciudad, pais } = busqueda
  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const appId = '3fa6869fce6f8892d9a4f8272aa4499c'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setResultado(resultado)
        setconsultar(false)
        if (resultado.cod === '404') {
          setError(true)
        } else {
          setError(false)
        }
      }
    }
    consultarAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultar])
  let componente
  if (error) {
    componente = <Error mensaje='no hay resultados' />
  } else {
    componente = <Clima resultado={resultado} />
  }
  return (
    <>
      <Header titulo='Clima App' />
      <div className='contenedor-form'>
        <div className='container'>
          <div className='row'>
            <div className='col m6 s12'>
              <Formulario
                setconsultar={setconsultar}
                busqueda={busqueda}
                setbusqueda={setbusqueda}
              />
            </div>
            <div className='col m6 s12'>{componente}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
