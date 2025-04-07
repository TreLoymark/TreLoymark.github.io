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

const productList = document.getElementById("product-list");
const categoryFilter = document.getElementById("category-filter");
const priceSort = document.getElementById("price-sort");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");
const modalDescription = document.getElementById("modal-description");
const closeModal = document.getElementById("close-modal");

let filteredProducts = [...products];

function populateCategories() {
  const categories = [...new Set(products.map(p => p.category))];
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categoryFilter.appendChild(opt);
  });
}

function renderProducts(data) {
  productList.innerHTML = "";
  data.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = \`
      <h3>\${p.name}</h3>
      <p>\$ \${p.price.toFixed(2)}</p>
    \`;
    div.addEventListener("click", () => showModal(p));
    productList.appendChild(div);
  });
}

function applyFilters() {
  const category = categoryFilter.value;
  let data = [...products];

  if (category !== "all") {
    data = data.filter(p => p.category === category);
  }

  if (priceSort.value === "low-high") {
    data.sort((a, b) => a.price - b.price);
  } else {
    data.sort((a, b) => b.price - a.price);
  }

  filteredProducts = data;
  renderProducts(data);
}

function showModal(product) {
  modalTitle.textContent = product.name;
  modalPrice.textContent = "$ " + product.price.toFixed(2);
  modalDescription.textContent = product.description;
  modal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", e => {
  if (e.target === modal) modal.classList.add("hidden");
});

categoryFilter.addEventListener("change", applyFilters);
priceSort.addEventListener("change", applyFilters);

populateCategories();
applyFilters();
