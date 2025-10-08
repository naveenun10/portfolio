// Navigation hamburger toggle
(function() {
    var navToggle = document.getElementById('nav-toggle');
    var navMenu = document.getElementById('nav-menu');
    if (navToggle && navMenu) {
        var toggle = function() {
            var isActive = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active', isActive);
            navToggle.setAttribute('aria-expanded', String(isActive));
        };
        navToggle.addEventListener('click', toggle);
        navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    }
})();

// Theme toggle with persistence
(function() {
    var root = document.documentElement; // <html>
    var toggleBtn = document.getElementById('theme-toggle');
    var STORAGE_KEY = 'preferred-theme';

    function applyTheme(theme) {
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
            if (toggleBtn) toggleBtn.textContent = '🌙';
        } else {
            root.removeAttribute('data-theme');
            if (toggleBtn) toggleBtn.textContent = '☀️';
        }
    }

    var stored = localStorage.getItem(STORAGE_KEY);
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(stored || (prefersDark ? 'dark' : 'light'));

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            var current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            var next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem(STORAGE_KEY, next);
        });
    }
})();

// Reveal on scroll (IntersectionObserver)
(function() {
    var reveals = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || reveals.length === 0) {
        // Fallback: show all
        for (var i = 0; i < reveals.length; i++) {
            reveals[i].classList.add('reveal-visible');
        }
        return;
    }
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    reveals.forEach(function(el) { observer.observe(el); });
})();

// Smooth scroll enhancement for internal links
(function() {
    var anchors = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < anchors.length; i++) {
        anchors[i].addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
})();

