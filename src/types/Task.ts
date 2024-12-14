export interface Task {
    id: number;
    title: string;
    priority: 'High' | 'Medium' | 'Low';
    dueDate: string; // Date as string in 'YYYY-MM-DD'
    status: 'Completed' | 'Not Completed'; // String status
  }
  