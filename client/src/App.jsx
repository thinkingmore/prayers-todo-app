import { useEffect } from 'react';
import { useTaskContext } from './TaskContext';

function App() {
  const { state, dispatch } = useTaskContext();

  useEffect(() => {
    // Fetch data from the backend and set it in the context
    fetch('/tasks')
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: 'SET_TASKS', payload: data });
      });
  }, [dispatch]);

  return (
    <div>
      {/* Display tasks and tabs for different states (todo, in-progress, done) */}
      {/* Implement task movement and status updates */}
    </div>
  );
}

export default App;

