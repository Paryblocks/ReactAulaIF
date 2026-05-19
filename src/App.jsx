import './App.css'

import Card from './components/Card'
import Header from './components/Header'
import AddForm from './components/AddForm'
import Entries from './components/Entries'

import arrowIcon from './assets/arrow.png'
import moneyIcon from './assets/money.png'

import { useState } from 'react'

function App() {
  const [entrada, setEntrada] = useState(0)
  const [saida, setSaida] = useState(0)
  const [dados, setDados] = useState({descricao: '', valor: '', tipo: 'entrada'})

  const [tabela, setTabela] = useState([])

  const handleChange = (campo, valor) => {
    setDados(prev => ({
      ...prev,
      [campo]: valor
    }))
  }

  const handleUpdate = () => {
    if(dados.tipo === 'entrada'){
      setEntrada(Number(entrada) + Number(dados.valor))
    }
    if(dados.tipo === 'saida'){
      setSaida(Number(saida) + Number(dados.valor))
    }
    setTabela([...tabela, dados])
  }

  return (
    <>
      <Header titulo="Controle Financeiro"/>
      <div className='cards'>
        <Card titulo="Entradas" 
        simbolo={arrowIcon}
        valor={entrada}/>
        <Card titulo="Saídas" 
        simbolo={arrowIcon}
        valor={saida}
        invertido/>
        <Card titulo="Total" 
        simbolo={moneyIcon}
        valor={entrada - saida}/>
      </div>
      <AddForm onChange={handleChange} onClick={handleUpdate}/>
      <div className='wrapper'> 
        <div className='item header'>
          <strong>Descrição</strong>
          <strong>Valor</strong>
          <strong>Tipo</strong>
        </div>
        <hr></hr>
        {
        tabela.map(
          (entry) => {
            <Entries
            desc={entry.descricao}
            val={entry.valor}
            tipo={arrowIcon}
            invertido={entry.tipo === 'saida'}/>
          }
        )
        }
      </div>
    </>
  )
}

export default App
