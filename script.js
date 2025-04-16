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
const container = document.getElementById('product-list');

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