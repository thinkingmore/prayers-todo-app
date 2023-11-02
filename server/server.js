const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000; 
const cors = require("cors")

//middleware
app.use(bodyParser.json());
app.use(cors());

let tasks = [
  { id: 1, title: 'Make Breakfast', description: 'Make bread and egg omelete,then make tea.', state: 'todo' },
  { id: 2, title: 'Exrecise', description: 'Do push-ups,squats,crunch,plank and lungs.', state: 'in-progress' },
  { id: 3, title: 'Take shower', description: 'Take shower with cold water and change clothes', state: 'done' },
];

app.get('/', (req, res) => {
    res.send("Welcome to my to do app");
  });

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { newState } = req.body;
  const task = tasks.find((task) => task.id === parseInt(id));

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  task.state = newState;
  res.json(task);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
