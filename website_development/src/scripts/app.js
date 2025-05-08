/* плавное появление сайта c timeout для изменения стиля элемента 
которое создает задержку перед выполнением кода */
const body = document.querySelector('body');
body.style.opacity = '0'; 
body.style.transition = 'opacity 0.4s ease-in-out'; 
/* изменяем свойство opacity элемента body на 1 через 100 миллисекунд */
setTimeout(() => {
    body.style.opacity = '1';
}, 100);


// логика для появления окна (может и не самая простая и понятная, но робит)
const login_click = document.querySelectorAll('.login-click');
const registration_click = document.querySelectorAll('.registration-click');
const login_form = document.querySelector('.container-login');
const registration_form = document.querySelector('.container-registration');


// помечание на каком блоке именно нахолимся (вход или регистрация) также через for of ))
registration_form.style.visibility = "hidden";
registration_form.style.opacity = "0";
login_form.style.transform = "translateX(50%)";
registration_form.style.transform = "translateX(-40%)";
    

// получаем нод лист и проходимся через цикл (т к кнопок с одинаковым классом у 2 а не 1)
for (const log of login_click){
    log.style.color="DimGray";
}
for (const reg of registration_click){
    reg.style.color="DarkGray";
}


for (const btn of registration_click) {
    btn.addEventListener('click', () => {
        registration_form.style.visibility = "visible";
        registration_form.style.opacity = "1";
        registration_form.style.transform = "translateX(-50%)";
        registration_form.style.transition = "opacity 0.6s ease-in-out, transform 0.6s ease-in-out";

        login_form.style.visibility = "hidden";
        login_form.style.opacity = "0";
        login_form.style.transform = "translateX(40%)";
        login_form.style.transition = "opacity 0.6s ease-in-out, transform 0.6s ease-in-out";


        for (const log of login_click){
            log.style.color="DarkGray";
        }
        for (const reg of registration_click){
            reg.style.color="DimGray";
        }
    }); 
}

for (const btn of login_click) {
    btn.addEventListener('click', () => {
        login_form.style.visibility = "visible";
        login_form.style.opacity = "1";
        login_form.style.transform = "translateX(50%)"; 
        login_form.style.transition = "opacity 0.6s ease-in-out, transform 0.6s ease-in-out";

        registration_form.style.visibility = "hidden";
        registration_form.style.opacity = "0";
        registration_form.style.transform = "translateX(-40%)"; 
        registration_form.style.transition = "opacity 0.6s ease-in-out, transform 0.6s ease-in-out";


        for (const log of login_click){
            log.style.color="DimGray";
        }
        for (const reg of registration_click){
            reg.style.color="DarkGray";
        }
    });
}

