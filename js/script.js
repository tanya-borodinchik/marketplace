const cardAddButton = document.querySelector('.cardAddButton');
const cardsContainer = document.querySelector('.cards-container');
const dialog = document.getElementById('addCardDialog');
const closeButton = document.getElementById('closeButton');
const addButton = document.getElementById('addButton');
const dialogInputs = dialog.querySelectorAll('input, select');
const options = document.getElementById('options');
const selectedOption = document.getElementById('selected');
const priceInput = document.getElementById('price');
const filterSelected = document.getElementById('filterSelected');
const filterOptions = document.getElementById('filterOptions');
const searchInput = document.getElementById('searchInput');

let cardData = [];
const uuid = () => crypto.randomUUID();

const LOCALES = {
    all: "Все категории",
    delButton: "Удалить",
    noSelectedCategory: "Выберите категорию",
    electronics: "Электроника",
    clothes: "Одежда",
    appliances: "Бытовая техника",
    interior: "Дом и интерьер",
    sport: "Спорт и отдых"
};

selectedOption.textContent = LOCALES.noSelectedCategory;
selectedOption.dataset.value = "";

const categoryOptions = ["electronics", "clothes", "appliances", "interior", "sport"]

categoryOptions.forEach(key => {
    const option = document.createElement('li');
    option.value = key;
    option.textContent = LOCALES[key];

    options.appendChild(option);

    option.addEventListener('click', () => {
        selectedOption.textContent = LOCALES[key];
        selectedOption.dataset.value = key;

        selectedOption.classList.add('active');

        options.classList.remove('open');

        checkInputs();
    });
});

selectedOption.addEventListener('click', () => {
    options.classList.toggle('open');
});

updateCards();
renderCards(cardData);

function createCard(data) {

    const card = document.createElement('div');
    card.classList.add('card-box');

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card', 'title');
    cardTitle.textContent = data.title;

    const cardDescription = document.createElement('div');
    cardDescription.classList.add('card');
    cardDescription.textContent = data.description;

    const cardPrice = document.createElement('div');
    cardPrice.classList.add('card');
    cardPrice.textContent = "Цена: " + data.price;

    const cardCategory = document.createElement('div');
    cardCategory.classList.add('card');
    cardCategory.textContent = "Категория: " + LOCALES[data.category];

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('del-button');
    deleteButton.textContent = LOCALES["delButton"];
    deleteButton.addEventListener('click', () => deleteCard(card.id));

    card.appendChild(cardTitle);
    card.appendChild(cardDescription);
    card.appendChild(cardPrice);
    card.appendChild(cardCategory);
    card.appendChild(deleteButton);

    cardsContainer.appendChild(card);
    card.setAttribute('id', data.id)

    return cardsContainer
}

cardAddButton.addEventListener('click', () => {
    dialog.showModal();
    addButton.disabled = true;
});

closeButton.addEventListener('click', () => {
    dialog.close();
    clearDialog();
});

function saveCard() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let price = priceInput.value;
    let category = selectedOption.dataset.value;

    const data = {
        id: uuid(),
        title,
        description,
        price,
        category
    };

    cardData.push(data);

    renderCards(cardData)
    dialog.close();
    clearDialog();
    saveCardsToLocalStorage();
}

addButton.addEventListener('click', saveCard);

function clearDialog() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    priceInput.value = '';
    document.getElementById('category').value = '';

    selectedOption.textContent = LOCALES.noSelectedCategory;
    selectedOption.dataset.value = "";
    selectedOption.classList.remove('active');
}

function saveCardsToLocalStorage() {
    localStorage.setItem('cards', JSON.stringify(cardData));
}

function updateCards() {
    const saved = localStorage.getItem('cards');
    if (saved) {
        try {
            cardData = JSON.parse(saved);
        } catch { }
    }
}

function renderCards(renderData) {
    removeAllCards();

    renderData.forEach(element => {
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
});

priceInput.addEventListener('input', () => {
    let current = priceInput.value;

    if (current === "") return

    if (current < 1) {
        priceInput.value = 1;
    }
});

function checkInputs() {
    const emptyInput = Array.from(dialogInputs).find(element => !element.value);
    const emptySelect = !selectedOption.dataset.value;
    addButton.disabled = Boolean(emptyInput || emptySelect);
}

document.getElementById('sortPrice').addEventListener('click', () => {
    filters.sortPrice = !filters.sortPrice;

    addFilter();
});

const filterCategory = ["all", ...categoryOptions];

filterCategory.forEach(key => {
    const filterOption = document.createElement('li');
    filterOption.value = key;
    filterOption.textContent = LOCALES[key];

    filterOptions.appendChild(filterOption);

    filterOption.addEventListener('click', () => {
        filterSelected.textContent = LOCALES[key];
        filters.category = key;

        addFilter();
    });
});

document.getElementById('filterSelect').addEventListener('click', () => {
    filterOptions.classList.toggle('open');
});

function deleteCard(id) {
    cardData = cardData.filter(el => el.id !== id);

    saveCardsToLocalStorage();
    renderCards(cardData);
}

searchInput.addEventListener('input', searchFunction);

function searchFunction() {
    filters.search = searchInput.value;

    addFilter();
}

const filters = {
    category: filterCategory[0],
    search: "",
    sortPrice: false
}

function addFilter() {
    let filterData = cardData;

    if (filters.category !== "all") {
        filterData = filterData.filter(el => el.category === filters.category);
    }

    filters.search = searchInput.value;
    if (filters.search !== "") {
        filterData = filterData.filter(el => el.title.includes(filters.search) || el.description.includes(filters.search));
    }

    filterData = filterData.toSorted((a, b) => {
        if (filters.sortPrice) {
            return a.price - b.price;
        }
        return b.price - a.price;
    });

    renderCards(filterData);
}

document.addEventListener('DOMContentLoaded', () => {
    updateCards();
    renderCards(cardData);

    searchInput.addEventListener('input', searchFunction);

    document.getElementById('filterSelect').addEventListener('click', () => {
        filterOptions.classList.toggle('open');
    });

    addButton.addEventListener('click', saveCard);

    cardAddButton.addEventListener('click', () => {
        dialog.showModal();
        addButton.disabled = true;
    });

    closeButton.addEventListener('click', () => {
        dialog.close();
        clearDialog();
    });

    addCategory();

    selectedOption.addEventListener('click', () => {
        options.classList.toggle('open');
    });

    addFilterCategory();
});

function addCategory() {
    categoryOptions.forEach(key => {
        const option = document.createElement('li');
        option.value = key;
        option.textContent = LOCALES[key];

        options.appendChild(option);

        option.addEventListener('click', () => {
            selectedOption.textContent = LOCALES[key];
            selectedOption.dataset.value = key;

            selectedOption.classList.add('active');

            options.classList.remove('open');

            checkInputs();
        });
    });
};

function addFilterCategory() {
    filterCategory.forEach(key => {
        const filterOption = document.createElement('li');
        filterOption.value = key;
        filterOption.textContent = LOCALES[key];

        filterOptions.appendChild(filterOption);

        filterOption.addEventListener('click', () => {
            filterSelected.textContent = LOCALES[key];
            filters.category = key;

            addFilter();
        });
    });
};