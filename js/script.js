const cardAddButton = document.querySelector('.cardAddButton');
const cardsContainer = document.querySelector('.cards-container');
const dialog = document.getElementById('myWindowOne');
const closeButton = document.getElementById('closeButton');
const addButton = document.getElementById('addButton');

function createCard(title, description, price, category) {

    const card = document.createElement('div');
    card.classList.add('card-box');

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card', 'title');
    cardTitle.textContent = title;

    const cardDescription = document.createElement('div');
    cardDescription.classList.add('card');
    cardDescription.textContent = description;

    const cardPrice = document.createElement('div');
    cardPrice.classList.add('card');
    cardPrice.textContent = "Цена: " + price;

    const cardCategory = document.createElement('div');
    cardCategory.classList.add('card');
    cardCategory.textContent = "Категория: " + category;

    card.appendChild(cardTitle);
    card.appendChild(cardDescription);
    card.appendChild(cardPrice);
    card.appendChild(cardCategory);

    cardsContainer.appendChild(card);

    return cardsContainer
}

cardAddButton.addEventListener('click', () => {
    dialog.showModal();
});

closeButton.addEventListener('click', () => {
    dialog.close();
});

function saveCard() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let price = document.getElementById('price').value;
    let category = document.getElementById('category').value;

    createCard(title, description, price, category);

    dialog.close();
    clearDialog();
}

addButton.addEventListener('click', saveCard);

function clearDialog() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
    document.getElementById('category').value = '';
}
