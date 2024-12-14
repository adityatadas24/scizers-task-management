import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Switch, Button } from 'antd';
import { Task } from '../types/Task';
import moment from 'moment';

interface EditTaskProps {
  open: boolean;
  task: Task | null;
  onUpdate: (task: Task) => void;
  onClose: () => void;
}

const EditTask: React.FC<EditTaskProps> = ({ open, task, onUpdate, onClose }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        title: task.title,
        priority: task.priority,
        dueDate: moment(task.dueDate),
        status: task.status === 'Completed',
      });
    }
  }, [task, form]);

  const handleSubmit = (values: any) => {
    if (task) {
      onUpdate({
        ...task,
        title: values.title,
        priority: values.priority,
        dueDate: values.dueDate.format('YYYY-MM-DD'),
        status: values.status ? 'Completed' : 'Not Completed',
      });
    }
    onClose(); 
  };

  return (
    <Modal
      title="Edit Task"
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
    >
      <Form
        form={form}
        initialValues={{
          title: task?.title || '',
          priority: task?.priority || 'Medium',
          dueDate: task ? moment(task.dueDate) : moment(),
          status: task?.status === 'Completed',
        }}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Please enter task title' }]}
        >
          <Input placeholder="Task Title" />
        </Form.Item>
        
        <Form.Item
          name="priority"
          rules={[{ required: true, message: 'Please select priority' }]}
        >
          <Select placeholder="Priority">
            <Select.Option value="High">High</Select.Option>
            <Select.Option value="Medium">Medium</Select.Option>
            <Select.Option value="Low">Low</Select.Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          name="dueDate"
          rules={[{ required: true, message: 'Please select due date' }]}
        >
          <DatePicker placeholder="Due Date" />
        </Form.Item>

        <Form.Item name="status" valuePropName="checked">
          <Switch checkedChildren="Completed" unCheckedChildren="Not Completed" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update Task
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTask;
