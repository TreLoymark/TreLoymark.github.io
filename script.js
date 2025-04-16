const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 25.99,
    category: "Electronics",
    description: "A reliable wireless mouse with ergonomic design."
  },
  {
    id: 2,
    name: "Coffee Mug",
    price: 9.99,
    category: "Home",
    description: "A ceramic mug for your favorite drinks."
  },
  {
    id: 3,
    name: "Notebook",
    price: 4.99,
    category: "Stationery",
    description: "80-page spiral notebook for notes or journaling."
  }
];

const storage = {
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  get: (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return localStorage.getItem(key);
    }
  }
};

const container = document.getElementById('product-list');
const categorySelect = document.getElementById('categoryFilter');

// Fill select with the categories
const categories = [...new Set(products.map(product => product.category))];
categories.forEach(category => {
  const option = document.createElement('option');
  option.value = category;
  option.textContent = category;
  categorySelect.appendChild(option);
});

// Render the products in the DOM
products.forEach(product => {
  const productCard = document.createElement('div');
  productCard.innerHTML = `
    <h2>${product.name}</h2>
    <p><strong>Precio:</strong> $${product.price}</p>
    <p><strong>Categoría:</strong> ${product.category}</p>
    <p>${product.description}</p>
  `;
  container.appendChild(productCard);
});

// Filter by category
categorySelect.addEventListener('change', (e) => {
  const selectedCategory = e.target.value;
  storage.set('selectedCategory', selectedCategory);

  document.querySelectorAll('#product-list > div').forEach(card => {
    const category = card.querySelector('p:nth-of-type(2)').textContent.split(': ')[1];
    card.style.display =
      selectedCategory === 'all' || category === selectedCategory ? 'block' : 'none';
  });
});

// aply local storage
const savedCategory = storage.get('selectedCategory') || 'all';
categorySelect.value = savedCategory;
categorySelect.dispatchEvent(new Event('change'));
