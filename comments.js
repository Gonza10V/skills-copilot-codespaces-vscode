// Create web server
// Load the express library
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Set up the body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load the comments.json file
let comments = [];
if (fs.existsSync('comments.json')) {
  comments = JSON.parse(fs.readFileSync('comments.json'));
}

// Create a route to get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Create a route to add a new comment
app.post('/comments', (req, res) => {
  const newComment = {
    id: comments.length + 1,
    name: req.body.name,
    message: req.body.message,
  };
  comments.push(newComment);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.json(newComment);
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});