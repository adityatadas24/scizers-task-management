// AddTask Component
import React from 'react';
import { Form, Input, Button, Select, DatePicker, Switch, Tooltip, Row, Col } from 'antd';
import { Task } from '../types/Task';
import moment from 'moment';

interface AddTaskProps {
  onSubmit: (task: Omit<Task, 'id'>) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    onSubmit({
      title: values.title,
      priority: values.priority,
      dueDate: values.dueDate.format('YYYY-MM-DD'),
      status: values.status ? 'Completed' : 'Not Completed',
    });
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit} className="task-form">
  <Row gutter={[16, 16]}>
    <Col xs={24} sm={12} md={8} lg={6}>
      <Form.Item
        name="title"
        label="Task Title"  
        rules={[
          { required: true, message: 'Task title is required' },
          { max: 50, message: 'Title cannot exceed 50 characters' },
        ]}
      >
        <Input placeholder="Task Title" />
      </Form.Item>
    </Col>

    <Col xs={24} sm={12} md={8} lg={6}>
      <Form.Item
        name="priority"
        label="Priority" 
        rules={[{ required: true }]}
      >
        <Select placeholder="Priority">
          <Select.Option value="High">High</Select.Option>
          <Select.Option value="Medium">Medium</Select.Option>
          <Select.Option value="Low">Low</Select.Option>
        </Select>
      </Form.Item>
    </Col>

    <Col xs={24} sm={12} md={8} lg={6}>
      <Form.Item
        name="dueDate"
        label="Due Date"  
        rules={[{ required: true, message: 'Due date is required' }]}
      >
        <DatePicker
          placeholder="Due Date"
          disabledDate={(current) => current && current < moment().endOf('day')}
          style={{ width: '100%' }}
        />
      </Form.Item>
    </Col>

    <Col xs={24} sm={12} md={8} lg={6}>
      <Form.Item
        name="status"
        label="Status" 
        valuePropName="checked"
       
      >
        <Tooltip title="Toggle to mark as completed">
          <Switch checkedChildren="Completed" unCheckedChildren="Not Completed" />
        </Tooltip>
      </Form.Item>
    </Col>

    <Col span={24}>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Add Task
        </Button>
      </Form.Item>
    </Col>
  </Row>
</Form>

  );
};

export default AddTask;





