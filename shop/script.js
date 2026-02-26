// ==================== PRODUCTS ====================

const products = [
  {
    id: 1,
    name: "Premium Hrana za Pse",
    category: "hrana",
    price: 24.99,
    oldPrice: 29.99,
    image:
      "https://zoocentar.com/assets/photos/product/big/1751663480-premil-junior-piletina-puretina-i-riza-hrana-za-pse-2-kg.png?v1764943578",
    description: "Visokokvalitetna hrana bogata proteinima i mineralima",
    reviews: 248,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Mačja Igračka - Loptica",
    category: "igracke",
    price: 8.99,
    oldPrice: 12.99,
    image:
      "https://woolbuddy.com/cdn/shop/files/2_3d3d409d-0b28-45cc-93c5-e766f40003c7.jpg?v=1742789444&width=1080",
    description: "Interaktivna igračka sa zvukovima",
    reviews: 156,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Povodac sa Amortizerom",
    category: "pribor",
    price: 19.99,
    oldPrice: null,
    image:
      "https://w2.kibuba.com/productpics/20623_44425_mountain-paws-amortizer-povodac-za-pse_1600x1200-md.jpeg",
    description: "Ergonomski povodac za male i srednje pse",
    reviews: 89,
    rating: 4.3,
  },
  {
    id: 4,
    name: "Hrana za Mačke - Ribe",
    category: "hrana",
    price: 18.99,
    oldPrice: null,
    image:
      "https://www.ownat.com/cdnassets/ow-classic-fish-cat-saco-front_l.jpg",
    description: "Okusna hrana sa pravom ribom i mineralima",
    reviews: 312,
    rating: 4.7,
  },
  {
    id: 5,
    name: "Grickice za Pse - Piletina",
    category: "hrana",
    price: 12.99,
    oldPrice: 15.99,
    image:
      "https://www.hookseurope.com/pub_images/original/058059-00-00000_1.jpg",
    description: "Zdrave grickice sa piletinom",
    reviews: 201,
    rating: 4.6,
  },
  {
    id: 6,
    name: "SlipLeash povodac",
    category: "pribor",
    price: 16.99,
    oldPrice: null,
    image:
      "https://4knines.com/cdn/shop/files/4KninesBlackSlipLeash1K.jpg?v=1762554984",
    description: "Sigurna i udobna lesa za sve veličine",
    reviews: 134,
    rating: 4.4,
  },
  {
    id: 7,
    name: "Igračka za Pse - Konopac",
    category: "igracke",
    price: 9.99,
    oldPrice: 11.99,
    image:
      "https://i5.walmartimages.com/seo/Vibrant-Life-Rope-Dog-Toys-2-Knot-Rope-Dog-Toy_1f3870ae-f62c-46ac-abca-8726a3589f0a.bc71100f2cb2a3fb012f80f833968a4b.jpeg",
    description: "Mekana igračka sa čvorovima za vučenje",
    reviews: 178,
    rating: 4.5,
  },
  {
    id: 8,
    name: "Krevetić za pse",
    category: "pribor",
    price: 59.99,
    oldPrice: 79.99,
    image:
      "https://www.habitatpets.com.au/cdn/shop/products/Kazoo-Bilby-Large-Twilight-Blue-Dog-Bed_1400x.jpg?v=1743687492",
    description: "Meko i udobno leglo sa ortopedskom podlogom",
    reviews: 87,
    rating: 4.8,
  },
];

// ==================== GLOBAL VARIABLES ====================

let cart = [];
let filteredProducts = [...products];
let currentFilter = "all";

// ==================== DOM ELEMENTS ====================

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const cartIcon = document.getElementById("cartIcon");
const cartCount = document.getElementById("cartCount");
const productsGrid = document.getElementById("productsGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const contactForm = document.getElementById("contactForm");
const productModal = document.getElementById("productModal");
const modalClose = document.querySelector(".modal-close");
const notification = document.getElementById("notification");
const scrollToProductsBtn = document.getElementById("scrollToProducts");

// ==================== INITIALIZATION ====================

document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
  setupEventListeners();
  setupScrollAnimations();
  loadCart();
  setupCartFunctionality();
});

