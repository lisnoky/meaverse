// Подключение Telegram WebApp
let tg = window.Telegram.WebApp;
let buy = document.getElementById("buy");
let order = document.getElementById("order");
tg.expand();

/*
// Функция для применения стилей темы
function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.style.setProperty('--background-color', '#141414');
        document.documentElement.style.setProperty('--text-color', '#fbfbfb');
        document.documentElement.style.setProperty('--link-color', 'none');
        document.documentElement.style.setProperty('--border-color', '#fbfbfb');
        document.documentElement.style.setProperty('--bottom-nav-bg-color', 'rgba(7, 7, 7, 0.7)');
    } else {
        document.documentElement.style.setProperty('--background-color', '#fbfbfb');
        document.documentElement.style.setProperty('--text-color', '#141414');
        document.documentElement.style.setProperty('--link-color', 'none');
        document.documentElement.style.setProperty('--border-color', '#141414');
        document.documentElement.style.setProperty('--bottom-nav-bg-color', 'rgba(216, 216, 216, 0.7)');
    }
}

// Установка темы в зависимости от предпочтений пользователя
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
setTheme(prefersDarkScheme.matches ? 'dark' : 'light');

// Обновление темы при изменении настроек пользователя
prefersDarkScheme.addEventListener('change', (e) => {
    setTheme(e.matches ? 'dark' : 'light');
});
*/

// Функция для обработки активных ссылок меню
function setActiveLink() {
    const path = window.location.pathname;
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        link.classList.toggle('active', link.href.includes(path));
    });
}

document.addEventListener('DOMContentLoaded', setActiveLink);

// Функция для переключения выпадающего меню
function toggleDropdown() {
    const dropdownContent = document.getElementById("dropdown-content");
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
}

// Закрытие выпадающего меню при клике вне его области
window.addEventListener('click', function(event) {
    if (!event.target.matches('.dropdown-select')) {
        const dropdownContent = document.getElementById('dropdown-content');
        if (dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
        }
    }
});

// Функция для сортировки карточек
function sortCards(criteria, direction, displayText) {
    const container = document.getElementById('cards-container');
    const cards = Array.from(container.getElementsByClassName('profile-card'));

    cards.sort((a, b) => {
        let aValue, bValue;
        if (criteria === 'name') {
            aValue = a.getAttribute('data-name').toLowerCase();
            bValue = b.getAttribute('data-name').toLowerCase();
        } else if (criteria === 'date') {
            aValue = new Date(a.getAttribute('data-date'));
            bValue = new Date(b.getAttribute('data-date'));
        }
        return direction === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });

    cards.forEach(card => container.appendChild(card));
    document.getElementById('selected-option').textContent = displayText;
    toggleDropdown();
}

// Функция для аутентификации данных пользователя через Telegram
async function verifyTelegramData(initData, botToken) {
    const secretKey = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(botToken));
    const checkString = Object.keys(initData)
        .filter(key => key !== 'hash')
        .sort()
        .map(key => `${key}=${initData[key]}`)
        .join('\n');

    const key = await crypto.subtle.importKey('raw', secretKey, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(checkString));
    const hash = Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');

    return hash === initData.hash;
}

// Получение данных пользователя из Telegram и проверка их подлинности
document.addEventListener("DOMContentLoaded", function() {
    if (window.Telegram && window.Telegram.WebApp) {
        tg.ready();
        const user = tg.initDataUnsafe?.user;

        if (user) {
            const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE'; // Замените на токен вашего бота
            verifyTelegramData(tg.initDataUnsafe, BOT_TOKEN).then(isValid => {
                if (isValid) {
                    console.log("Authentication successful:", user);
                    document.getElementById('profile-photo').value = tg.initDataUnsafe.user.photo_url
                    document.getElementById('username').value = tg.initDataUnsafe.user.first_name + " " + tg.initDataUnsafe.user.last_name
                } else {
                    console.error("Authentication failed");
                }
            }).catch(error => console.error("Authentication error:", error));
        } else {
            console.error("No init data available");
        }
    } else {
        console.error("Telegram WebApp не инициализирован. Запустите приложение внутри Telegram.");
    }
});

// Функция для отображения выбранного раздела
function showSection(sectionId, element) {
    document.querySelectorAll('section').forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');

    document.querySelectorAll('.top-menu a').forEach(link => link.classList.remove('active'));
    element.classList.add('active');
}




document.addEventListener("DOMContentLoaded", function() {
    // Проверяем доступность объекта Telegram WebApp
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        
        // Инициализация WebApp
        tg.ready(function() {
            // Добавляем отладочные сообщения
            console.log("Telegram WebApp инициализирован");

            // Получение данных пользователя
            const user = tg.initDataUnsafe?.user;

            if (user) {
                console.log("Данные пользователя успешно получены:", user);

                // Отображение данных пользователя
                document.getElementById('profile-photo').src = user.photo_url;
                document.getElementById('username').textContent = `${user.first_name} ${user.last_name}`;
                document.getElementById('user-id').textContent = `User ID: ${user.id}`;
            } else {
                console.log("Данные пользователя не получены или отсутствуют.");
                document.getElementById('username').textContent = "Не удалось получить данные пользователя.";
            }
        });
    } else {
        console.error("Telegram WebApp не инициализирован. Запустите приложение внутри Telegram.");
        document.getElementById("username").textContent = "Telegram WebApp is not initialized.";
    }
});



document.addEventListener("DOMContentLoaded", function() {
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready(function() {
            console.log("Telegram WebApp инициализирован");

            const user = tg.initDataUnsafe?.user;
            console.log("Данные пользователя:", user);
        });
    } else {
        console.error("Telegram WebApp не инициализирован.");
    }
});




document.addEventListener("DOMContentLoaded", function() {
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready(function() {
            const user = tg.initDataUnsafe?.user;

            if (user) {
                document.getElementById('profile-photo').src = user.photo_url;
                document.getElementById('username').textContent = `${user.first_name} ${user.last_name}`;
                document.getElementById('user-id').textContent = `User ID: ${user.id}`;
            } else {
                document.getElementById('username').textContent = "Не удалось получить данные пользователя.";
            }
        });
    } else {
        document.getElementById("username").textContent = "Telegram WebApp не инициализирован.";
    }
});





document.addEventListener("DOMContentLoaded", function() {
    try {
        if (window.Telegram && window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready(function() {
                const user = tg.initDataUnsafe?.user;

                if (user) {
                    document.getElementById('profile-photo').src = user.photo_url;
                    document.getElementById('username').textContent = `${user.first_name} ${user.last_name}`;
                    document.getElementById('user-id').textContent = `User ID: ${user.id}`;
                } else {
                    document.getElementById('username').textContent = "Не удалось получить данные пользователя.";
                }
            });
        } else {
            document.getElementById("username").textContent = "Telegram WebApp не инициализирован.";
        }
    } catch (error) {
        console.error("Произошла ошибка:", error);
        document.getElementById('username').textContent = "Произошла ошибка при загрузке данных.";
    }
});




// Получаем элемент ссылки
const link = document.getElementById('banner1');

// Переменная для отслеживания кликов
let clickCount = 0;

// Обработчик клика по ссылке
link.addEventListener('click', function(event) {
    // Увеличиваем счётчик кликов
    clickCount++;

    // Если это первый клик, предотвращаем переход по ссылке
    if (clickCount === 1) {
        event.preventDefault(); // Отмена перехода
    }
});
