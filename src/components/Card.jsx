import React from 'react'
import './Card.css'

const Card = ({titulo, simbolo, valor, invertido}) => {
  return (
    <div className="card">
        <div className={`card-top ${invertido ? `invertido` : ''}`}>
            <span style={{fontSize: 22, marginLeft: 10}}>{titulo}</span> 
            <img style={{marginRight: 20}} src={simbolo}/>
        </div>
        <div className="card-body">
            <h2 style={{textAlign: 'center'}}>R$ {valor}</h2>
        </div>
    </div>
  )
}

export default Card