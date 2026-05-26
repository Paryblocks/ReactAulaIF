import React from 'react'
import './AddForm.css'

const AddForm = ({dados, onChange, onClick}) => {
  return (
    <div className='form'>
        <form className='formAdjust'>
            <div className="input-group">
            <label htmlFor='desc'>Descrição</label>
            <input id='desc' value={dados.descricao}  onChange={e => onChange('descricao', e.target.value)}/>
            </div>

            <div className="input-group">
            <label htmlFor='val'>Valor</label>
            <input id='val' value={dados.valor} type='number'onChange={e => onChange('valor', e.target.value)}/>
            </div>

            <div className="input-group">
            <div className="radio-group">
                <div>
                    <input type="radio" name="tipo" value="entrada" onChange={e => onChange('tipo', e.target.value)}/>
                    <span>Entrada</span>
                </div>
                <div>
                    <input type="radio" name="tipo" value="saida" onChange={e => onChange('tipo', e.target.value)}/>
                    <span>Saída</span>
                </div>
            </div>
            </div>
            <button type="button" onClick={onClick}>
                ADICIONAR
            </button>
        </form>
    </div>
  )
}

export default AddForm