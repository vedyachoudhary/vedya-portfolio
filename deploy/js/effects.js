/* ═══════════════════════════════════════════
   PREMIUM UI EFFECTS
═══════════════════════════════════════════ */

/* ── Scroll progress bar ── */
const scrollBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  if (!scrollBar) return;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  scrollBar.style.width = h > 0 ? `${(window.scrollY / h) * 100}%` : '0%';
}, { passive: true });

/* ── Welcome back toast (return visitors) ── */
(function welcomeBack() {
  const toast = document.getElementById('welcomeToast');
  if (!toast) return;
  const key = 'vedya_portfolio_visits';
  const visits = parseInt(localStorage.getItem(key) || '0', 10) + 1;
  localStorage.setItem(key, String(visits));

  if (visits > 1) {
    const msgs = [
      'Welcome back — good to see you again ✨',
      'You came back! Explore something new today 🚀',
      'Glad you returned — check out the projects section',
    ];
    toast.textContent = msgs[(visits - 2) % msgs.length];
    setTimeout(() => toast.classList.add('show'), 2200);
    setTimeout(() => toast.classList.remove('show'), 6200);
  }
})();

/* ── 3D tilt on hero logo card ── */
(function initTilt() {
  const card = document.getElementById('tiltCard');
  if (!card || window.matchMedia('(max-width:900px)').matches) return;

  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale3d(1.02,1.02,1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateY(0) rotateX(0) scale3d(1,1,1)';
  });
  card.style.transition = 'transform .35s cubic-bezier(.03,.98,.52,.99)';
})();

/* ── Magnetic buttons ── */
document.querySelectorAll('.magnetic').forEach((btn) => {
  if (window.matchMedia('(max-width:900px)').matches) return;
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ── Card shine on hover ── */
document.querySelectorAll('.project-card, .about-card, .skill-cat, .exp-card, .glass-card, .hero-panel, .about-photo-frame').forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
  });
});

/* ── Parallax orbs follow scroll ── */
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.querySelectorAll('.orb').forEach((orb, i) => {
    orb.style.transform = `translateY(${y * (0.04 + i * 0.02)}px)`;
  });
}, { passive: true });

/* ── Typing cursor in terminal ── */
const termBlink = document.querySelector('.t-blink');
if (termBlink) {
  setInterval(() => {
    termBlink.style.opacity = termBlink.style.opacity === '0' ? '1' : '0';
  }, 530);
}

/* ── Night / light mode toggle ── */
(function initThemeToggle() {
  const STORAGE_KEY = 'vedya-theme';
  const root = document.documentElement;
  const toggles = [document.getElementById('themeToggle')].filter(Boolean);

  function isDark() {
    return root.getAttribute('data-theme') === 'dark';
  }

  function syncUi() {
    const dark = isDark();
    toggles.forEach((btn) => {
      btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
      btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  function setTheme(theme) {
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    localStorage.setItem(STORAGE_KEY, theme === 'dark' ? 'dark' : 'light');
    syncUi();
  }

  function toggleTheme() {
    setTheme(isDark() ? 'light' : 'dark');
  }

  syncUi();
  toggles.forEach((btn) => btn.addEventListener('click', toggleTheme));
})();

/* ── Berry Frost Drift (petals + crystals, snowfall-inspired) ── */
(function initFrostDrift() {
  const canvas = document.getElementById('frost-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const palette = [
    { r: 205, g: 180, b: 219 },
    { r: 232, g: 180, b: 188 },
    { r: 205, g: 231, b: 240 },
    { r: 255, g: 255, b: 255 },
  ];

  let W = 0;
  let H = 0;
  let frame = 0;
  const mouse = { x: -999, y: -999 };
  const flakes = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function mkFlake() {
    const roll = Math.random();
    const type = roll < 0.5 ? 'petal' : roll < 0.82 ? 'crystal' : 'speck';
    const col = palette[Math.floor(Math.random() * palette.length)];
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      type,
      col,
      size: type === 'speck' ? Math.random() * 1.4 + 0.7
        : type === 'petal' ? Math.random() * 5 + 4
        : Math.random() * 6 + 5,
      speedY: type === 'speck' ? Math.random() * 0.35 + 0.18
        : Math.random() * 0.65 + 0.3,
      driftAmp: Math.random() * 1.1 + 0.35,
      driftFreq: Math.random() * 0.014 + 0.007,
      phase: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.018,
      alpha: type === 'speck' ? Math.random() * 0.3 + 0.12
        : Math.random() * 0.42 + 0.22,
      wind: 0,
      branch: 0.75 + Math.random() * 0.25,
    };
  }

  function resetFlake(f) {
    f.y = -16 - Math.random() * 40;
    f.x = Math.random() * W;
    f.wind = 0;
  }

  function drawPetal(f) {
    ctx.save();
    ctx.translate(f.x, f.y);
    ctx.rotate(f.rot);
    ctx.globalAlpha = f.alpha;
    ctx.fillStyle = `rgb(${f.col.r},${f.col.g},${f.col.b})`;
    ctx.beginPath();
    ctx.ellipse(0, 0, f.size * 0.42, f.size, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawCrystal(f) {
    ctx.save();
    ctx.translate(f.x, f.y);
    ctx.rotate(f.rot);
    ctx.globalAlpha = f.alpha * 0.9;
    ctx.strokeStyle = `rgb(${f.col.r},${f.col.g},${f.col.b})`;
    ctx.lineWidth = 0.75;
    ctx.lineCap = 'round';

    for (let i = 0; i < 6; i += 1) {
      const a = (Math.PI / 3) * i;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(a) * f.size * f.branch, Math.sin(a) * f.size * f.branch);
      ctx.stroke();
    }

    ctx.globalAlpha = f.alpha * 0.35;
    ctx.beginPath();
    for (let i = 0; i < 6; i += 1) {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      const px = Math.cos(a) * f.size * 0.32;
      const py = Math.sin(a) * f.size * 0.32;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  function drawSpeck(f) {
    ctx.globalAlpha = f.alpha;
    ctx.fillStyle = `rgb(${f.col.r},${f.col.g},${f.col.b})`;
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);
    frame += 1;

    flakes.forEach((f) => {
      const dx = f.x - mouse.x;
      const dy = f.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 130 && dist > 0) {
        f.wind += (dx / dist) * ((130 - dist) / 130) * 0.035;
      }
      f.wind *= 0.965;

      f.x += Math.sin(frame * f.driftFreq + f.phase) * f.driftAmp + f.wind;
      f.y += reduced ? f.speedY * 0.12 : f.speedY;
      f.rot += f.rotSpeed;

      if (f.y > H + 24) resetFlake(f);
      if (f.x < -32) f.x = W + 16;
      if (f.x > W + 32) f.x = -16;

      if (f.type === 'petal') drawPetal(f);
      else if (f.type === 'crystal') drawCrystal(f);
      else drawSpeck(f);
    });

    requestAnimationFrame(tick);
  }

  resize();
  const count = reduced ? 16 : window.innerWidth < 768 ? 42 : 58;
  for (let i = 0; i < count; i += 1) flakes.push(mkFlake());

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  tick();
})();
