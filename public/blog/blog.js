const progress = document.querySelector("[data-blog-progress]");
function updateProgress() {
  if (!progress) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

const filterButtons = document.querySelectorAll("[data-filter]");
const journalCards = document.querySelectorAll("[data-category]");
filterButtons.forEach(button => button.addEventListener("click", () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle("is-active", item === button));
  journalCards.forEach(card => {
    card.hidden = filter !== "all" && card.dataset.category !== filter;
  });
}));
