import React, { useState } from 'react'

import { Button, Form, Input } from 'antd'
import { navigate } from '@reach/router'
interface Props {}
const Login = function (props: Props) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = async () => {
    alert('Loging in with ' + email + ' password')
    navigate('/dashboard')
  }

  return (
    <div>
      <Form>
        <Form.Item label='Email' name='email'>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item label='Password' name='password'>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Button onClick={handleLogin}>Login</Button>
      </Form>
    </div>
  )
}

export default Login
