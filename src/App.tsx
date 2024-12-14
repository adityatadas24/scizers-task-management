import React, { useEffect, useState } from "react";
import { Layout, notification } from "antd";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import TaskList from "./components/TaskList";
import { Task } from "./types/Task";
import { getTasks, addTask, updateTask, deleteTask } from "./api/api";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        notification.error({
          message: "Error fetching tasks",
          description: (error as Error).message,
        });
      }
    };
    loadTasks();
  }, []);

  const handleAddTask = async (newTask: Omit<Task, "id">) => {
    try {
      const addedTask = await addTask(newTask);
      setTasks([...tasks, addedTask]);
      notification.success({ message: "Task added successfully!" });
    } catch (error) {
      notification.error({
        message: "Error adding task",
        description: (error as Error).message,
      });
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      const result = await updateTask(updatedTask.id, updatedTask);
      setTasks(
        tasks.map((task) => (task.id === updatedTask.id ? result : task))
      );
      notification.success({ message: "Task updated successfully!" });
    } catch (error) {
      notification.error({
        message: "Error updating tasks",
        description: (error as Error).message,
      });
    } finally {
      setIsEditModalOpen(false);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
      notification.success({ message: "Task deleted successfully!" });
    } catch (error) {
      notification.error({
        message: "Error deleting task",
        description: (error as Error).message,
      });
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">Task Management App</Header>
      <Content className="content">
        <AddTask onSubmit={handleAddTask} />
        <TaskList
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
        {editingTask && (
          <EditTask
            open={isEditModalOpen}
            task={editingTask}
            onUpdate={handleUpdateTask}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </Content>
     
    </Layout>
  );
};

export default App;
