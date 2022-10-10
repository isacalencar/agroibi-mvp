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

  // PRODUCTS SECTION
  const productsContainer = document.querySelector(".products_container");

  // CALL DATABASE
  const products = database.products;

  // DISPLAY PRODUCTS
  products.forEach((product) => {
    productsContainer.innerHTML += `
    <a
    class="product_anchor"
    href="https://wa.me/${product.contact}?text=Gostaria%20de%20saber%20o%20preço%20do%20apartamento"
    target="_blank"
    >
      <div class="product_card">
        <div class="product_image">
          <img src="./images/${product.image}">
        </div>
        <div class="product_info">
          <h3>${product.name}</h5>
          <p>${product.description}</p>
          <h6>R$${product.price}</h6>
        </div>
      </div>
    </a>
      `;
  });
})();
