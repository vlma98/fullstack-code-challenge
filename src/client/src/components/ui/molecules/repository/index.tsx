import { Button, Card, Input, Space, Tag, Tooltip } from 'antd'
import React, { useState, useContext } from 'react'
import { IRepo } from '../../../../types'
import {
  CloseCircleFilled,
  EditFilled,
  PlusCircleOutlined
} from '@ant-design/icons'
// import { getIssues } from '../../../../api/github'
import ModalRepoForm from '../repo-form'
import ReposContext from '../../../../contexts/repos'
import './repository.css'

interface Props {
  repo: IRepo
}
const Repository = function (props: Props) {
  const { repo } = props

  const { owner, name, labels, _id } = repo

  const [editInputIndex, setEditInputIndex] = useState<number | null>(null)
  const [label, setLabel] = useState('')
  const [addingLabel, setAddingLabel] = useState(false)
  const [newLabel, setNewLabel] = useState('')
  const [editing, setEditing] = useState(false)
  // const [issues, setIssues] = useState<IIssue[] | null>(null)

  // if (issues === null) {
  //   getIssues(owner, name, labels)
  //     .then((response) => {
  //       setIssuesLoading(false)
  //       setIssues(response.data.issues)
  //     })
  //     .catch((err) => {
  //       setIssuesLoading(false)
  //     })
  // }

  const { updateRepo, deleteRepo } = useContext(ReposContext)

  const handleEditConfirm = async () => {
    if (label)
      updateRepo(_id, {
        owner,
        name,
        labels: labels.map((l, idx) => (idx === editInputIndex ? label : l))
      }).then(() => {
        setEditInputIndex(null)
      })
    else setEditInputIndex(null)
  }

  const renderTag = (
    label: string,
    index: number,
    onClose: (label: string) => Promise<void>
  ) => {
    const isLong = label.length > 20
    const tag = (
      <Tag
        color='geekblue'
        key={label}
        onClick={() => setEditInputIndex(index)}
        closable
        onClose={() => onClose(label)}
      >
        {label.length > 20 ? label.slice(0, 17) + '...' : label}
      </Tag>
    )
    return isLong ? (
      <Tooltip title={label} key={label}>
        {tag}
      </Tooltip>
    ) : (
      tag
    )
  }

  const handleRemoveLabel = async (label: string) => {
    updateRepo(_id, { owner, name, labels: labels.filter((l) => l !== label) })
  }

  const handleAddLabel = async () => {
    if (newLabel)
      updateRepo(_id, { owner, name, labels: [...labels, newLabel] }).then(
        () => {
          setAddingLabel(false)
          setNewLabel('')
        }
      )
    else {
      setAddingLabel(false)
      setNewLabel('')
    }
  }

  const handleDelete = async () => deleteRepo(_id)

  // const renderIssue = (issue: IIssue, index: number, A: IIssue[]) => {
  //   const { title, labels, url, id } = issue
  //   return (
  //     <div key={id} style={{ marginBottom: 30 }}>
  //       <a href={url}>
  //         <Text strong>{title}</Text>
  //         <div>
  //           {labels.map(({ color, name }) => (
  //             <Tag color={color} key={name}>
  //               {name}
  //             </Tag>
  //           ))}
  //         </div>
  //       </a>
  //     </div>
  //   )
  // }

  return (
    <Card
      title={`${owner}/${name}`}
      className='repo-container'
      extra={
        <Space direction='horizontal'>
          <Button onClick={() => setEditing(true)}>
            <EditFilled />
          </Button>
          <Button danger onClick={handleDelete}>
            <CloseCircleFilled />
          </Button>
        </Space>
      }
    >
      <div className='repo-labels'>
        <p>Labels you're following:</p>
        {labels.map((l, idx) =>
          editInputIndex === idx ? (
            <Input
              style={{ width: 100 }}
              key={idx}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              size='small'
              autoFocus
              onBlur={handleEditConfirm}
              onPressEnter={handleEditConfirm}
            />
          ) : (
            renderTag(l, idx, handleRemoveLabel)
          )
        )}
        {!addingLabel && (
          <Tag className='plus-tag' onClick={() => setAddingLabel(true)}>
            <PlusCircleOutlined /> New Label
          </Tag>
        )}
        {addingLabel && (
          <Input
            style={{ width: 100 }}
            autoFocus
            size='small'
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onBlur={handleAddLabel}
            onPressEnter={handleAddLabel}
          />
        )}
      </div>
      {/* 
      <Collapse style={{ marginTop: 15 }}>
        <Collapse.Panel key='0' header='See more...'>
          {issuesLoading && <Spin />}
          {issues && issues.map(renderIssue)}
        </Collapse.Panel>
      </Collapse>
      */}

      <ModalRepoForm
        edition={true}
        visible={editing}
        onCancel={() => setEditing(false)}
        initialValues={{ owner, name, labels, _id }}
      />
    </Card>
  )
}

export default Repository
