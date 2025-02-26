const botToken = '6876430771:AAHhcpK9CwluRfg6_BFWpaKxalhytGETFpo';

// Подключение Telegram WebApp
let tg = window.Telegram.WebApp;
let buy = document.getElementById("buy");
let order = document.getElementById("order");
tg.expand();

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

// Ваш API ключ TGStat и username канала
const API_KEY = 'bc6d3a3df29b6a2a31fe7cfe78eb9fcc'; // Замените на ваш API ключ
const RVNGuser = 'reevnge'; // Например: "mychannel"

// URL для запроса данных
const API_URL = `https://api.tgstat.ru/channels/getStats?token=${API_KEY}&channelId=${RVNGuser}`;

// Функция для загрузки данных о канале
async function loadChannelData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.status === 'ok') {
      // Извлекаем данные
      const avatarUrl = data.response.photo;
      const subscribersCount = data.response.subscribers_count;

      // Обновляем данные в DOM
      document.getElementById('avatar').src = avatarUrl;
      document.getElementById('subscribers').textContent = subscribersCount;
    } else {
      console.error('Ошибка API:', data.message);
    }
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
  }
}

// Вызываем функцию загрузки данных
loadChannelData();