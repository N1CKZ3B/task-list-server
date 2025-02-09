const { Router } = require("express");

module.exports = (tasks) => {
    const router = Router();

    router.get("/all", (req, res) => {
        res.json(tasks);
    });

    router.get("/task/:id", (req, res) => {
        const task = tasks.find(t => t.id === parseInt(req.params.id));
        if (!task) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }
        res.json(task);
    });

    router.get("/tasks/status/:status", (req, res) => {
        const status = req.params.status === "complete";
        const filteredTasks = tasks.filter(t => t.isCompleted === (status === true));
        res.json(filteredTasks);
    });

    return router;
};