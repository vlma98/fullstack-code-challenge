import React, { useState, useContext } from 'react'
import { Button, Form, Input } from 'antd'
import UsersContext from '../../../contexts/users'

import './auth.css'

interface Props {}
const Login = function (props: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, isLoading } = useContext(UsersContext)

  const handleLogin = async () => {
    login(email, password)
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }
  const tailLayout = {
    wrapperCol: { offset: 10, span: 16 }
  }

  return (
    <div>
      <Form {...layout} className='auth-form'>
        <Form.Item label='Email' name='email' labelAlign='left'>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item label='Password' name='password' labelAlign='left'>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type='primary' onClick={handleLogin} loading={isLoading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
