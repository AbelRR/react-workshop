import { useState, useEffect, useLayoutEffect } from 'react'

function useMedia(query) {
  const [matches, setMatches] = useState()

  useLayoutEffect(() => {
    setMatches(window.matchMedia(query).matches)
  }, [])

  useEffect(() => {
    const media = window.matchMedia(query)
    const listener = () => {
      setMatches(media.matches)
    }
    media.addEventListener('change', listener)
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}

export default useMedia
