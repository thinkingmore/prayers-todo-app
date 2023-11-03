const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const fs = require('fs'); 
const cors = require("cors")

//middleware
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send("Welcome to my to do app");
  });


// fetch tasks from json file  
app.get('/tasks', (req, res) => {
  fs.readFile('tasks.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Unable to fetch tasks' });
    } else {
      const tasks = JSON.parse(data);
      res.json(tasks);
    }
  });
});


// update tasks status with a given id

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { newState } = req.body;

  // Read the current tasks from the JSON file
  fs.readFile('tasks.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Unable to update task status' });
    }

    const tasks = JSON.parse(data);

    // Find the task with the given ID
    const task = tasks.find((task) => task.id === id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update the task's status
    task.state = newState;

    // Write the updated tasks back to the JSON file
    fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Unable to update task status' });
      }

      res.json(task);
    });
  });
});

// route to add a new task
app.post('/tasks', (req, res) => {
  // Read existing tasks from a JSON file
  fs.readFile('tasks.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Unable to add task' });
    } else {
      const tasks = JSON.parse(data);
      const newTask = req.body;

      tasks.push(newTask);

      // Write the updated tasks back to the JSON file
      fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Unable to add task' });
        } else {
          res.json(newTask);
        }
      });
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
