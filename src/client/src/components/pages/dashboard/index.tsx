import React from 'react'
import { RouteComponentProps } from '@reach/router'
import repos from '../../../mock/repos'
import Repository from '../../ui/molecules/repository'
import { Row, Col } from 'antd'
import Layout from '../../ui/layout'

interface Props extends RouteComponentProps {}
const DashboardPage = function (props: Props) {
  return (
    <Layout>
      <Row justify='center'>
        {repos.map((r, idx) => (
          <Col xl={9} lg={9} md={18} sm={24} xs={24} key={idx}>
            <Repository repo={r} key={r._id} />
          </Col>
        ))}
      </Row>
    </Layout>
  )
}

export default DashboardPage
