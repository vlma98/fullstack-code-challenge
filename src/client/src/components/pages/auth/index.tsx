import React from 'react'
import { RouteComponentProps } from '@reach/router'

import { Tabs } from 'antd'

import Login from './login'
import SignUp from './signup'

const { TabPane } = Tabs

interface Props extends RouteComponentProps {}
const AuthPage = function (props: Props) {
  return (
    <div>
      <Tabs defaultActiveKey='1' animated size='large' translate='yes' centered>
        <TabPane tab='Login' key='1'>
          <Login />
        </TabPane>
        <TabPane tab='Sign up' key='2'>
          <SignUp />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default AuthPage