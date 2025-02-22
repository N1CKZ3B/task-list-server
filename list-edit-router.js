const express = require('express');
const router = express.Router();

module.exports = (tasks) => {
    const validateRequest = (req, res, next) => {
        const { method, body } = req;
        const requiredFields = ['id', 'isCompleted', 'description']; // Ajusta según sea necesario

      

        if ((method === 'POST' || method === 'PUT') && (!body || Object.keys(body).length === 0)) {
            return res.status(400).json({ error: 'El cuerpo de la solicitud no puede estar vacío' });
        }

        for (let i = 0; i < requiredFields.length; i++) {
            const field = requiredFields[i];
            if (!body.hasOwnProperty(field)) {
                return res.status(400).json({ error: `Falta el atributo requerido: ${field}` });
            }
        }

        if (!Number.isInteger(body.id)) {
            return res.status(400).json({ error: "El atributo 'id' debe ser un int" });
        }

        if (typeof body.isCompleted !== 'boolean') {
            return res.status(400).json({ error: "El atributo 'isCompleted' debe ser un booleano" });
        }

        if (typeof body.description !== 'string') {
            return res.status(400).json({ error: "El atributo 'description' debe ser un string" });
        }
        next();
    };

    router.post('/tarea', validateRequest, (req, res) => {
        const { id, isCompleted, description } = req.body;
        const newTask = { id, isCompleted, description };
        tasks.push(newTask);
        res.status(201).json({ message: 'Tarea creada', task: newTask });
    });

    router.put('/tarea/:id', validateRequest, (req, res) => {
        const { id } = req.params;
        const { isCompleted, description } = req.body;
        const taskIndex = tasks.findIndex(task => task.id === parseInt(id));

        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        tasks[taskIndex] = { id, isCompleted, description };
        res.json({ message: 'Tarea actualizada', task: tasks[taskIndex] });
    });

    router.delete('/tarea/:id', (req, res) => {
        const { id } = req.params;
        const taskIndex = tasks.findIndex(task => task.id ===parseInt(id) || task.id === id  );

        if (taskIndex === -1) {
            console.log(`IDs en tasks: ${tasks.map(task => task.id).join(', ')}`);
            return res.status(404).json({ error: `Tarea con ID ${id} no encontrada` });
        }

        const deletedTask = tasks.splice(taskIndex, 1);
        res.json({ message: 'Tarea eliminada', task: deletedTask[0] });
    });

    return router;
};