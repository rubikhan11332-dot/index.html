// ===============================
// PAKBUY WEBSITE - JAVASCRIPT
// ===============================

// اپنا WhatsApp نمبر یہاں لکھیں
// مثال: 923001234567
const WHATSAPP_NUMBER = "923001234567";


// ===============================
// PRODUCTS
// ===============================

const products = [
  {
    id: 1,
    name: "Glow Face Serum",
    category: "Beauty",
    price: 1299,
    oldPrice: 1699,
    stock: true,
    image: "https://placehold.co/600x600/f3e8ee/222?text=Glow+Serum"
  },
  {
    id: 2,
    name: "Fitness Resistance Band",
    category: "Fitness",
    price: 899,
    oldPrice: 1199,
    stock: true,
    image: "https://placehold.co/600x600/e8eef7/222?text=Fitness+Band"
  },
  {
    id: 3,
    name: "Kitchen Storage Set",
    category: "Household",
    price: 1599,
    oldPrice: 1999,
    stock: true,
    image: "https://placehold.co/600x600/edf4e8/222?text=Storage+Set"
  },
  {
    id: 4,
    name: "Daily Wellness Bottle",
    category: "Health",
    price: 1099,
    oldPrice: 1399,
    stock: true,
    image: "https://placehold.co/600x600/e8f3f4/222?text=Wellness+Bottle"
  },
  {
    id: 5,
    name: "Travel Organizer Bag",
    category: "Lifestyle",
    price: 1399,
    oldPrice: 1799,
    stock: true,
    image: "https://placehold.co/600x600/f4efe7/222?text=Organizer+Bag"
  },
  {
    id: 6,
    name: "Body Care Brush",
    category: "Beauty",
    price: 699,
    oldPrice: 899,
    stock: true,
    image: "https://placehold.co/600x600/f6e9e9/222?text=Body+Brush"
  },
  {
    id: 7,
    name: "Posture Support Belt",
    category: "Fitness",
    price: 1799,
    oldPrice: 2299,
    stock: true,
    image: "https://placehold.co/600x600/e9eef5/222?text=Posture+Belt"
  },
  {
    id: 8,
    name: "Multi-Purpose Cleaning Tool",
    category: "Household",
    price: 799,
    oldPrice: 999,
    stock: true,
    image: "https://placehold.co/600x600/edf2f7/222?text=Cleaning+Tool"
  }
];


// ===============================
// BLOG POSTS
// ===============================

const blogs = [
  {
    title: "How to Choose Useful Fitness Products",
    category: "Fitness",
    text: "A simple guide to checking size, material, comfort and usefulness before buying fitness accessories.",
    image: "https://placehold.co/900x500/e8eef7/222?text=Fitness+Guide"
  },
  {
    title: "Beauty Products: What to Check Before Buying",
    category: "Beauty",
    text: "Check ingredients, usage instructions and product information before making a purchase.",
    image: "https://placehold.co/900x500/f3e8ee/222?text=Beauty+Guide"
  },
  {
    title: "Smart Household Shopping Guide",
    category: "Household",
    text: "Choose household products based on durability, usefulness and value.",
    image: "https://placehold.co/900x500/edf4e8/222?text=Home+Guide"
  }
];


// ===============================
// CART
// ===============================

let cart = JSON.parse(
  localStorage.getItem("pakbuyCart") || "[]"
);


// ===============================
// MONEY FORMAT
// ===============================

function money(amount) {
  return "PKR " + Number(amount).toLocaleString("en-PK");
}


// ===============================
// SAVE CART
// ===============================

function saveCart() {
  localStorage.setItem(
    "pakbuyCart",
    JSON.stringify(cart)
  );

  renderCart();
  renderCheckout();
  updateCartCount();
}


// ===============================
// CART COUNT
// ===============================

function updateCartCount() {

  const countElement =
    document.getElementById("cart-count");

  if (!countElement) return;

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  countElement.textContent = totalItems;
}


// ===============================
// TOAST MESSAGE
// ===============================

function showToast(message) {

  const toast =
    document.getElementById("toast");

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}


// ===============================
// ADD TO CART
// ===============================

function addToCart(productId) {

  const product =
    products.find(p => p.id === productId);

  if (!product) return;

  const existing =
    cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: productId,
      quantity: 1
    });
  }

  saveCart();

  showToast(
    product.name + " added to cart."
  );
}


// ===============================
// CHANGE QUANTITY
// ===============================

function changeQuantity(productId, change) {

  const item =
    cart.find(item => item.id === productId);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {

    cart = cart.filter(
      item => item.id !== productId
    );

  }

  saveCart();
}


// ===============================
// REMOVE PRODUCT
// ===============================

function removeFromCart(productId) {

  cart = cart.filter(
    item => item.id !== productId
  );

  saveCart();

  showToast("Product removed from cart.");
}


// ===============================
// CATEGORY SECTION
// ===============================

