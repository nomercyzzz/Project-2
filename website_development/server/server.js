const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const PORT = 3000;
const app = express();

// Настройка middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'src')));
app.use(express.static(path.join(__dirname, '..', 'src', 'pages')));


// Путь к данным пользователей
const usersDataPath = path.join(__dirname, 'data', 'users.json');

// Функции для работы с данными
const readUsersData = () => {
    if (!fs.existsSync(usersDataPath)) {
        fs.writeFileSync(usersDataPath, '[]');
    }
    return JSON.parse(fs.readFileSync(usersDataPath));
}

const writeUsersData = (data) => {
    fs.writeFileSync(usersDataPath, JSON.stringify(data, null, 2));
};

// Регистрация
app.post('/register', async (req, res) => {

    const { login, email, password } = req.body;
    const users = readUsersData();
    if (users.some(user => user.login === login || user.email === email)) {
        return res.status(400).send('Пользователь уже существует');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ login, email, password: hashedPassword });
    writeUsersData(users);
    res.status(201).send('Регистрация успешна');
});

// Авторизация
app.post('/login', async (req, res) => {
        const { login, password } = req.body;
        
        const users = readUsersData();
        const user = users.find(user => user.login === login);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Неверные данные');
        }

        const token = jwt.sign(
            { login: user.login, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
});

// Маршруты для страниц
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'src', 'pages', 'index.html'));
});

app.get('/user-account', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'src', 'pages', 'user-account.html'));
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});