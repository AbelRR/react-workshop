import React from 'react'
import ReactDOM from 'react-dom'
// import { FaRegStar, FaStar } from 'react-icons/fa'
import { MdShoppingCart } from 'react-icons/md'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  )
}

function App() {
  function handleClick() {}
  return (
    <div>
      <Button onClick={handleClick}>
        <span>Add to Cart</span>
        <MdShoppingCart />
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
