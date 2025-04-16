const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 25.99,
    category: "Electronics",
    description: "A reliable wireless mouse with ergonomic design.",
  },
  {
    id: 2,
    name: "Coffee Mug",
    price: 9.99,
    category: "Home",
    description: "A ceramic mug for your favorite drinks.",
  },
  {
    id: 3,
    name: "Notebook",
    price: 4.99,
    category: "Stationery",
    description: "80-page spiral notebook for notes or journaling.",
  },
];

const storage = {
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  get: (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return localStorage.getItem(key);
    }
  },
};
// Constants
const getProductHTML = (product, withButton = false) => `
  <h2>${product.name}</h2>
  <p><strong>Price:</strong> $${product.price}</p>
  <p><strong>Category:</strong> ${product.category}</p>
  <p>${product.description}</p>
  ${
    withButton
      ? `<button class="add-to-cart" data-id="${product.id}">Agregar al carrito</button>`
      : ""
  }
`;

const container = document.getElementById("product-list");
const categorySelect = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("priceSort");
const modal = document.getElementById("productModal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");
const cartDisplay = document.getElementById("cart-count");

// Fill select with the categories
const categories = [...new Set(products.map((product) => product.category))];

categories.forEach((category) => {
  const option = document.createElement("option");
  option.value = category;
  option.textContent = category;
  categorySelect.appendChild(option);
});

// Render the products in the DOM
const renderProducts = (list) => {
  container.innerHTML = "";
  list.forEach((product) => {
    const card = document.createElement("div");
    card.innerHTML = getProductHTML(product, true);

    card.addEventListener("click", (e) => {
      if (!e.target.classList.contains("add-to-cart")) {
        openModal(product);
      }
    });

    const addBtn = card.querySelector(".add-to-cart");
    let cartCount = storage.get("cartCount") || 0;
    cartDisplay.textContent = `🛒 ${cartCount}`;
    addBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      cartCount++;
      storage.set("cartCount", cartCount);
      cartDisplay.textContent = `🛒 ${cartCount}`;
    });

    container.appendChild(card);
  });
};

const openModal = (product) => {
  modalBody.innerHTML = getProductHTML(product, false);
  modal.classList.remove("hidden");
};

const closeModal = () => modal.classList.add("hidden");

modalClose.onclick = closeModal;
window.onclick = (e) => e.target === modal && closeModal();
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

const applyFilterAndSort = () => {
  const selectedCategory = categorySelect.value;
  const selectedSort = sortSelect.value;

  storage.set("selectedCategory", selectedCategory);
  storage.set("selectedSort", selectedSort);

  let result =
    selectedCategory === "all"
      ? [...products]
      : products.filter((p) => p.category === selectedCategory);

  if (selectedSort === "asc") result.sort((a, b) => a.price - b.price);
  if (selectedSort === "desc") result.sort((a, b) => b.price - a.price);

  renderProducts(result);
};

categorySelect.addEventListener("change", applyFilterAndSort);
sortSelect.addEventListener("change", applyFilterAndSort);

// aply local storage
categorySelect.value = storage.get("selectedCategory") || "all";
sortSelect.value = storage.get("selectedSort") || "none";
applyFilterAndSort();
