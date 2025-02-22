
const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const router = express.Router();

dotenv.config();

const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
];

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const accessToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ accessToken });
});

module.exports = router;