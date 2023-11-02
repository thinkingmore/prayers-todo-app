import React from 'react';
import { Draggable } from 'react-beautiful-dnd';


function TaskItem({ task, index, onMoveTask }) {
  const handleMoveTask = (newState) => {
    onMoveTask(task.id, newState);
  };


// convert draggable id to string
let dId = task.id.toString();

  return (
    <Draggable draggableId={dId} index={index}>
      {(provided) => (
        <div
          className={`task-item task-item-${task.state}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <div className="task-controls">
            <button className="task-btn btn-pending" onClick={() => handleMoveTask('todo')}>Pending</button>
            <button className="task-btn btn-progress" onClick={() => handleMoveTask('in-progress')}>In-Progress</button>
            <button  className="task-btn btn-complete" onClick={() => handleMoveTask('done')}>Done</button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskItem;

