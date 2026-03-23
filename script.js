'use strict';

/* ---- INSTANT LOADER ---- */
(function initLoader() {
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');
  const loaderPct = document.getElementById('loader-percent');

  // Instantly fill bar and hide loader in 800ms — no internet wait
  loaderBar.style.transition = 'width 0.7s ease';
  loaderBar.style.width = '100%';
  loaderPct.textContent = '100%';

  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    initReveal();
    initCounters();
  }, 800);
})();

/* ---- CUSTOM CURSOR ---- */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mx = 0, my = 0, fx = 0, fy = 0;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });
  function animate() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ---- NAV SCROLL ---- */
(function initNav() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

/* ---- MOBILE MENU ---- */
(function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-link');
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
})();

/* ---- TYPEWRITER ---- */
(function initTypewriter() {
  const roles = ['ML Engineer', 'Full Stack Developer', 'Python Developer', 'Problem Solver', 'IoT Security Researcher'];
  const el = document.getElementById('role-text');
  if (!el) return;
  let roleIdx = 0, charIdx = 0, deleting = false, paused = false;
  function type() {
    if (paused) { setTimeout(type, 1500); paused = false; return; }
    const current = roles[roleIdx];
    if (!deleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) { deleting = true; paused = true; }
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
    }
    setTimeout(type, deleting ? 45 : 80);
  }
  type();
})();

/* ---- REVEAL ON SCROLL ---- */
function initReveal() {
  const targets = document.querySelectorAll('.reveal-up, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(el => observer.observe(el));
}

/* ---- SKILL BARS ---- */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        setTimeout(() => { bar.style.width = bar.getAttribute('data-width') + '%'; }, 200);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.2 });
  bars.forEach(bar => observer.observe(bar));
})();

/* ---- STAT COUNTERS ---- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const end = parseFloat(el.getAttribute('data-count'));
      const isFloat = String(end).includes('.');
      const duration = 1600;
      const start = performance.now();
      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const val = end * ease;
        el.textContent = isFloat ? val.toFixed(1) : Math.floor(val);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = isFloat ? end.toFixed(1) : end;
      }
      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
}

/* ---- PARALLAX GRID ---- */
(function initParallax() {
  const grid = document.querySelector('.hero-grid-bg');
  if (!grid) return;
  window.addEventListener('scroll', () => {
    grid.style.transform = 'translateY(' + (window.scrollY * 0.3) + 'px)';
  }, { passive: true });
})();

/* ---- MAGNETIC BUTTONS ---- */
(function initMagnetic() {
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
      const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
      btn.style.transform = 'translate(' + dx + 'px, ' + dy + 'px) translateY(-2px)';
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
})();

/* ---- CARD TILT ---- */
(function initTilt() {
  document.querySelectorAll('.project-card, .cert-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = 'perspective(800px) rotateX(' + (-y * 6) + 'deg) rotateY(' + (x * 6) + 'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

/* ---- GLITCH EFFECT ---- */
(function initGlitch() {
  const accentLine = document.querySelector('.accent-line');
  if (!accentLine) return;
  const originalText = accentLine.textContent;
  const glitchChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01234#@!';
  function scramble(iterations) {
    if (iterations === undefined) iterations = 0;
    if (iterations >= originalText.length * 2) { accentLine.textContent = originalText; return; }
    accentLine.textContent = originalText.split('').map((char, i) => {
      if (char === ' ') return ' ';
      if (i < iterations / 2) return char;
      return glitchChars[Math.floor(Math.random() * glitchChars.length)];
    }).join('');
    setTimeout(() => scramble(iterations + 1), 30);
  }
  const heroName = document.querySelector('.hero-name');
  if (heroName) heroName.addEventListener('mouseenter', () => scramble());
})();

/* ---- ACTIVE NAV ---- */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  sections.forEach(section => {
    new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.style.color = link.getAttribute('href') === '#' + id ? 'var(--accent)' : '';
          });
        }
      });
    }, { threshold: 0.4 }).observe(section);
  });
})();

/* ---- FLOATING PARTICLES ---- */
(function initParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const style = document.createElement('style');
  style.textContent = '@keyframes float-particle{0%,100%{transform:translateY(0) translateX(0);opacity:0.4}25%{transform:translateY(-30px) translateX(10px);opacity:0.8}50%{transform:translateY(-15px) translateX(-10px);opacity:0.6}75%{transform:translateY(-40px) translateX(5px);opacity:0.9}}';
  document.head.appendChild(style);
  for (var i = 0; i < 18; i++) {
    var p = document.createElement('div');
    p.style.cssText = 'position:absolute;width:' + (Math.random()*3+1) + 'px;height:' + (Math.random()*3+1) + 'px;border-radius:50%;background:rgba(0,229,255,' + (Math.random()*0.3+0.05) + ');left:' + (Math.random()*100) + '%;top:' + (Math.random()*100) + '%;pointer-events:none;z-index:1;animation:float-particle ' + (Math.random()*10+8) + 's ease-in-out infinite;animation-delay:' + (Math.random()*-10) + 's;';
    hero.appendChild(p);
  }
})();

/* ---- TECH TAGS STAGGER ---- */
(function initTagsStagger() {
  const tags = document.querySelectorAll('.tech-tag');
  tags.forEach(function(tag, i) {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(10px)';
    tag.style.transition = 'opacity 0.4s ease ' + (i*0.05) + 's, transform 0.4s ease ' + (i*0.05) + 's';
  });
  const techSection = document.querySelector('.tech-tags');
  if (techSection) {
    new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          tags.forEach(function(tag) { tag.style.opacity = '1'; tag.style.transform = 'translateY(0)'; });
        }
      });
    }, { threshold: 0.3 }).observe(techSection);
  }
})();