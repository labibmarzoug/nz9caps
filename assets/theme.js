(function () {
  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function renderCountdown(el, end) {
    var left = Math.max(0, end - Date.now());
    var s = Math.floor(left / 1000);
    var d = Math.floor(s / 86400);
    var h = Math.floor((s % 86400) / 3600);
    var m = Math.floor((s % 3600) / 60);
    var sec = s % 60;
    el.innerHTML =
      '<b>' + pad(d) + '</b>j <b>' + pad(h) + '</b>h <b>' + pad(m) + '</b>m <b>' + pad(sec) + '</b>s';
  }

  function initCountdowns() {
    var nodes = document.querySelectorAll('[data-countdown]');
    nodes.forEach(function (root) {
      var end = new Date(root.getAttribute('data-countdown')).getTime();
      var targets = root.querySelectorAll('.js-chrono');
      if (!targets.length) return;
      function tick() {
        targets.forEach(function (el) {
          renderCountdown(el, end);
        });
      }
      tick();
      setInterval(tick, 1000);
    });
  }

  function initMenu() {
    var toggle = document.querySelector('[data-menu-toggle]');
    var nav = document.getElementById('HeaderNav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      nav.classList.toggle('is-open');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initCountdowns();
    initMenu();
  });
})();
