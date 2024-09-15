const botToken = '6876430771:AAHhcpK9CwluRfg6_BFWpaKxalhytGETFpo';

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

// Получаем элемент ссылки
const link1 = document.getElementById('banner2');

// Переменная для отслеживания кликов
let clickCount2 = 0;

// Обработчик клика по ссылке
link.addEventListener('click', function(event) {
    // Увеличиваем счётчик кликов
    clickCount++;

    // Если это первый клик, предотвращаем переход по ссылке
    if (clickCount === 1) {
        event.preventDefault(); // Отмена перехода
    }
});