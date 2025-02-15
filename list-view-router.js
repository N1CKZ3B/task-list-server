const { Router } = require("express");

module.exports = (tasks) => {
    const router = Router();

    // Middleware para validar parámetros
    const validateParams = (req, res, next) => {
        const { id, status } = req.params;

        if (id && isNaN(parseInt(id))) {
            return res.status(400).json({ error: "El parámetro 'id' debe ser un número" });
        }

        if (status && !['complete', 'incomplete'].includes(status)) {
            return res.status(400).json({ error: "El parámetro 'status' debe ser 'complete' o 'incomplete'" });
        }

        next();
    };


    router.get("/all", validateParams, (req, res) => {
        res.json(tasks);
    });

    router.get("/task/:id",validateParams,(req, res) => {
        const task = tasks.find(t => t.id === parseInt(req.params.id));
        if (!task) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }
        res.json(task);
    });

    router.get("/tasks/status/:status",validateParams, (req, res) => {
        const status = req.params.status === "complete";
        const filteredTasks = tasks.filter(t => t.isCompleted === status);
        res.json(filteredTasks);
    });

    return router;
};