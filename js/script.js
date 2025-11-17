const addButton = document.querySelector('.addButton');
const cardsContainer = document.querySelector('.cards-container');

function createCard() {

    const card = document.createElement('div');
    card.classList.add('card-box');

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card', 'title');

    const cardDescription = document.createElement('div');
    cardDescription.classList.add('card');

    const cardPrice = document.createElement('div');
    cardPrice.classList.add('card')

    const cardCategory = document.createElement('div');
    cardCategory.classList.add('card');

    card.appendChild(cardTitle);
    card.appendChild(cardDescription);
    card.appendChild(cardPrice);
    card.appendChild(cardCategory);

    cardsContainer.appendChild(card);

    return cardsContainer
}

addButton.addEventListener('click', createCard);
