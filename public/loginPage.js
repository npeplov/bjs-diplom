"use strict"

// 2. Создайте объект класса UserForm
const user = new UserForm();

// 3. Присвойте свойству loginFormCallback значение функции

// 3.1 Функция должна выполнять запрос на сервер для попытки авторизации пользователя
user.loginFormCallback = data => ApiConnector.login(data, response => {
    console.log(response); 
    // 3.5 В случае успеха запроса обновите страницу (с помощью location.reload();
    if (response.success === true) 
        location.reload();
    // 3.6 В случае провала запроса выведите ошибку в окно для ошибок.
    else
        user.setLoginErrorMessage(response.error);
});

// ApiConnector.logout(() => 1) 

user.registerFormCallback = data => ApiConnector.register(data, response => {
    console.log(response);
    if (response.success === true) 
        location.reload();
    // 3.6 В случае провала запроса выведите ошибку в окно для ошибок.
    else
        user.setRegisterErrorMessage(response.error);
})