let tg = window.Telegram.WebApp;
tg.expand();

// функция для применения стилей темы
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

//
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
setTheme(prefersDarkScheme.matches ? 'dark' : 'light');

//
prefersDarkScheme.addEventListener('change', (e) => {
setTheme(e.matches ? 'dark' : 'light');
})



const links = document.querySelectorAll('.nav-link');

function setActiveLink() {
    const path = window.location.pathname;

    links.forEach(link => link.classList.remove('active'));

    links.forEach(link => {
        if (link.href.includes(path)) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', setActiveLink);

function toggleDropdown() {
    var dropdownContent = document.getElementById("dropdown-content");
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
}

function sortCards(criteria, direction, displayText) {
    var container = document.getElementById('cards-container');
    var cards = Array.from(container.getElementsByClassName('profile-card'));
    var selectedOption = document.getElementById('selected-option');
    var dropdownContent = document.getElementById("dropdown-content");

    // Сортировка карточек
    cards.sort(function(a, b) {
        var aValue, bValue;
        if (criteria === 'name') {
            aValue = a.getAttribute('data-name').toLowerCase();
            bValue = b.getAttribute('data-name').toLowerCase();
        } else if (criteria === 'date') {
            aValue = new Date(a.getAttribute('data-date'));
            bValue = new Date(b.getAttribute('data-date'));
        }

        if (direction === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    // Обновление контейнера
    cards.forEach(function(card) {
        container.appendChild(card);
    });

    // Обновление текста выбранного варианта
    selectedOption.textContent = displayText;

    // Закрытие выпадающего меню
    dropdownContent.style.display = "none";
}

// Закрытие выпадающего меню при клике вне его области
window.onclick = function(event) {
    if (!event.target.matches('.dropdown-select')) {
        var dropdownContent = document.getElementById("dropdown-content");
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        }
    }
}



document.getElementById('dropdown-select').addEventListener('click', function() {
    var dropdownContent = document.getElementById('dropdown-content');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
});

// Закрытие выпадающего меню при клике вне его области
window.addEventListener('click', function(event) {
    if (!event.target.matches('.dropdown-select')) {
        var dropdownContent = document.getElementById('dropdown-content');
        if (dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
        }
    }
});




async function verifyTelegramData(initData, botToken) {
    // Создаем секретный ключ на основе бот-токена
    const secretKey = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(botToken));
    
    // Создаем строку для подписи
    const checkString = Object.keys(initData)
        .filter(key => key !== 'hash')
        .sort()
        .map(key => `${key}=${initData[key]}`)
        .join('\n');
    
    const encoder = new TextEncoder();
    const data = encoder.encode(checkString);
    
    // Импортируем ключ
    const key = await crypto.subtle.importKey('raw', secretKey, {name: 'HMAC', hash: 'SHA-256'}, false, ['sign']);
    
    // Создаем подпись
    const signature = await crypto.subtle.sign('HMAC', key, data);
    
    // Преобразуем подпись в хеш-строку
    const hash = Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    
    // Сравниваем полученный хеш с хешем из initData
    return hash === initData.hash;
}

// Получаем данные пользователя
let user = tg.initDataUnsafe;

if (user) {
    const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE'; // Замените на токен вашего бота

    verifyTelegramData(user, BOT_TOKEN).then(isValid => {
        if (isValid) {
            console.log("Authentication successful:", user);
            // Здесь можно добавить код для отображения контента для авторизованного пользователя
        } else {
            console.error("Authentication failed");
        }
    }).catch(error => {
        console.error("Authentication error:", error);
    });
} else {
    console.error("No init data available");
}

// scripts.js

document.addEventListener("DOMContentLoaded", function() {
    // Проверяем, есть ли данные пользователя в локальном хранилище
    let userData = JSON.parse(localStorage.getItem('userData'));

    // Если данных нет, получаем их из Telegram Web App API
    if (!userData) {
        const tg = window.Telegram.WebApp;
        userData = tg.initDataUnsafe.user;

        // Сохраняем данные в локальное хранилище
        localStorage.setItem('userData', JSON.stringify(userData));
    }

    // Заполняем форму данными пользователя
    document.getElementById('name').value = userData.first_name || '';
    document.getElementById('username').value = userData.username || '';
    document.getElementById('email').value = userData.email || ''; // Assuming the user data contains email

    // Обработка формы
    document.getElementById('accountForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Обновляем данные пользователя
        userData.first_name = document.getElementById('name').value;
        userData.username = document.getElementById('username').value;
        userData.email = document.getElementById('email').value;

        // Сохраняем обновленные данные в локальное хранилище
        localStorage.setItem('userData', JSON.stringify(userData));

        alert('Данные сохранены!');
    });
});



function showSection(sectionId, element) {
    // Скрыть все секции
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.classList.remove('active'));

    // Показать выбранную секцию
    document.getElementById(sectionId).classList.add('active');

    // Обновить активное состояние меню
    const menuLinks = document.querySelectorAll('.top-menu a');
    menuLinks.forEach(link => link.classList.remove('active'));

    // Добавить класс active к нажатому элементу
    element.classList.add('active');
}



document.addEventListener("DOMContentLoaded", function () {
    const tg = window.Telegram.WebApp;
    
    // Инициализация WebApp
    tg.ready();

    // Получение данных пользователя
    const user = tg.initDataUnsafe?.user;

    if (user) {
        // Отображение данных пользователя
        document.getElementById("user-photo").src = user.photo_url;
        document.getElementById("user-name").textContent = user.first_name + " " + user.last_name;
        document.getElementById("user-id").textContent = `User ID: ${user.id}`;
    } else {
        document.getElementById("user-info").textContent = "Unable to retrieve user data.";
    }
});
