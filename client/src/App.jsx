import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskList from './components/TaskList';
import { useTaskContext } from './TaskContext';

function App() {
  const [activeTab, setActiveTab] = useState('todo');
  const { state, dispatch } = useTaskContext();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    // Get the source and destination columns (states)
    const sourceColumn = result.source.droppableId;
    const destinationColumn = result.destination.droppableId;

    // Ensure the task status has changed
    if (sourceColumn !== destinationColumn) {
      // Update the task status in the frontend
      const updatedTasks = [...state.tasks];
      const [movedTask] = updatedTasks.splice(result.source.index, 1);
      updatedTasks.splice(result.destination.index, 0, movedTask);

      dispatch({ type: 'SET_TASKS', payload: updatedTasks });

      // Send a request to update the task status on the backend
      fetch(`http://localhost:5000/tasks/${result.draggableId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newState: destinationColumn }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Update the global state with the new task status
          const updatedTasks = state.tasks.map((task) =>
            task.id === data.id ? { ...task, state: data.state } : task
          );
          dispatch({ type: 'SET_TASKS', payload: updatedTasks });
        });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <h1>Daily Task</h1>
        <div className="task-list">
          <div className="columns">
            <TaskList activeTab="todo" />
            <TaskList activeTab="in-progress" />
            <TaskList activeTab="done" />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;




