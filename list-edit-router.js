const express = require('express');
const router = express.Router();


router.post('/tarea', (req, res) => {
    res.send('Tarea creada');
});


router.delete('/tarea/:id', (req, res) => {
    const { id } = req.params;

    res.send(`Tarea con id ${id} eliminada`);
});

// Actualizar una tarea específica
router.put('/tarea/:id', (req, res) => {
    const { id } = req.params;

    res.send(`Tarea con id ${id} actualizada`);
});

module.exports = router;