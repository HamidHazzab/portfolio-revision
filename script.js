// ===========================
// SÉLECTION DES ÉLÉMENTS DOM
// ===========================
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;

// ===========================
// DARK MODE - LOCALSTORAGE
// ===========================
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
}

// Toggle dark/light mode au clic
darkModeToggle.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    if (isDark) {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// ===========================
// FONCTIONS UTILITAIRES
// ===========================
function showMessage(text, color, duration = 3000) {
    formMessage.textContent = text;
    formMessage.style.color = color;
    formMessage.style.opacity = 1;

    setTimeout(() => {
        formMessage.style.opacity = 0;
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.style.opacity = 1;
        }, 500);
    }, duration);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===========================
// FORMULAIRE
// ===========================
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
        showMessage("Tous les champs sont obligatoires.", "red");
        return;
    }

    if (!isValidEmail(email)) {
        showMessage("Merci d’entrer un email valide.", "red");
        return;
    }

    showMessage("Merci ! Votre message a été envoyé.", "green");
    form.reset();
});
