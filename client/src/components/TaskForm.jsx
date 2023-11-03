import React, { useState } from 'react';
import { useTaskContext } from '../TaskContext';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { dispatch } = useTaskContext();

  // function for generating a unique id for each task
  function generateUniqueId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    const uniqueId = `${timestamp}-${random}`;
    return uniqueId;
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTaskSubmit = () => {
    const newTask = {
      id: generateUniqueId(),
      title,
      description,
      state: 'todo',
    };

    // Send a POST request to the backend to add the new task
    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server, update the UI, etc.
        dispatch({ type: 'ADD_TASK', payload: data }); // Add the task to your global state
        setTitle(''); 
        setDescription(''); 
      })
      .catch((error) => {
        console.error('Error adding task:', error);
      });
  };

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={handleTitleChange}
      />
      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <button onClick={handleTaskSubmit}>Add a new Task</button>
    </div>
  );
}

export default TaskForm;

