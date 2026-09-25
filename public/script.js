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

  // Boop counter (home page only)
  var boop = document.querySelector('.boop');
  if (boop) {
    var countEl = boop.querySelector('[data-count]');
    var count = parseInt(store('boops'), 10) || 0;

    var render = function () {
      countEl.textContent = count;
    };
    render();

    boop.addEventListener('click', function () {
      count += 1;
      store('boops', String(count));
      render();
      boop.classList.remove('booped');
      void boop.offsetWidth; // restart animation
      boop.classList.add('booped');
    });
  }

  // Video reels: swap the thumbnail for the player on click
  document.querySelectorAll('.reel[data-video]').forEach(function (reel) {
    reel.addEventListener('click', function (e) {
      if (reel.classList.contains('playing')) return;
      e.preventDefault();
      var frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' + reel.dataset.video + '?autoplay=1&playsinline=1';
      frame.title = reel.querySelector('.reel-title').textContent;
      frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      reel.replaceChildren(frame);
      reel.classList.add('playing');
      reel.removeAttribute('href');
    });
  });

  // Footer year
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();

