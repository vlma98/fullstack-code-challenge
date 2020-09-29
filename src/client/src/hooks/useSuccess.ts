import { notification } from 'antd'
import { useState, useEffect } from 'react'

const DURATION = 3000

const useSuccess = function (): [string, (error: string) => void] {
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (success) {
      notification.open({
        type: 'success',
        message: success,
        duration: DURATION
      })
      setTimeout(() => {
        setSuccess('')
      }, DURATION)
    }
  }, [success])

  return [success, setSuccess]
}

export default useSuccess
