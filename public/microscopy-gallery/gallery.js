const progress = document.querySelector("[data-gallery-progress]");
const filterButtons = document.querySelectorAll("[data-gallery-filter]");
const galleryCards = document.querySelectorAll("[data-gallery-card]");
const emptyState = document.querySelector("[data-gallery-empty]");
const dialog = document.querySelector("[data-gallery-dialog]");
const dialogImage = document.querySelector("[data-dialog-image]");
const dialogTitle = document.querySelector("[data-dialog-title]");
const dialogMethod = document.querySelector("[data-dialog-method]");
const dialogDescription = document.querySelector("[data-dialog-description]");
const dialogCredit = document.querySelector("[data-dialog-credit]");
const dialogSource = document.querySelector("[data-dialog-source]");

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

filterButtons.forEach(button => button.addEventListener("click", () => {
  const filter = button.dataset.galleryFilter;
  let visibleCount = 0;
  filterButtons.forEach(item => item.setAttribute("aria-pressed", String(item === button)));
  galleryCards.forEach(card => {
    const categories = card.dataset.category.split(" ");
    const visible = filter === "all" || categories.includes(filter);
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });
  emptyState.hidden = visibleCount !== 0;
}));

galleryCards.forEach(card => card.addEventListener("click", () => {
  dialogImage.src = card.dataset.image;
  dialogImage.alt = card.dataset.alt;
  dialogTitle.textContent = card.dataset.title;
  dialogMethod.textContent = card.dataset.method;
  dialogDescription.textContent = card.dataset.description;
  dialogCredit.textContent = card.dataset.credit;
  dialogSource.href = card.dataset.source;
  dialog.showModal();
}));

document.querySelector("[data-dialog-close]").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener("close", () => dialogImage.removeAttribute("src"));
