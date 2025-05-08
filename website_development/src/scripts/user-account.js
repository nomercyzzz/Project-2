
// Отправка формы входа
const loginForm = document.querySelector('.container-login form');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const login = document.querySelector('.container-login input[name="login"]').value;
    const password = document.querySelector('.container-login input[name="password"]').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Вход успешен, токен:', data.token);
        localStorage.setItem('token', data.token);
        alert('Вы вошли успешно!');
    } else {
        alert('Ошибка входа');
    }
});

// Отправка формы регистрации
const registrationForm = document.querySelector('.container-registration form');
registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const login = document.querySelector('.container-registration input[name="login"]').value;
    const email = document.querySelector('.container-registration input[name="email"]').value;
    const password = document.querySelector('.container-registration input[name="password"]').value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, email, password }),
    });

    if (response.ok) {
        alert('Регистрация прошла успешно');
    } else {
        alert('Ошибка регистрации');
    }
});
