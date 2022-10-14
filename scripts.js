// GLOBAL SCOPE VARIABLES
const app = document.querySelector(".app");

(async function main() {
  // MENU SECTION
  const navMenu = document.querySelector(".show_menus_button");
  const menuButtons = document.querySelector(".menu_buttons");

  // SHOW MENU BUTTONS WHEN CLICKED
  navMenu.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuButtons.classList.toggle("none");
  });

  // WHEN ANY MENU BUTTON IS CLICKED, HIDE MENU
  menuButtons.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuButtons.classList.toggle("none");
  });

  // PRODUCTS SECTION
  const productsContainer = document.querySelector(".products_container");

  // CALL DATABASE
  const products = database.products;

  // DISPLAY PRODUCTS
  products.forEach((product, idx) => {
    productsContainer.innerHTML += `
    <div 
    id="${idx}"
    class="product_card"
    data-modal-target="#modal"
    >
      
      <div class="product_image">
        <img src="./images/${product.image}">
      </div>

      <div class="product_info">
        <h3>${product.name}</h5>
        <p>${product.description}</p>
        <h6>R$${product.price}</h6>
      </div>

    </div>
      `;
  });

  // SEARCH FOR PRODUCTS
  const searchInput = document.querySelector("#search_input");
  searchInput.addEventListener("input", (el) => {
    // HIDE ALL PRODUCTS
    for (let i = 0; i < productsContainer.children.length; i++) {
      productsContainer.children[i].classList.add("none");
    }

    // GET USER INPUT IN REAL TIME
    const value = el.target.value
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // GET RID OF SPECIAL CHARS

    // CHECK IF PRODUCT EXISTS
    products.forEach((product, idx) => {
      const isIncluded =
        product.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(value) ||
        product.seller
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(value) ||
        product.location
          .toLocaleLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(value);

      // SHOW INCLUDED VALUES
      if (isIncluded) {
        productsContainer.children[idx].classList.remove("none");
      }

      let countUnavailableProducts = 0;

      for (let i = 0; i < productsContainer.children.length; i++) {
        if (productsContainer.children[i].classList.contains("none")) {
          countUnavailableProducts++;
        }
      }

      // WARN USER IF PRODUCT WAS NOT FOUND
      if (countUnavailableProducts == products.length && products.length > 0) {
        document.querySelector("#warn2").classList.remove("none");
      } else {
        document.querySelector("#warn2").classList.add("none");
      }
    });
  });

  // WARN USER IF THERE IS NO PRODUCT
  if (products.length == 0) {
    document.querySelector("#warn1").classList.remove("none");
  } else {
    document.querySelector("#warn1").classList.add("none");
  }

  // PRODUCT POP UP MODEL
  const openModalButtons = document.querySelectorAll("[data-modal-target]");
  const closeModalButtons = document.querySelectorAll("[data-close-button]");
  const overlay = document.getElementById("overlay");

  openModalButtons.forEach((button, idx) => {
    button.addEventListener("click", () => {
      const modal = document.querySelector(button.dataset.modalTarget);
      openModal(modal, idx);
    });
  });

  overlay.addEventListener("click", () => {
    const modals = document.querySelectorAll(".modal.active");
    modals.forEach((modal) => {
      closeModal(modal);
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      closeModal(modal);
    });
  });

  function openModal(modal, idx) {
    if (modal == null) return;
    modal.classList.add("active");
    overlay.classList.add("active");

    // DISPLAY MODAL WITH DATA FROM DATABASE
    const title = document.querySelector(".modal_header .title");
    title.innerHTML = products[idx].name;

    const content = document.querySelector(".modal_body");
    content.innerHTML = `
      <div class="product_image">
        <img src="./images/${products[idx].image}">
      </div>

      <div class="product_info">

        <div class="info">
        <p><strong>Local</strong>: ${products[idx].location}</p>
        <p><strong>Vendedor</strong>: ${products[idx].seller}</p>
          <p><strong>Descrição</strong>: ${products[idx].description}</p>
        </div>

        <div class="button_container">
          <h3>R$${products[idx].price}</h3>
          <button> Comprar </button>
        </div>

      </div>
    `;

    // REDIRECT BUYER TO THE SELLER
    const buyButton = document.querySelector(".modal_body button");
    buyButton.addEventListener("click", () => {
      window.open(
        `https://api.whatsapp.com/send?phone=${products[idx].contact}&text=Olá!%20Vi%20o%20seu%20produto%20na%20Agroibi,%20gostaria%20de%20saber%20mais%20informações.`
      );
    });
  }

  function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove("active");
    overlay.classList.remove("active");
  }

  // SAVE PRODUCTS IN THE CART
  const cartProducts = [];
  const cart = document.querySelector("#cart");
  const cartProductsContainer = document.querySelector(".cart_products");
  const cartButton = document.querySelector("#cart_button");
  const cartCloseButton = document.querySelector(".cart_close_button");

  // DISPLAY LISTED PRODUCTS
  if (cartProducts.length > 0) {
    cartProducts.forEach((product) => {
      cartProductsContainer.innerHTML += `
    <li>${product.name}</li>
    `;
    });
  } else {
    cartProductsContainer.innerHTML = `
    <li style="color: red">
      Nenhum Item Adicionado
    </li>
    `
  }

  // DISPLAY NUMBER OF PRODUCTS IN THE CART
  if (cartProducts.length > 0) {
    cartButton.innerHTML += `( ${cartProducts.length} )`;
  }

  // DISPLAY CART
  cartButton.addEventListener("click", () => {
    alert("Funcionalidade indisponível no momento");
    cart.classList.toggle("none");
  });

  // REMOVE CART
  cartCloseButton.addEventListener("click", () => {
    cart.classList.add("none");
  });
})();
