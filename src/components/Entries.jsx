import React from 'react'
import trashIcon from '../assets/trash.png'

const Entries = ({desc, val, tipo, invertido, onDelete}) => {
  return (
    <>
        <div className="item linha">
            <span>{desc}</span>
            <span>{val}</span>
            <span className={`icon-wrapper ${invertido ? 'invertido' : ''}`}><img src={tipo}/></span>
            <button className="icon-wrapper button" onClick={onDelete}><img src={trashIcon}/></button>
        </div>
    </>
  )
}

export default Entries