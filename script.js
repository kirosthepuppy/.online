(function () {
  var root = document.documentElement;

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) {
      return null;
    }
  }

  // Theme toggle
  var toggle = document.querySelector('.theme-toggle');
  toggle.addEventListener('click', function () {
    var current = root.dataset.theme ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    store('theme', next);
  });

  // Boop counter
  var boop = document.querySelector('.boop');
  var countEl = boop.querySelector('[data-count]');
  var count = parseInt(store('boops'), 10) || 0;

  function render() {
    countEl.textContent = count + (count === 1 ? ' boop' : ' boops');
  }
  render();

  boop.addEventListener('click', function () {
    count += 1;
    store('boops', String(count));
    render();
    boop.classList.remove('booped');
    void boop.offsetWidth; // restart animation
    boop.classList.add('booped');
  });

  // Footer year
  document.querySelector('[data-year]').textContent = new Date().getFullYear();
})();

// Art lightbox
(function () {
  var box = document.querySelector('.lightbox');
  if (!box || typeof box.showModal !== 'function') return;
  var img = box.querySelector('img');
  document.querySelectorAll('.art-card').forEach(function (card) {
    card.addEventListener('click', function () {
      img.src = card.dataset.full;
      img.alt = card.dataset.alt;
      box.showModal();
    });
  });
  box.addEventListener('click', function (e) {
    if (e.target === box) box.close();
  });
})();
