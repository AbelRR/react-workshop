import React, { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

function Quantity() {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button
            onClick={() => {
              setQuantity(quantity - 1)
            }}
            type="button"
            className="icon-button"
          >
            <FaMinusCircle />
          </button>
        </div>
        <div className="input-container">
          <input
            type="text"
            aria-label="quantity"
            value={parseInt(quantity, 10) + 5}
            onChange={event => {
              setQuantity(event.target.value)
            }}
          />
        </div>
        <div>
          <button
            onClick={() => {
              setQuantity(quantity + 1)
            }}
            type="button"
            className="icon-button"
          >
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quantity
