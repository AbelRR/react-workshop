import React, { useReducer } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

function Quantity() {
  const [quantity, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SUBTRACT': {
        return state.quantity - 1
      }
      case 'ADD': {
        return state.quantity + 1
      }
      case 'INPUT': {
        return action.quantity
      }
      default:
        return state
    }
  }, 0)

  function subtract() {
    if (quantity > 0) {
      dispatch({ type: 'SUBTRACT' })
    }
  }

  function add() {
    dispatch({ type: 'ADD' })
  }

  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button onClick={subtract} type="button" className="icon-button">
            <FaMinusCircle />
          </button>
        </div>
        <div className="input-container">
          <input
            type="text"
            aria-label="quantity"
            value={quantity}
            onChange={(e) => dispatch({ type: 'INPUT', quantity: parseInt(e.target.value) })}
          />
        </div>
        <div>
          <button onClick={add} type="button" className="icon-button">
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quantity
