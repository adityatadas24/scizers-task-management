# Task Management App

## Overview
This application is a task management system that allows users to add, edit, delete, and view tasks. Built with React and Ant Design, it ensures a responsive user experience and provides features for prioritizing and tracking task statuses.

## Features
- Add new tasks with title, priority, due date, and status.
- Edit existing tasks.
- Delete tasks.
- View task list with pagination.
- Responsive and visually appealing design using Ant Design.


## Setup Instructions

1. Clone the repository:

   git clone <repository_url>
   cd task-management-app
   ```

2. Install dependencies:
  
   npm install


3. Start the development server:
  
   npm start

 

4. Open the app in your browser at:
   ```
   http://localhost:3000
   ```

## Design Choices

1. **Ant Design**: Chosen for its robust UI components and responsiveness.
2. **Axios**: Used for API interactions to fetch, add, update, and delete tasks.
3. **Component Structure**: 
   - `AddTask`: Handles new task creation.
   - `EditTask`: Modal for editing tasks.
   - `TaskList`: Displays tasks in a paginated table.

## Assumptions
- Tasks have a unique `id` for identification.
- Task priority is categorized as High, Medium, or Low.
- Due dates are mandatory and formatted as `YYYY-MM-DD`.
- Status is either "Completed" or "Not Completed".
- Mock API endpoints are used for data operations.