function renderCategories() {

  const categoryGrid =
    document.getElementById("category-grid");

  if (!categoryGrid) return;

  const categories = [
    {
      name: "Beauty",
      icon: "✨"
    },
    {
      name: "Health",
      icon: "❤️"
    },
    {
      name: "Fitness",
      icon: "💪"
    },
    {
      name: "Lifestyle",
      icon: "🌿"
    },
    {
      name: "Household",
      icon: "🏠"
    }
  ];

  categoryGrid.innerHTML =
    categories.map(category => `

      <button
        class="category-card"
        onclick="selectCategory('${category.name}')"
      >

        <span class="category-icon">
          ${category.icon}
        </span>

        <span>
          ${category.name}
        </span>

      </button>

    `).join("");
}


// ===============================
// SELECT CATEGORY
// ===============================

function selectCategory(category) {

  const filter =
    document.getElementById("category-filter");

  if (filter) {

    filter.value = category;

    renderProducts();

  }

  location.hash = "shop";
}


// ===============================
// PRODUCTS
// ===============================

function renderProducts() {

  const productGrid =
    document.getElementById("product-grid");

  if (!productGrid) return;

  const search =
    document.getElementById("search");

  const categoryFilter =
    document.getElementById("category-filter");

  const sort =
    document.getElementById("sort");

  const searchText =
    search ? search.value.toLowerCase().trim() : "";

  const selectedCategory =
    categoryFilter ? categoryFilter.value : "all";

  const sortValue =
    sort ? sort.value : "default";


  let filteredProducts =
    products.filter(product => {

      const matchesSearch =
        (
          product.name +
          " " +
          product.category
        )
        .toLowerCase()
        .includes(searchText);

      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );

    });


  // Sort by price

  if (sortValue === "low") {

    filteredProducts.sort(
      (a, b) => a.price - b.price
    );

  }

  if (sortValue === "high") {

    filteredProducts.sort(
      (a, b) => b.price - a.price
    );

  }


  const noProducts =
    document.getElementById("no-products");

  if (noProducts) {

    noProducts.style.display =
      filteredProducts.length
        ? "none"
        : "block";

  }


  productGrid.innerHTML =
    filteredProducts.map(product => {

      const discount =
        Math.round(
          (1 - product.price / product.oldPrice) * 100
        );

      return `

        <article class="product-card">

          <div class="product-image-wrapper">

            <span class="discount-badge">
              ${discount}% OFF
            </span>

            <img
              class="product-image"
              src="${product.image}"
              alt="${product.name}"
            >

          </div>


          <div class="product-info">

            <span class="product-category">
              ${product.category}
            </span>

            <h3 class="product-title">
              ${product.name}
            </h3>


            <div class="product-price">

              ${money(product.price)}

              <span class="old-price">
                ${money(product.oldPrice)}
              </span>

            </div>


            <div class="stock">

              ${product.stock
                ? "✓ In Stock"
                : "✕ Out of Stock"}

            </div>


            <div class="product-buttons">

              <button
                class="btn"
                onclick="addToCart(${product.id})"
              >
                Add to Cart
              </button>


              <button
                class="btn secondary"
                onclick="
                  addToCart(${product.id});
                  location.hash='cart';
                "
              >
                Buy Now
              </button>

            </div>

          </div>

        </article>

      `;

    }).join("");
}


// ===============================
// BLOG
// ===============================

function renderBlogs() {

  const blogGrid =
    document.getElementById("blog-grid");

  if (!blogGrid) return;


  blogGrid.innerHTML =
    blogs.map(blog => `

      <article class="blog-card">

        <img
          class="blog-image"
          src="${blog.image}"
          alt="${blog.title}"
        >


        <div class="blog-content">

          <span class="blog-category">
            ${blog.category}
          </span>

          <h3>
            ${blog.title}
          </h3>

          <p>
            ${blog.text}
          </p>

          <a
            href="#shop"
            class="read-more"
          >
            Related Products →
          </a>

        </div>

      </article>

    `).join("");
}


// ===============================
// CART TOTAL
// ===============================

function getCartTotal() {

  return cart.reduce(
    (total, item) => {

      const product =
        products.find(
          p => p.id === item.id
        );

      if (!product) return total;

      return total +
        product.price * item.quantity;

    },
    0
  );
}


// ===============================
// RENDER CART
// ===============================

function renderCart() {

  const cartItems =
    document.getElementById("cart-items");

  const cartTotal =
    document.getElementById("cart-total");

  if (!cartItems) return;


  if (cart.length === 0) {

    cartItems.innerHTML = `
      <div class="empty-cart">
        <h3>Your cart is empty</h3>
        <p>Add some products to your cart.</p>
        <a href="#shop" class="btn">
          Start Shopping
        </a>
      </div>
    `;

    if (cartTotal) {
      cartTotal.textContent = money(0);
    }

    return;
  }


  cartItems.innerHTML =
    cart.map(item => {

      const product =
        products.find(
          p => p.id === item.id
        );

      if (!product) return "";


      return `

        <div class="cart-item">

          <img
            class="cart-item-image"
            src="${product.image}"
            alt="${product.name}"
          >


          <div>

            <h3 class="cart-item-name">
              ${product.name}
            </h3>

            <p class="cart-item-price">
              ${money(product.price)}
            </p>


            <div class="quantity-control">

              <button
                onclick="changeQuantity(${product.id}, -1)"
              >
                −
              </button>

              <span>
                ${item.quantity}
              </span>

              <button
                onclick="changeQuantity(${product.id}, 1)"
              >
                +
              </button>

            </div>

          </div>


          <strong>
            ${money(
              product.price *
              item.quantity
            )}
          </strong>


          <button
            class="remove-btn"
            onclick="removeFromCart(${product.id})"
          >
            Remove
          </button>

        </div>

      `;

    }).join("");


  if (cartTotal) {

    cartTotal.textContent =
      money(getCartTotal());

  }
}


