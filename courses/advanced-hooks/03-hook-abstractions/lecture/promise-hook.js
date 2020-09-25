import React, { useState, useEffect, useCallback } from 'react'
import StarRatings from 'YesterTech/StarRatings'
import Heading from 'YesterTech/Heading'
import api from 'YesterTech/api'

function useSocket(socketApi) {
  const [results, setresults] = useState()

  useEffect(() => {
    socketApi.subscribe(newStuff => {
      setResults(newStuff)
    })
    return () => {
      socketApi.unsubscribe()
    }
  }, [socketApi])

  return results
}

function usePromise(pr) {
  const [results, setResults] = useState(null)

  useEffect(() => {
    let isCurrent = true
    pr().then(results => {
      if (!isCurrent) return
      setResults(results)
    })
    return () => (isCurrent = false)
  }, [pr])

  return results
}

function ProductProfile({ productId }) {
  const product = usePromise(useCallback(() => api.products.getProduct(productId), [productId]))

  if (!product) return <div>Loading...</div>

  return (
    <div className="spacing">
      <Heading>{product.name}</Heading>
      <StarRatings rating={product.rating} />
    </div>
  )
}

export default function App() {
  return (
    <div className="effects-in-custom-hooks">
      <ProductProfile productId={2} />
    </div>
  )
}
