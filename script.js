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

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const startParam = urlParams.get('startapp');

if (startParam) {
    if (startParam === 'meaverse') {
        // Код для открытия нужной вам страницы, например:
        window.location.href = 'meaverse.html';
    }
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

const token = '6876430771:AAHhcpK9CwluRfg6_BFWpaKxaIhytGETFpo';
const RVNGuser = 'reevnge';

function httpRequest(URL, Method) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open(Method, URL, false);
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
}

function getChatDetails() {
    return httpRequest('https://api.telegram.org/bot${6876430771:AAHhcpK9CwluRfg6_BFWpaKxaIhytGETFpo}/getChat?chat_id=${-1001918197812}', 'GET');
}

var chatObj = getChatDetails()['result'];
console.log(chatObj);
    
function getMemberCount() {
    return httpRequest('https://api.telegram.org/bot${6876430771:AAHhcpK9CwluRfg6_BFWpaKxaIhytGETFpo}/getChatMembersCount?chat_id=${-1001918197812}', 'GET');
}
    
var members = getMemberCount()['result'];
console.log(members);

let membercount = data.response.MemberCount

document.getElementById('telegram-info').textContent = membercount