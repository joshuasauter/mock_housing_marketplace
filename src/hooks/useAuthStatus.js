import { useEffect, useState, useRef } from "react"
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// Protected Routes in v6 hook
export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  // Prevent memory leak warning
  const isMounted = useRef(true)

  useEffect(() => {
    if(isMounted) {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if(user) {
          setLoggedIn(true)
        }
        setCheckingStatus(false)
      })
    }

    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  return { loggedIn, checkingStatus }
}
