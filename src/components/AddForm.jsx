import React from 'react'
import './AddForm.css'

const AddForm = () => {
  return (
    <div className='form'>
        <form className='formAdjust'>
            <div className="input-group">
            <label htmlFor='desc'>Descrição</label>
            <input id='desc'/>
            </div>

            <div className="input-group">
            <label htmlFor='val'>Valor</label>
            <input id='val' type='number'/>
            </div>

            <div className="input-group">
            <div className="radio-group">
                <div>
                    <input type="radio" name="tipo" />
                    <span>Entrada</span>
                </div>
                <div>
                    <input type="radio" name="tipo" />
                    <span>Saída</span>
                </div>
            </div>
            </div>
            <button type="submit">
                ADICIONAR
            </button>
        </form>
    </div>
  )
}

export default AddForm