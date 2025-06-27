// Function to validate the product information
function validateProduct(product) {
    if (!product.id || !product.name || !product.price || product.name.trim() === "" 
    || isNaN(product.price) || product.price <= 0 || product.id < 0) return false;
    return true;
}

// Define the product's object
const products = {
    1: { id: 1, name: "Laptop", price: 1000 },
    2: { id: 2, name: "Smartphone", price: 500 },
    3: { id: 3, name: "Tablet", price: 300 },
    4: { id: 4, name: "Monitor", price: 200 },
    5: { id: 5, name: "Keyboard", price: 50 },
    6: { id: 6, name: "Mouse", price: 25 }
};

// Create a set with the name of the products
const setProducts = new Set()
for (const id in products) {
    if (validateProduct(products[id])) {
        setProducts.add(products[id].name);
    }
}

// Create a map to add categories to the products
const mapProducts = new Map();
mapProducts.set("Electronics", ["Laptop", "Smartphone", "Tablet", "Monitor"]);
mapProducts.set("Accessories", ["Keyboard", "Mouse"])


// Traverse the products object and print the name and price of each product

console.group("Product list")
for (const id in products) {
    if (validateProduct(products[id])) {
        console.log(`Product ID: ${id}, Name: ${products[id].name}, Price: $${products[id].price}`);
    } else {
        console.error(`Product with ID ${id} is invalid`);
    }
}
console.groupEnd()

// Traverse the set and print the name of each product
console.group("Unique Product Names")
for (const product of setProducts) {
    console.log(`Unique product Name: ${product}`);
}
console.groupEnd()

// Traverse the map and print the category and product name
console.group("Products by Category")
mapProducts.forEach((products, category) => {
    console.log(`Category: ${category} - Products: ${products.join(", ")}`);
})
console.groupEnd()

// Display the products in the HTML
const container = document.getElementById('productsContainer');

for (const id in products) {
    if (!validateProduct(products[id])) continue;

    let category = "None"
    for (const [categories, productNames] of mapProducts.entries()) {
        if (productNames.includes(products[id].name)) {
            category = categories
            break;
        }
    }

    const card = document.createElement('div');
    card.classList.add('products__card');
    card.innerHTML = `
        <h3 class="card__title">${products[id].name}</h3>
        <p class="card__price">Price: $${products[id].price}</p>
        <p class="card__category">Category: ${category}</p>
    `;
    container.appendChild(card);
}

