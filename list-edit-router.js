const express = require('express');
const router = express.Router();


const validateRequest = (req, res, next) => {
    const { method, body } = req;
    const requiredFields = ['id']; // Ajusta según sea necesario

    if ((method === 'POST' || method === 'PUT') && (!body || Object.keys(body).length === 0)) {
        return res.status(400).json({ error: 'El cuerpo de la solicitud no puede estar vacío' });
    }

    for (const field of requiredFields) {
        if (!body[field]) {
            return res.status(400).json({ error: `Falta el atributo requerido: ${field}` });
        }
    }

    next();
};



router.post('/tarea', validateRequest, (req, res) => {
    res.send('Tarea creada');
});


router.delete('/tarea/:id', (req, res) => {
    const { id } = req.params;

    res.send(`Tarea con id ${id} eliminada`);
});

router.put('/tarea/:id', validateRequest, (req, res) => {
    res.send(`Tarea con id ${req.params.id} actualizada`);
});

module.exports = router;
