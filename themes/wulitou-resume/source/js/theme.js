/*!
 * hexo-theme-wulitou-resume — runtime enhancements.
 * Progressive enhancement only: with JS disabled the resume stays fully
 * readable and every anchor still works.
 */
(function () {
  'use strict';

  var root = document.querySelector('[data-wr-root]');
  if (!root) return;

  var reduceMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : { matches: false };

  var FOCUSABLE = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  /* ---------------------------------------------------------------- drawer */

  function initDrawer() {
    var drawer = document.querySelector('[data-wr-drawer]');
    var overlay = document.querySelector('[data-wr-drawer-overlay]');
    var openBtn = document.querySelector('[data-wr-drawer-open]');
    var closeBtn = drawer && drawer.querySelector('[data-wr-drawer-close]');

    if (!drawer || !overlay || !openBtn) return;

    var isOpen = false;
    var lastFocused = null;

    function focusable() {
      return Array.prototype.filter.call(
        drawer.querySelectorAll(FOCUSABLE),
        function (el) {
          return el.offsetParent !== null || el === document.activeElement;
        }
      );
    }

    function lockScroll() {
      var sbw = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty('--wr-scrollbar-width', sbw + 'px');
      document.documentElement.classList.add('wr-locked');
    }

    function unlockScroll() {
      document.documentElement.classList.remove('wr-locked');
      document.documentElement.style.removeProperty('--wr-scrollbar-width');
    }

    function open() {
      if (isOpen) return;
      isOpen = true;
      lastFocused = document.activeElement;

      drawer.hidden = false;
      overlay.hidden = false;
      // Force a frame so the transform transition actually plays.
      void drawer.offsetWidth;
      drawer.classList.add('is-open');
      overlay.classList.add('is-open');
      openBtn.setAttribute('aria-expanded', 'true');
      lockScroll();

      var targets = focusable();
      (targets[0] || drawer).focus({ preventScroll: true });
    }

    function finishClose() {
      if (isOpen) return;
      drawer.hidden = true;
      overlay.hidden = true;
    }

    function close(restoreFocus) {
      if (!isOpen) return;
      isOpen = false;

      drawer.classList.remove('is-open');
      overlay.classList.remove('is-open');
      openBtn.setAttribute('aria-expanded', 'false');
      unlockScroll();

      if (restoreFocus !== false && lastFocused && lastFocused.focus) {
        lastFocused.focus({ preventScroll: true });
      }

      if (reduceMotion.matches) {
        finishClose();
      } else {
        // Keep the panel in the DOM until the slide-out finishes.
        window.setTimeout(finishClose, 260);
      }
    }

    openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', function () { close(true); });
    overlay.addEventListener('click', function () { close(true); });

    // Navigating away should not steal focus back to the menu button.
    drawer.addEventListener('click', function (event) {
      if (event.target.closest('[data-wr-drawer-dismiss]')) close(false);
    });

    document.addEventListener('keydown', function (event) {
      if (!isOpen) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        close(true);
        return;
      }

      if (event.key !== 'Tab') return;

      var targets = focusable();
      if (!targets.length) {
        event.preventDefault();
        drawer.focus({ preventScroll: true });
        return;
      }

      var first = targets[0];
      var last = targets[targets.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (!drawer.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
    });

    // Reaching desktop width hides the drawer via CSS; sync the state so the
    // scroll lock and aria attributes do not get stranded.
    if (window.matchMedia) {
      var desktop = window.matchMedia('(min-width: 1024px)');
      var onChange = function (event) {
        if (event.matches && isOpen) close(false);
      };
      if (desktop.addEventListener) desktop.addEventListener('change', onChange);
      else if (desktop.addListener) desktop.addListener(onChange);
    }
  }

  /* ------------------------------------------------------------ active nav */

  function initActiveNav() {
    var links = Array.prototype.slice.call(document.querySelectorAll('[data-wr-nav-link]'));
    if (!links.length) return;

    var byAnchor = {};
    var sections = [];

    links.forEach(function (link) {
      var anchor = link.getAttribute('data-wr-nav-link');
      if (!anchor) return;
      (byAnchor[anchor] = byAnchor[anchor] || []).push(link);
      var section = document.getElementById(anchor);
      if (section && sections.indexOf(section) === -1) sections.push(section);
    });

    if (!sections.length) return;

    function setActive(anchor) {
      Object.keys(byAnchor).forEach(function (key) {
        byAnchor[key].forEach(function (link) {
          link.classList.toggle('is-active', key === anchor);
          if (key === anchor) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }

    setActive(sections[0].id);

    if (!('IntersectionObserver' in window)) return;

    var ratios = {};

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          ratios[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        });

        var bestId = null;
        var bestRatio = 0;
        Object.keys(ratios).forEach(function (id) {
          if (ratios[id] > bestRatio) {
            bestRatio = ratios[id];
            bestId = id;
          }
        });

        if (bestId) setActive(bestId);
      },
      {
        // Offsets the sticky mobile header so the section under it wins.
        rootMargin: '-72px 0px -45% 0px',
        threshold: [0, 0.15, 0.35, 0.6, 0.9]
      }
    );

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* -------------------------------------------------------- smooth scroll */

  function initSmoothScroll() {
    if (root.getAttribute('data-wr-smooth-scroll') === 'false') return;

    document.addEventListener('click', function (event) {
      var link = event.target.closest('a[href^="#"]');
      if (!link) return;

      var id = link.getAttribute('href').slice(1);
      if (!id) return;

      var target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion.matches ? 'auto' : 'smooth',
        block: 'start'
      });

      // Keep the URL shareable without triggering a second jump.
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', '#' + id);
      }

      // Move focus for keyboard/screen-reader users.
      var hadTabindex = target.hasAttribute('tabindex');
      if (!hadTabindex) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      if (!hadTabindex) target.removeAttribute('tabindex');
    });
  }

  /* ---------------------------------------------------------- skill bars */

  function initSkillBars() {
    var groups = Array.prototype.slice.call(document.querySelectorAll('.wr-skills'));
    if (!groups.length) return;
    if (root.getAttribute('data-wr-animate-skills') === 'false') return;
    if (reduceMotion.matches) return;
    if (!('IntersectionObserver' in window)) return;
    if (!document.querySelector('[data-wr-skill-fill]')) return;

    // Only opt into the zero-width start state once JS can finish the job.
    groups.forEach(function (group) { group.classList.add('is-ready'); });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.25 }
    );

    groups.forEach(function (group) { observer.observe(group); });
  }

  initDrawer();
  initActiveNav();
  initSmoothScroll();
  initSkillBars();
})();
