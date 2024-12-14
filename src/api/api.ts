import axios from "axios";
import { Task } from "../types/Task";

const API_BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data.slice(0, 10);
  } catch (error) {
    throw new Error("Failed to fetch tasks.");
  }
};

export const addTask = async (task: Omit<Task, "id">): Promise<Task> => {
  try {
    const response = await axios.post(API_BASE_URL, task);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add task.");
  }
};

export const updateTask = async (
  id: number,
  updatedTask: Partial<Task>
): Promise<Task> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updatedTask);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update task.");
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    throw new Error("Failed to delete task.");
  }
};
