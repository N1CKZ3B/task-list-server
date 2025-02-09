const express = require("express");
const app = express();
const port = 3002;
const path = require("path");

const tasks = [
    { id: 1, isCompleted: false, description: "Reunion 8 AM" },
    { id: 2, isCompleted: true, description: "Despertarse" }
];

const listViewRouter = require("./list-view-router")(tasks);

app.use(express.json());
app.use("/api", listViewRouter);

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});