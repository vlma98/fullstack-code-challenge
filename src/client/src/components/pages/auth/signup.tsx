import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
interface Props {}
const SignUp = function (props: Props) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const handleSubmit = () => {
    alert('Sign up with ' + email + ' ' + password + ' ' + confirmPassword)
  }

  return (
    <div>
      <Form>
        <Form.Item name='email'>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item name='password'>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item name='confirmPassword'>
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Item>
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  )
}

export default SignUp
