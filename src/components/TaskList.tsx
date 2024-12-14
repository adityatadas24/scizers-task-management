import React from 'react';
import { Table, Button, Space, Popconfirm } from 'antd';
import { Task } from '../types/Task';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Priority', dataIndex: 'priority', key: 'priority' },
    { title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, task: Task) => (
        <Space>
          <Button type="link" onClick={() => onEdit(task)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => onDelete(task.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
    dataSource={tasks}
    columns={columns}
    rowKey="id"
    pagination={{ pageSize: 5 }}
    locale={{ emptyText: 'No tasks found' }}
    className="task-table"
  />
  );
};

export default TaskList;