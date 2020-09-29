import React, { useState, useContext } from 'react'
import { Form, Modal, Input, Divider, Tag } from 'antd'
import ctes from '../../../../constants'
import ReposContext from '../../../../contexts/repos'
import { PlusOutlined } from '@ant-design/icons'

const { githubUrl } = ctes

interface Props {
  visible: boolean
  onCancel: () => void
  initialValues?: {
    _id: string
    owner: string
    name: string
    labels: string[]
  }
  title?: string
  edition: boolean
}
const RepoForm = function (props: Props) {
  const { initialValues } = props
  const [repoURL, setRepoURL] = useState(
    initialValues ? initialValues.owner + '/' + initialValues.name : ''
  )
  const [owner, setOwner] = useState(initialValues?.owner || '')
  const [name, setName] = useState(initialValues?.name || '')
  const [labels, setLabels] = useState<string[]>(initialValues?.labels || [])
  const [addingLabel, setAddingLabel] = useState(false)
  const [newLabel, setNewLabel] = useState('')

  const { isLoading, createRepo, updateRepo } = useContext(ReposContext)

  const handleAddLabel = async () => {
    if (newLabel) {
      setLabels([...labels, newLabel])
      setNewLabel('')
    }
    setAddingLabel(false)
  }

  const closeAndReset = () => {
    setOwner('')
    setName('')
    setLabels([])
    setRepoURL('')
    props.onCancel() // just to close the modal
  }

  const handleAddRepo = async () => {
    const [urlOwner, urlName] = repoURL.split('/')
    let usedOwner: string = owner,
      usedName: string = name
    if (repoURL.split('/').length >= 2) {
      usedOwner = urlOwner
      usedName = urlName
    }
    if (props.edition) {
      createRepo({ owner: usedOwner, name: usedName, labels }).then(
        closeAndReset
      )
    } else {
      initialValues &&
        updateRepo(initialValues._id, {
          owner: usedOwner,
          name: usedName,
          labels
        }).then(closeAndReset)
    }
  }

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      onOk={handleAddRepo}
      okButtonProps={{ loading: isLoading }}
      title={props.title || 'Add new repository'}
    >
      <Form initialValues={{ url: repoURL }}>
        <Form.Item
          label='Repo URL'
          name='url'
          rules={[
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (getFieldValue('url').split('/').length >= 2) {
                  return Promise.resolve()
                }
                return Promise.reject('Invalid URL')
              }
            })
          ]}
        >
          <Input
            prefix={githubUrl}
            value={repoURL}
            onChange={(e) => setRepoURL(e.target.value)}
          />
        </Form.Item>
      </Form>
      <Divider orientation='center'>ou</Divider>
      <Form initialValues={{ owner, name }}>
        <Form.Item label='Owner' name='owner'>
          <Input value={owner} onChange={(e) => setOwner(e.target.value)} />
        </Form.Item>
        <Form.Item label='Name' name='name'>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item>
          {labels.map((l, idx) => (
            <Tag key={idx}>{l}</Tag>
          ))}
          {!addingLabel && (
            <Tag onClick={() => setAddingLabel(true)}>
              New label <PlusOutlined />
            </Tag>
          )}
          {addingLabel && (
            <Input
              autoFocus
              size='small'
              style={{ width: 100 }}
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onBlur={handleAddLabel}
              onPressEnter={handleAddLabel}
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default RepoForm
