document.documentElement.classList.add("js-ready");

const mobileMenuButton = document.querySelector("[data-mobile-menu-button]");
const mobileNav = document.querySelector("[data-mobile-nav]");
function closeMobileNav() {
  mobileNav.hidden = true;
  mobileMenuButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}
mobileMenuButton.addEventListener("click", () => {
  const opening = mobileNav.hidden;
  mobileNav.hidden = !opening;
  mobileMenuButton.setAttribute("aria-expanded", String(opening));
  document.body.classList.toggle("menu-open", opening);
});
mobileNav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMobileNav));

const products = {
  "signal-tee": { name: "The Signal Tee", detail: "Black · Concept 01", price: 34, image: "/images/cellwear-black-tee.webp" },
  "stain-tee": { name: "The Stain Tee", detail: "Bone · Concept 02", price: 36, image: "/images/cellwear-ivory-tee.webp" },
  "field-hoodie": { name: "The Field Hoodie", detail: "Midnight · Concept 03", price: 68, image: "/images/cellwear-navy-hoodie.webp" }
};

let cart = JSON.parse(localStorage.getItem("cellwear-cart") || "[]");
const drawer = document.querySelector("[data-cart]");
const overlay = document.querySelector("[data-cart-overlay]");
const body = document.querySelector("[data-cart-body]");
const footer = document.querySelector("[data-cart-footer]");

function money(value) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value); }
function save() { localStorage.setItem("cellwear-cart", JSON.stringify(cart)); renderCart(); }
function openCart() { drawer.classList.add("open"); drawer.setAttribute("aria-hidden", "false"); overlay.hidden = false; document.body.classList.add("cart-open"); drawer.querySelector("[data-close-cart]").focus(); }
function closeCart() { drawer.classList.remove("open"); drawer.setAttribute("aria-hidden", "true"); overlay.hidden = true; document.body.classList.remove("cart-open"); }

function renderCart() {
  document.querySelectorAll("[data-cart-count]").forEach(el => el.textContent = cart.length);
  if (!cart.length) {
    body.innerHTML = '<p class="empty-cart">Your bag is waiting for something unseen.</p>';
    footer.hidden = true;
    return;
  }
  body.innerHTML = cart.map((id, index) => {
    const item = products[id];
    return `<div class="cart-item"><img src="${item.image}" alt="" /><div><h3>${item.name}</h3><p>${item.detail}</p><button type="button" data-remove="${index}">Remove</button></div><strong>${money(item.price)}</strong></div>`;
  }).join("");
  document.querySelector("[data-cart-total]").textContent = money(cart.reduce((total, id) => total + products[id].price, 0));
  footer.hidden = false;
}

document.querySelectorAll("[data-open-cart]").forEach(button => button.addEventListener("click", openCart));
document.querySelector("[data-close-cart]").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);
document.addEventListener("keydown", event => { if (event.key === "Escape") { closeCart(); closeMobileNav(); } });
document.querySelectorAll("[data-add]").forEach(button => button.addEventListener("click", () => { cart.push(button.dataset.add); save(); openCart(); }));
body.addEventListener("click", event => { const target = event.target.closest("[data-remove]"); if (!target) return; cart.splice(Number(target.dataset.remove), 1); save(); });
document.querySelector("[data-checkout]").addEventListener("click", () => { closeCart(); document.querySelector("#email").focus(); document.querySelector(".signup").scrollIntoView({ behavior: "smooth" }); });
document.querySelector("[data-signup-form]").addEventListener("submit", event => {
  event.preventDefault();
  const email = new FormData(event.currentTarget).get("email");
  localStorage.setItem("cellwear-launch-email", email);
  document.querySelector("[data-form-message]").textContent = "You're on the list. New cancer explainers will help keep the unseen in view.";
  event.currentTarget.reset();
});

const progress = document.querySelector("[data-reading-progress]");
function updateReadingProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0}%`;
}
window.addEventListener("scroll", updateReadingProgress, { passive: true });
updateReadingProgress();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(section => revealObserver.observe(section));

const educationHero = document.querySelector(".education-hero");
educationHero.addEventListener("pointermove", event => {
  const bounds = educationHero.getBoundingClientRect();
  educationHero.style.setProperty("--mx", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
  educationHero.style.setProperty("--my", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
});
renderCart();
