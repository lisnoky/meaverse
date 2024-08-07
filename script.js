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
