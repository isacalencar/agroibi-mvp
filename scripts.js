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
  menuButtons.addEventListener('click', () => {
    navMenu.classList.toggle("active");
    menuButtons.classList.toggle("none");
  })

  // PRODUCTS SECTION
  const productsContainer = document.querySelector(".products_container");

  // CALL DATABASE
  const products = database.products;

  // DISPLAY PRODUCTS
  products.forEach((product) => {
    productsContainer.innerHTML += `
    <div 
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
    const title = document.querySelector('.modal_header .title')
    title.innerHTML = products[idx].name

    const content = document.querySelector('.modal_body')
    content.innerHTML = `
    <div class="modal_body">
      
      <div class="product_image">
        <img src="./images/${products[idx].image}">
      </div>

      <div class="product_info">
        <div class="info">
          <p><strong>Descrição</strong>: ${products[idx].description}</p>
          <p><strong>Vendedor</strong>: ${products[idx].seller}</p>
          <p><strong>Local</strong>: ${products[idx].location}</p>
        </div>
        <div class="button_container">
          <h3>R$${products[idx].price}</h3>
          <button> Comprar </button>
        </div>
      </div>
      
    </div>
    `

    // REDIRECT BUYER TO THE SELLER
    const buyButton = document.querySelector('.modal_body button')
    buyButton.addEventListener('click', () => {
      window.open(`https://api.whatsapp.com/send?phone=${products[idx].contact}&text=Olá!%20Vi%20o%20seu%20produto%20na%20Agroibi,%20gostaria%20de%20saber%20mais%20informações.`) 
    })
  }

  function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove("active");
    overlay.classList.remove("active");
  }

  // SAVE PRODUCTS IN THE CART
  const cartProducts = []
  const cartButton = document.querySelector('#cart_button')
  
  // DISPLAY NUMBER OF PRODUCTS IN THE CART
  if (cartProducts.length > 0) {
    cartButton.innerHTML += `( ${cartProducts.length} )`
  }
  
  // DISPLAY MODAL WITH PRODUCTS IN THE CART
  cartButton.addEventListener('click', showCartProducts)
  
  function showCartProducts() {
    alert('not working')
  }


})();
