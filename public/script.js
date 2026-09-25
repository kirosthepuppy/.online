(function () {
  // Your Discord user ID (Discord → Settings → Advanced → Developer Mode,
  // then right-click your name → Copy User ID). You also need to join the
  // Lanyard server (discord.gg/lanyard) so your status can be shown here.
  var DISCORD_ID = '';

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

  // Discord status in the nav, and the Discord contact button
  var presence = document.querySelector('[data-presence]');
  var discordLink = document.querySelector('[data-discord-link]');
  var STATUS = { online: 'Online', idle: 'Away', dnd: 'Do not disturb', offline: 'Offline' };
  var VERBS = ['Playing', 'Streaming', 'Listening to', 'Watching', null, 'Competing in'];

  function describe(d) {
    var acts = d.activities || [];
    for (var i = 0; i < acts.length; i++) {
      var a = acts[i];
      if (a.type === 4 && (a.state || a.emoji)) {
        var emoji = a.emoji && !a.emoji.id ? a.emoji.name + ' ' : '';
        return (emoji + (a.state || '')).trim();
      }
    }
    if (d.listening_to_spotify && d.spotify) return 'Listening to ' + d.spotify.song;
    for (var j = 0; j < acts.length; j++) {
      if (VERBS[acts[j].type]) return VERBS[acts[j].type] + ' ' + acts[j].name;
    }
    return '';
  }

  function showPresence(d) {
    var status = STATUS[d.discord_status] ? d.discord_status : 'offline';
    var extra = status === 'offline' ? '' : describe(d);
    var text = STATUS[status] + (extra ? ' · ' + extra : '');
    presence.dataset.status = status;
    presence.querySelector('.presence-text').textContent = text;
    presence.title = 'Discord: ' + text;
    presence.setAttribute('aria-label', 'Kiro on Discord: ' + text);
    presence.hidden = false;
  }

  function loadPresence() {
    if (document.hidden) return;
    fetch('https://api.lanyard.rest/v1/users/' + DISCORD_ID)
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res.success) return;
        if (presence) showPresence(res.data);
        if (discordLink && res.data.discord_user) {
          discordLink.querySelector('[data-discord-name]').textContent =
            '@' + res.data.discord_user.username;
        }
      })
      .catch(function () {});
  }

  if (DISCORD_ID) {
    var profile = 'https://discord.com/users/' + DISCORD_ID;
    if (presence) presence.href = profile;
    if (discordLink) {
      discordLink.href = profile;
      discordLink.hidden = false;
    }
    loadPresence();
    setInterval(loadPresence, 30000);
    document.addEventListener('visibilitychange', loadPresence);
  }

  // Footer year
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();