// ==================== HAMBURGER MENu ====================

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when "click" on the link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// ==================== PRODUCTS RENDER ====================

function renderProducts(productsToRender) {
  productsGrid.innerHTML = "";

  productsToRender.forEach((product) => {
    const productCard = createProductCard(product);
    productsGrid.appendChild(productCard);
  });
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card fade-in";
  card.style.animationDelay = `${product.id * 0.1}s`;

  const starsHTML = generateStars(product.rating);
  const oldPriceHTML = product.oldPrice
    ? `<span class="old-price">${product.oldPrice.toFixed(2)}KM</span>`
    : "";

  card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <span class="product-category">${capitalizeCategory(
              product.category,
            )}</span>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-rating">
                <div class="stars">${starsHTML}</div>
                <span>(${product.reviews})</span>
            </div>
            <div class="product-price">
                <span>${product.price.toFixed(2)}KM</span>
                ${oldPriceHTML}
            </div>
            <button class="btn btn-secondary btn-small product-button" data-id="${
              product.id
            }">
                <i class="fas fa-shopping-cart"></i> Dodaj u korpu
            </button>
        </div>
    `;

  // Open modal when clicking on card
  card.addEventListener("click", (e) => {
    if (
      !e.target.classList.contains("product-button") &&
      !e.target.closest(".product-button")
    ) {
      openProductModal(product);
    }
  });

  // add to cart
  const addBtn = card.querySelector(".product-button");
  addBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  });

  return card;
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let starsHTML = "";

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsHTML += '<span class="star"><i class="fas fa-star"></i></span>';
    } else if (i === fullStars && hasHalfStar) {
      starsHTML +=
        '<span class="star"><i class="fas fa-star-half-alt"></i></span>';
    } else {
      starsHTML += '<span class="star"><i class="far fa-star"></i></span>';
    }
  }

  return starsHTML;
}

function capitalizeCategory(category) {
  const categoryMap = {
    hrana: "Hrana",
    igracke: "Igračke",
    pribor: "Pribor",
  };
  return categoryMap[category] || category;
}

// ====================  PRODUCTS FILTER ====================

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    currentFilter = button.getAttribute("data-filter");
    filterProducts();
  });
});

function filterProducts() {
  if (currentFilter === "all") {
    filteredProducts = [...products];
  } else {
    filteredProducts = products.filter(
      (product) => product.category === currentFilter,
    );
  }
  renderProducts(filteredProducts);
}

// ==================== CART ====================

function addToCart(product, quantity = 1) {
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      ...product,
      quantity: quantity,
    });
  }

  saveCart();
  updateCartCount();
  showNotification(`${product.name} je dodan/a u korpu!`);
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCount();
  }
}

// ==================== MODAL FOR PRODUCTS DETAILS ====================

function openProductModal(product) {
  const starsHTML = generateStars(product.rating);
  const oldPriceHTML = product.oldPrice
    ? `<span id="modalOldPrice" class="old-price">${product.oldPrice.toFixed(
        2,
      )}KM</span>`
    : "";

  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalTitle").textContent = product.name;
  document.getElementById("modalCategory").textContent = capitalizeCategory(
    product.category,
  );
  document.getElementById("modalDescription").textContent = product.description;
  document.getElementById("modalRating").innerHTML = starsHTML;
  document.getElementById("modalReviews").textContent =
    `(${product.reviews} recenzija)`;
  document.getElementById("modalPrice").textContent = `${product.price.toFixed(
    2,
  )}KM`;

  const oldPriceElement = document.getElementById("modalOldPrice");
  if (product.oldPrice) {
    oldPriceElement.textContent = `${product.oldPrice.toFixed(2)}KM`;
    oldPriceElement.style.display = "inline";
  } else {
    oldPriceElement.style.display = "none";
  }

  document.getElementById("modalQuantity").value = 1;

  // Dodaj event na dugme u modalu
  const modalAddBtn = document.getElementById("modalAddToCart");
  modalAddBtn.onclick = () => {
    const quantity = parseInt(document.getElementById("modalQuantity").value);
    addToCart(product, quantity);
    closeProductModal();
  };

  productModal.classList.add("active");
}

function closeProductModal() {
  productModal.classList.remove("active");
}

modalClose.addEventListener("click", closeProductModal);

// Close modal
productModal.addEventListener("click", (e) => {
  if (e.target === productModal) {
    closeProductModal();
  }
});

// ==================== NOTIFICATION ====================

function showNotification(message, type = "success") {
  const notificationText = document.getElementById("notificationText");
  notificationText.textContent = message;
  notification.classList.remove("error");

  if (type === "error") {
    notification.classList.add("error");
  }

  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// ==================== CONTACT FORM ====================

function setupEventListeners() {
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  // Clear errors
  document.querySelectorAll(".error-message").forEach((error) => {
    error.classList.remove("show");
  });

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  // Validation
  let isValid = true;

  if (!name || name.length < 3) {
    showError("nameError", "Molimo unesite ime (najmanje 3 karaktera)");
    isValid = false;
  }

  if (!isValidEmail(email)) {
    showError("emailError", "Molimo unesite validan email");
    isValid = false;
  }

  if (!message || message.length < 10) {
    showError("messageError", "Molimo unesite poruku (najmanje 10 karaktera)");
    isValid = false;
  }

  if (isValid) {
    const formData = {
      name: name,
      email: email,
      phone: phone || "Nije uneseno",
      message: message,
      timestamp: new Date().toISOString(),
    };

    console.log("Podaci forme:", formData);

    showNotification(
      "Poruka je uspješno poslana! Hvala na kontaktu.",
      "success",
    );

    contactForm.reset();
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.classList.add("show");
}

// ==================== SCROLL ON PRODUCTS ====================

if (scrollToProductsBtn) {
  scrollToProductsBtn.addEventListener("click", () => {
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
  });
}

// ==================== SCROLL ANIMATION ====================

function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });
}

// ==================== NEWSLETTER FORM ====================

const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;

    if (isValidEmail(email)) {
      showNotification(
        "Hvala! Uspešno ste se prijavili na newsletter.",
        "success",
      );
      newsletterForm.reset();
    } else {
      showNotification("Molimo unesite validan email", "error");
    }
  });
}

// ==================== SMOOTH SCROLL LINKS ====================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// ==================== SETUP CART FUNCTIONALITY ====================

function setupCartFunctionality() {
  const cartModal = document.getElementById("cartModal");
  const cartModalClose = cartModal.querySelector(".modal-close");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const cartItems = document.getElementById("cartItems");
  const cartTotalItems = document.getElementById("cartTotalItems");
  const cartSubtotal = document.getElementById("cartSubtotal");
  const cartDiscount = document.getElementById("cartDiscount");
  const cartTotal = document.getElementById("cartTotal");
  const discountRow = document.getElementById("discountRow");
  const continueShopping = document.getElementById("continueShopping");
  const checkoutBtn = document.getElementById("checkout");

  function openCartModal() {
    cartModal.classList.add("active");
    updateCartDisplay();
  }

  function closeCartModal() {
    cartModal.classList.remove("active");
  }

  // Cart icon click listener
  cartIcon.addEventListener("click", () => {
    openCartModal();
  });

  // Close button click listener
  cartModalClose.addEventListener("click", closeCartModal);

  // Close modal when clicking outside
  cartModal.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      closeCartModal();
    }
  });

  function updateCartDisplay() {
    if (cart.length === 0) {
      cartEmpty.style.display = "flex";
      cartItemsContainer.style.display = "none";
    } else {
      cartEmpty.style.display = "none";
      cartItemsContainer.style.display = "flex";
      renderCartItems();
      updateCartSummary();
    }
  }

  function renderCartItems() {
    cartItems.innerHTML = "";

    cart.forEach((item) => {
      const cartItemElement = document.createElement("div");
      cartItemElement.className = "cart-item";
      cartItemElement.innerHTML = `
              <img src="${item.image}" alt="${item.name}" class="cart-item-image">
              <div class="cart-item-details">
                  <div class="cart-item-name">${item.name}</div>
                  <div class="cart-item-price">${(
                    item.price * item.quantity
                  ).toFixed(2)}KM</div>
                  <div class="cart-item-quantity">Količina: ${item.quantity}</div>
              </div>
              <div class="cart-item-actions">
                  <div class="quantity-control">
                      <button class="qty-decrease" data-id="${item.id}">-</button>
                      <span>${item.quantity}</span>
                      <button class="qty-increase" data-id="${item.id}">+</button>
                  </div>
                  <button class="cart-remove-btn" data-id="${
                    item.id
                  }">Ukloni</button>
              </div>
          `;

      cartItemElement
        .querySelector(".qty-increase")
        .addEventListener("click", () => {
          const cartItem = cart.find((p) => p.id === item.id);
          if (cartItem) {
            cartItem.quantity++;
            saveCart();
            updateCartDisplay();
          }
        });

      cartItemElement
        .querySelector(".qty-decrease")
        .addEventListener("click", () => {
          const cartItem = cart.find((p) => p.id === item.id);
          if (cartItem) {
            if (cartItem.quantity > 1) {
              cartItem.quantity--;
            } else {
              cart = cart.filter((p) => p.id !== item.id);
            }
            saveCart();
            updateCartDisplay();
            updateCartCount();
          }
        });

      cartItemElement
        .querySelector(".cart-remove-btn")
        .addEventListener("click", () => {
          cart = cart.filter((p) => p.id !== item.id);
          saveCart();
          updateCartDisplay();
          updateCartCount();
          showNotification("Proizvod je uklonjen iz korpe", "success");
        });

      cartItems.appendChild(cartItemElement);
    });
  }

  function updateCartSummary() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    //Discoun if price is over 100KM
    const discount = subtotal > 100 ? subtotal * 0.1 : 0;
    const total = subtotal - discount;

    cartTotalItems.textContent = totalItems;
    if (cartSubtotal) {
      cartSubtotal.textContent = subtotal.toFixed(2) + "KM";
    }
    cartDiscount.textContent = "-" + discount.toFixed(2) + "KM";
    cartTotal.textContent = total.toFixed(2) + "KM";

    if (discount > 0) {
      discountRow.style.display = "flex";
    } else {
      discountRow.style.display = "none";
    }
  }

  continueShopping.addEventListener("click", () => {
    closeCartModal();
  });

  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      showNotification("Vaša korpa je prazna", "error");
      return;
    }

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const discount = subtotal > 100 ? subtotal * 0.1 : 0;
    const total = subtotal - discount;

    const confirmMessage = `
Hvala na kupovini!

📦 Narudžba potvrđena

Stavki: ${totalItems}
Iznos: ${total.toFixed(2)}KM
${discount > 0 ? `Popust: -${discount.toFixed(2)}KM` : ""}

Narudžba će biti obrađena u roku od 2-3 radna dana.
Pratite vašu poštu za detalje o dostavi.
    `;

    alert(confirmMessage);

    // Clear cart
    cart = [];
    saveCart();
    updateCartCount();
    closeCartModal();
    showNotification(
      "Narudžbina je uspešno poslata! Hvala na kupovini.",
      "success",
    );
  });
}

// ==================== PRIKAZI INFORMATIVNU PORUKU ====================

console.log(
  "%cPetStar Shop - Frontend Aplikacija",
  "color: #FF6B9D; font-size: 16px; font-weight: bold;",
);
console.log(
  "%cKorpa je sačuvana u localStorage",
  "color: #87CEEB; font-size: 12px;",
);
console.log(
  `%cTrenutno ima ${products.length} proizvoda u ponudi`,
  "color: #2ECC71; font-size: 12px;",
);
