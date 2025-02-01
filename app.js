const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const tasks = [{id:1 , isCompleted:false , description: "Reunion 8 AM"},
                {id:2, isCompleted:true , description : "Despertarse"}
];

app.get("/tasks", (req,res) => {
    res.json(tasks);
})

app.get("/" , (req,res) => {
    res.sendFile(path.join(__dirname,'public','index.html'));
});

app.get('/about', function (req, res) {
    res.send('about');
 });
 
app.listen(port, () => {
    console.log("Listening...");
});