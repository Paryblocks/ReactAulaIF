import './App.css'

import Card from './components/Card'
import Header from './components/Header'
import AddForm from './components/AddForm'
import Entries from './components/Entries'

import arrowIcon from './assets/arrow.png'
import moneyIcon from './assets/money.png'

import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

function App() {
  const [entrada, setEntrada] = useState(0)
  const [saida, setSaida] = useState(0)
  const [dados, setDados] = useState({id: '', descricao: '', valor: '', tipo: 'entrada'})

  const [tabela, setTabela] = useState([])

  useEffect( () => {
    const buscarDados = async () => {
      const resposta = await fetch('http://localhost/backend/api.php?acao=buscar')
      const data = await resposta.json()

      let somaEntrada = 0;
      let somaSaida = 0;

      data.forEach(item => {
        if(item.tipo === 'entrada'){
          somaEntrada += Number(item.valor)
        }
        if(item.tipo === 'saida'){
          somaSaida += Number(item.valor)
        }
      })
      setEntrada(somaEntrada)
      setSaida(somaSaida)
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

  const handleUpdate = async () => {
    if (!dados.descricao.trim() || !dados.valor || Number(dados.valor) <= 0) {
      alert("Por favor, preencha todos os campos com valores válidos!")
      return 
    }

    try {
      const resposta = await fetch('http://localhost/backend/api.php?acao=salvar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados)
      })
      if (resposta.ok) {
        const dadosDoBanco = await resposta.json()
        const retornoId = dadosDoBanco.id

        if(dados.tipo === 'entrada'){
          setEntrada(Number(entrada) + Number(dados.valor))
        }
        if(dados.tipo === 'saida'){
          setSaida(Number(saida) + Number(dados.valor))
        }

        const novoItem = { ...dados, id: retornoId}
        setTabela([...tabela, novoItem])

        if(dados.tipo === 'entrada'){
          setDados({id: '', descricao: '', valor: '', tipo: 'entrada'})
        }else{
          setDados({id: '', descricao: '', valor: '', tipo: 'saida'})
        }
      }
    } catch (error) {
    console.error("Erro ao salvar:", error)
    }
  }

  const handleDelete = async (item) => {
    const confirm = window.confirm("Deseja excluir esse item?")
    if(!confirm){
      return
    }else{
      try {
        const resposta = await fetch(`http://localhost/backend/api.php?acao=excluir&id=${item.id}`)
        if (resposta.ok){
          if(item.tipo === 'entrada'){
            setEntrada(Number(entrada) - Number(item.valor))
          }
          if(item.tipo === 'saida'){
            setSaida(Number(saida) - Number(item.valor))
          }
          setTabela((tabelaAtual) =>
            tabelaAtual.filter((t) => t.id !== item.id)
          )
        }
      } catch (error) {
        console.error("Erro ao excluir:", error)
      }
    }
  }

  return (
    <>
      {/* Caso fosse fazer outras páginas, essas seriam as funções necessárias
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/pagina2">Página 2</Link></li>
      </ul>
      <Routes> 
        <Route path="/" element={<Componente/>}/>
      </Routes> */}

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
      <AddForm dados={dados} onChange={handleChange} onClick={handleUpdate}/>
      <div className='wrapper'> 
        <div className='item header'>
          <strong>Descrição</strong>
          <strong>Valor</strong>
          <strong>Tipo</strong>
        </div>
        <hr></hr>
        {
        tabela.map((entry) => (
            <Entries
            key={entry.id}
            desc={entry.descricao}
            val={entry.valor}
            tipo={arrowIcon}
            invertido={entry.tipo === 'saida'}
            onDelete={() => handleDelete(entry)}/>
        ))
        }
      </div>
    </>
  )
}

export default App
