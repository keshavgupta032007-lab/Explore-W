document.getElementById('contact').onsubmit = e => {
  e.preventDefault();
  const t = document.getElementById('toast');
  t.textContent = 'Message sent — we\u2019ll reply soon.';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
  e.target.reset();
};
