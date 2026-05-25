import './App.css'

import Card from './components/Card'
import Header from './components/Header'
import AddForm from './components/AddForm'
import Entries from './components/Entries'

import arrowIcon from './assets/arrow.png'
import moneyIcon from './assets/money.png'

import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [entrada, setEntrada] = useState(0)
  const [saida, setSaida] = useState(0)
  const [dados, setDados] = useState({descricao: '', valor: '', tipo: 'entrada'})

  const [tabela, setTabela] = useState([])

  useEffect( () => {
    const buscarDados = async () => {
      const resposta = await fetch('http://localhost/backend/api.php')
      const data = await resposta.json()
      data.forEach(item => {
        if(item.tipo === 'entrada'){
          setEntrada(Number(entrada) + Number(item.valor))
        }
        if(item.tipo === 'saida'){
          setSaida(Number(saida) + Number(item.valor))
        }
      })
      setTabela(data)
    }
    buscarDados()
  }, [])

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
    setTabela([...tabela, {...dados}])
  }

  const handleDelete = (indexDelete) => {
    const confirm = window.confirm("Deseja excluir esse item?")
    if(!confirm){
      return
    }else{
      const item = tabela[indexDelete]
      if(item.tipo === 'entrada'){
        setEntrada(Number(entrada) - Number(item.valor))
      }
      if(item.tipo === 'saida'){
        setSaida(Number(saida) - Number(item.valor))
      }
      setTabela((tabelaAtual) =>
        tabelaAtual.filter((_, i) => i !== indexDelete)
      )
    }
  }

  return (
    <>
      <Header titulo="Controle Financeiro"/>

      {/* <Routes> Caso fosse fazer outras páginas
        <Route path="/" element={<Card/>}/>
      </Routes> */}

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
        tabela.map((entry, index) => (
            <Entries
            key={index}
            desc={entry.descricao}
            val={entry.valor}
            tipo={arrowIcon}
            invertido={entry.tipo === 'saida'}
            onDelete={() => handleDelete(index)}/>
        ))
        }
      </div>
    </>
  )
}

export default App