// ===============================
// CHECKOUT SUMMARY
// ===============================

function renderCheckout() {

  const summary =
    document.getElementById(
      "checkout-summary"
    );

  if (!summary) return;


  if (cart.length === 0) {

    summary.innerHTML = `
      <h3>Order Summary</h3>
      <p>Your cart is empty.</p>
    `;

    return;
  }


  let html =
    "<h3>Order Summary</h3>";


  cart.forEach(item => {

    const product =
      products.find(
        p => p.id === item.id
      );

    if (!product) return;


    html += `

      <div class="summary-row">

        <span>
          ${product.name} × ${item.quantity}
        </span>

        <strong>
          ${money(
            product.price *
            item.quantity
          )}
        </strong>

      </div>

    `;

  });


  html += `

    <div class="summary-row summary-total">

      <span>
        Total
      </span>

      <strong>
        ${money(getCartTotal())}
      </strong>

    </div>

  `;


  summary.innerHTML = html;
}


// ===============================
// WHATSAPP
// ===============================

function createWhatsAppLink(message) {

  return (
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message)
  );

}


// ===============================
// CHECKOUT FORM
// ===============================

const checkoutForm =
  document.getElementById(
    "checkout-form"
  );


if (checkoutForm) {

  checkoutForm.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();


      if (cart.length === 0) {

        showToast(
          "Please add a product first."
        );

        return;
      }


      const name =
        document.getElementById(
          "customer-name"
        ).value.trim();


      const phone =
        document.getElementById(
          "customer-phone"
        ).value.trim();


      const email =
        document.getElementById(
          "customer-email"
        ).value.trim();


      const city =
        document.getElementById(
          "customer-city"
        ).value.trim();


      const address =
        document.getElementById(
          "customer-address"
        ).value.trim();


      const payment =
        document.getElementById(
          "payment-method"
        ).value;


      let productsText = "";


      cart.forEach(item => {

        const product =
          products.find(
            p => p.id === item.id
          );

        if (!product) return;


        productsText +=
          `${product.name} x ${item.quantity} = ${money(
            product.price * item.quantity
          )}\n`;

      });


      const message =

`New PakBuy Order

Name: ${name}

Phone: ${phone}

Email: ${email || "Not provided"}

City: ${city}

Address: ${address}

Payment: ${payment}

Products:

${productsText}

Total: ${money(getCartTotal())}`;


      window.open(
        createWhatsAppLink(message),
        "_blank"
      );

    }
  );

}


// ===============================
// CONTACT FORM
// ===============================

const contactForm =
  document.getElementById(
    "contact-form"
  );


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();

      showToast(
        "Thank you! Your message has been received."
      );

      contactForm.reset();

    }
  );

}


// ===============================
// SEARCH
// ===============================

const searchInput =
  document.getElementById("search");


if (searchInput) {

  searchInput.addEventListener(
    "input",
    renderProducts
  );

}


// ===============================
// CATEGORY FILTER
// ===============================

const categoryFilter =
  document.getElementById(
    "category-filter"
  );


if (categoryFilter) {

  categoryFilter.addEventListener(
    "change",
    renderProducts
  );

}


// ===============================
// SORT
// ===============================

const sortSelect =
  document.getElementById("sort");


if (sortSelect) {

  sortSelect.addEventListener(
    "change",
    renderProducts
  );

}


// ===============================
// MOBILE MENU
// ===============================

const menuButton =
  document.getElementById("menu-btn");

const navigation =
  document.getElementById("nav");


if (menuButton && navigation) {

  menuButton.addEventListener(
    "click",
    function() {

      navigation.classList.toggle(
        "open"
      );

    }
  );

}


// ===============================
// WHATSAPP BUTTON
// ===============================

const whatsappLink =
  document.getElementById(
    "whatsapp-link"
  );


if (whatsappLink) {

  whatsappLink.href =
    createWhatsAppLink(
      "Hello PakBuy, I would like to know more about your products."
    );

}


// ===============================
// CURRENT YEAR
// ===============================

const yearElement =
  document.getElementById("year");


if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


// ===============================
// START WEBSITE
// ===============================

renderCategories();

renderProducts();

renderBlogs();

renderCart();

renderCheckout();

updateCartCount();
