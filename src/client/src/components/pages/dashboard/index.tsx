import React, { useContext, useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import Repository from '../../ui/molecules/repository'
import ModalRepoForm from '../../ui/molecules/repo-form'
import { Row, Col, Button } from 'antd'
import Layout from '../../ui/layout'
import ReposContext from '../../../contexts/repos'
import { PlusOutlined } from '@ant-design/icons'

interface Props extends RouteComponentProps {}
const DashboardPage = function (props: Props) {
  const { repos, getRepos } = useContext(ReposContext)
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    getRepos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <Button type='primary' onClick={() => setAdding(true)}>
        <PlusOutlined /> Add repository
      </Button>
      <Row justify='center'>
        {repos.map((r, idx) => (
          <Col xl={9} lg={9} md={18} sm={24} xs={24} key={idx}>
            <Repository repo={r} key={r._id} />
          </Col>
        ))}
      </Row>
      <ModalRepoForm
        visible={adding}
        onCancel={() => setAdding(false)}
        edition={false}
      />
    </Layout>
  )
}

export default DashboardPage
