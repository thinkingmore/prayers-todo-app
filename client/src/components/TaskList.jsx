import React, { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd'; 
import TaskItem from './TaskItem';
import { useTaskContext } from '../TaskContext';

function TaskList({ activeTab }) {
  const { state, dispatch } = useTaskContext();
  const [tasks, setTasks] = useState([]);

  // Define a function for fetching tasks
  const fetchTasks = () => {
    fetch('http://localhost:5000/tasks')
      .then((response) => response.json())
      .then((data) => {
        let filter = data.filter((task) => task.state === activeTab);
        setTasks(filter);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  // Fetch data from the backend and set it in the state
  useEffect(() => {
    fetchTasks();
  }, [tasks]);

  const moveTask = (taskId, newState) => {
    fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newState }),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedTasks = state.tasks.map((task) =>
          task.id === data.id ? { ...task, state: data.state } : task
        );
        dispatch({ type: 'SET_TASKS', payload: updatedTasks });
        // After a successful move, fetch the updated tasks again
        fetchTasks();
      });
  };


  return (
    <Droppable droppableId={activeTab} type="TASK">
      {(provided) => (
        <div className="column"
             ref={provided.innerRef}
             {...provided.droppableProps}
        >
          {tasks.map((task, index) => (
            <TaskItem key={task.id} task={task} index={index} onMoveTask={moveTask} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default TaskList;



