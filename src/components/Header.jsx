import React from 'react'

const Header = ({titulo}) => {
  return (
    <header style={{ backgroundColor: 'teal', color: 'white', height: 140, textAlign: 'center'}}>
        <h2>{titulo}</h2>
    </header>
  )
}

export default Header