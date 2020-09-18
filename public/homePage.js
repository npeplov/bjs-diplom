// 1. Создайте объект класса LogoutButton
const logout = new LogoutButton;

// 2. В свойство action запишите функцию, которая будет вызывать запрос деавторизации (logout)
logout.action = () => ApiConnector.logout( (response) => {
// 3. В колбек запроса добавьте проверку: если запрос выполнился успешно, то 
// обновите страницу (с помощью location.reload();
    if (response.success === true) 
        location.reload();
} );

// Выполните запрос на получение текущего пользователя (current),
ApiConnector.current(
// в колбеке которого проверьте ответ:   
    (response) => {
        // если ответ успешный, то
        if (response.success === true)
        // вызовите метод отображения данных профиля (ProfileWidget.showProfile)
        ProfileWidget.showProfile(
            // в который передавайте данные ответа от сервера.
            response.data
        )
    }
)

// 1. Создайте объект типа RatesBoard.
rates = new RatesBoard;
// 2. Напишите функцию, которая будет 
function showRates() {
    // выполнять запрос получения курсов валют.
    ApiConnector.getStocks(response => {
        // В случае успешного запроса, 
        if (response.success === true) {
            // очищайте таблицу с данными (clearTable)
            rates.clearTable()
            // и заполняйте её (fillTable) полученными данными
            rates.fillTable(response.data)
            console.log("Курсы валют загружены");
        }
    })
}

// Напишите интервал, который будет многократно выполняться (раз в минуту) и вызывать вашу функцию с получением валют.
let timerId = setInterval(showRates(), 1000*60)

// Создайте объект типа MoneyManager
let money = new MoneyManager;

// Реализуйте пополнение баланса:
// 1. Запишите в свойство addMoneyCallback функцию, которая будет выполнять запрос.
money.addMoneyCallback = (data) => {
    // Используйте аргумент функции свойства addMoneyCallback для передачи данных data в запрос.
    ApiConnector.addMoney(data, response => {
        // В случае успешного запроса
        if (response.success === true) {
            // отобразите в профиле новые данные о пользователе из данных ответа от сервера (showProfile).
            ProfileWidget.showProfile(
                response.data
            )
        }
    })
}
money.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(
                response.data
            )
        }
    })
}

let favorites = new FavoritesWidget;

ApiConnector.getFavorites(response => {
    if (response.success === true) {
        favorites.clearTable();
        favorites.fillTable(response.data);
        money.updateUsersList(response.data)
    }
})

favorites.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success === true) {
            favorites.clearTable();
            favorites.fillTable(response.data);
            money.updateUsersList(response.data)
        }
        else
            favorites.setMessage(response.success, response.error)
    })
}

favorites.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success === true) {
            favorites.clearTable();
            favorites.fillTable(response.data);
            money.updateUsersList(response.data)
        }
    })
}