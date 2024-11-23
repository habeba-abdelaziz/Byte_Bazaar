// Initialize shopping basket from localStorage
let shoppingBasket = JSON.parse(localStorage.getItem('shoppingBasket')) || [];

// Function to add item to basket
function addToBasket(name, price, image) {
    const existingItem = shoppingBasket.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        shoppingBasket.push({ name, price, image, quantity: 1 });
    }

    saveBasketAndUpdateTotal();
    alert(`${name} has been added to your shopping cart!`);
}

// Function to display items in the basket
function displayBasket() {
    const basketItems = document.getElementById('basket-items');
    const totalPriceElem = document.getElementById('total-price');
    const totalProductsElem = document.getElementById('total-products');

    if (!basketItems) return;

    basketItems.innerHTML = '';  // Clear previous items
    let totalPrice = 0;

    shoppingBasket.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('basket-item');
        listItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50px">
            <span>${item.name}</span>
            <span>${item.price} L.E</span>
            <span>Quantity: ${item.quantity}</span>
            <button onclick="increaseQuantity(${index})">+</button>
            <button onclick="decreaseQuantity(${index})">-</button>
            <button onclick="removeItem(${index})">Remove</button>
        `;
        basketItems.appendChild(listItem);
        totalPrice += item.price * item.quantity;
    });

    totalProductsElem.textContent = `\$${totalPrice}`;
    const finalTotal = totalPrice + 10; // Shipping cost
    totalPriceElem.textContent = `\$${finalTotal}`;
    
    // Store total in localStorage for checkout page
    localStorage.setItem('cartTotal', finalTotal.toFixed(2));
}

// Function to save the basket and update total
function saveBasketAndUpdateTotal() {
    localStorage.setItem('shoppingBasket', JSON.stringify(shoppingBasket));
    displayBasket();
}

// Function to increase quantity of an item in the basket
function increaseQuantity(index) {
    shoppingBasket[index].quantity += 1;
    saveBasketAndUpdateTotal();
}

// Function to decrease quantity of an item in the basket
function decreaseQuantity(index) {
    if (shoppingBasket[index].quantity > 1) {
        shoppingBasket[index].quantity -= 1;
    } else {
        removeItem(index);
    }
    saveBasketAndUpdateTotal();
}

// Function to remove an item from the basket
function removeItem(index) {
    shoppingBasket.splice(index, 1);
    saveBasketAndUpdateTotal();
}

// Display the basket when the page loads
document.addEventListener('DOMContentLoaded', displayBasket);
