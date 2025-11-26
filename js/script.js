const cardAddButton = document.querySelector('.cardAddButton');
const cardsContainer = document.querySelector('.cards-container');
const dialog = document.getElementById('addCardDialog');
const closeButton = document.getElementById('closeButton');
const addButton = document.getElementById('addButton');
const select = document.getElementById('category');
const dialogInputs = document.querySelectorAll('input, select');

let cardText = [];
const uuid = () => crypto.randomUUID();

const categories = {
    "Элeтроника": "Электроника",
    "Одежда": "Одежда",
    "Бытовая техника": "Бытовая техника",
    "Дом и интерьер": "Дом и интерьер",
    "Спорт и отдых": "Спорт и отдых"
};

Object.entries(categories).forEach(([key, value]) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = key;
    select.appendChild(option);
});

updateCards();
renderCards();

function createCard(text) {

    const card = document.createElement('div');
    card.classList.add('card-box');

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card', 'title');
    cardTitle.textContent = text.title;

    const cardDescription = document.createElement('div');
    cardDescription.classList.add('card');
    cardDescription.textContent = text.description;

    const cardPrice = document.createElement('div');
    cardPrice.classList.add('card');
    cardPrice.textContent = "Цена: " + text.price;

    const cardCategory = document.createElement('div');
    cardCategory.classList.add('card');
    cardCategory.textContent = "Категория: " + text.category;

    card.appendChild(cardTitle);
    card.appendChild(cardDescription);
    card.appendChild(cardPrice);
    card.appendChild(cardCategory);

    cardsContainer.appendChild(card);
    card.setAttribute('id', text.id)

    return cardsContainer
}

cardAddButton.addEventListener('click', () => {
    dialog.showModal();
    addButton.disabled = true;
});

closeButton.addEventListener('click', () => {
    dialog.close();
});

function saveCard() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let price = document.getElementById('price').value;
    let category = document.getElementById('category').value;

    const text = {
        id: uuid(),
        title,
        description,
        price,
        category
    };

    cardText.push(text);

    renderCards()
    dialog.close();
    clearDialog();
    saveCardsToLocalStorage();
}

addButton.addEventListener('click', saveCard);

function clearDialog() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
    document.getElementById('category').value = '';
}

function saveCardsToLocalStorage() {
    localStorage.setItem('cards', JSON.stringify(cardText));
}

function updateCards() {
    const saved = localStorage.getItem('cards');
    if (saved) {
        try {
            cardText = JSON.parse(saved);
        } catch { }
    }
}

function renderCards() {
    removeAllCards();

    cardText.forEach(element => {
        createCard(element);
    });

}

function removeAllCards() {
    Array.from(cardsContainer.childNodes).forEach(element => {
        cardsContainer.removeChild(element);
    });
}

dialogInputs.forEach(element => {
    element.addEventListener('input', checkInputs)
    element.addEventListener('change', checkInputs)
})

function checkInputs() {
   addButton.disabled = Boolean(Array.from(dialogInputs).find(element => !element.value));
}