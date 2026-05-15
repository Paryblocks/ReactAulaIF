import './App.css'

import Card from './components/Card'
import Header from './components/Header'
import AddForm from './components/AddForm'
import Entries from './components/Entries'

import arrowIcon from './assets/arrow.png'
import moneyIcon from './assets/money.png'

function App() {

  return (
    <>
      <Header titulo="Controle Financeiro"/>
      <div className='cards'>
        <Card titulo="Entradas" 
        simbolo={arrowIcon}
        valor="1500.00"/>
        <Card titulo="Saídas" 
        simbolo={arrowIcon}
        valor="380.00"
        invertido/>
        <Card titulo="Total" 
        simbolo={moneyIcon}
        valor="1120.00"/>
      </div>
      <AddForm/>
      <div className='wrapper'> 
        <div className='item header'>
          <strong>Descrição</strong>
          <strong>Valor</strong>
          <strong>Tipo</strong>
        </div>
        <hr></hr>
        <Entries
        desc="Salário"
        val="1500"
        tipo={arrowIcon}/>
        <Entries
        desc="Alimentação"
        val="380"
        tipo={arrowIcon}
        invertido/>
      </div>
    </>
  )
}

export default App
