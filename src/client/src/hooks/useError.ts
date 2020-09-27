import { notification } from 'antd'
import { useState, useEffect } from 'react'

const DURATION = 5000

const useError = function (): [string, (error: string) => void] {
  const [error, setError] = useState('')

  useEffect(() => {
    if (error) {
      notification.open({ type: 'error', message: error })
      setTimeout(() => {
        setError('')
      }, DURATION)
    }
  }, [error])

  return [error, setError]
}

export default useError
