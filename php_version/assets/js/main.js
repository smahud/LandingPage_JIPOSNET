/* ===========================================================================
   JIPOSNET — main.js (vanilla, tanpa dependensi)
   ---------------------------------------------------------------------------
   Port JavaScript murni dari interaksi versi Next.js:
     1. Navbar — latar kaca saat scroll + scrollspy tautan aktif
     2. Drawer menu seluler (buka/tutup, Escape, kunci scroll)
     3. Reveal on scroll (pengganti framer-motion, hormati reduced-motion)
     4. Kanvas jaringan hero (node drift, tautan jarak, partikel data)
     5. Widget latensi "live"
     6. Peta coverage interaktif (toggle lapisan, hover/klik titik, tooltip)
   =========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. Navbar ─────────────────────────────────────────────────────────── */

  var header = document.getElementById('site-header');

  function onScroll() {
    if (window.scrollY > 24) {
      header.setAttribute('data-scrolled', '');
    } else {
      header.removeAttribute('data-scrolled');
    }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Scrollspy — tandai tautan sesuai section yang terlihat */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));

  function setActiveLink(id) {
    navLinks.forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
    });
  }

  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    navLinks.forEach(function (a) {
      var el = document.getElementById(a.getAttribute('href').slice(1));
      if (el) spy.observe(el);
    });
  }

  /* ── 2. Drawer menu seluler ────────────────────────────────────────────── */

  var drawer = document.getElementById('mobile-drawer');
  var openBtn = document.getElementById('drawer-open');

  function openDrawer() {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('drawer-open');
  }
  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('drawer-open');
  }

  openBtn.addEventListener('click', openDrawer);
  drawer.addEventListener('click', function (e) {
    if (e.target.closest('[data-drawer-close]')) closeDrawer();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
      openBtn.focus();
    }
  });

  /* ── 3. Reveal on scroll ───────────────────────────────────────────────── */

  if (reduced || !('IntersectionObserver' in window)) {
    /* Tanpa animasi: langsung tampilkan semuanya */
    document.querySelectorAll('.rv, .rvi').forEach(function (el) {
      el.classList.add('is-in');
    });
  } else {
    /* Elemen hero: muncul saat halaman dimuat, delay dari --rv-delay */
    document.querySelectorAll('[data-rv-load]').forEach(function (el) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { el.classList.add('is-in'); });
      });
    });

    /* Elemen biasa: muncul saat masuk viewport */
    var rvIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            rvIO.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '-72px 0px -72px 0px' }
    );
    document.querySelectorAll('.rv:not([data-rv-load])').forEach(function (el) {
      rvIO.observe(el);
    });

    /* Grup stagger: anak-anak .rvi menyusul berurutan */
    var groupIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          groupIO.unobserve(entry.target);
          var stagger = parseFloat(entry.target.getAttribute('data-stagger')) || 0.1;
          var items = entry.target.querySelectorAll('.rvi');
          Array.prototype.forEach.call(items, function (item, i) {
            item.style.transitionDelay = (i * stagger).toFixed(2) + 's';
            item.classList.add('is-in');
          });
        });
      },
      { rootMargin: '-60px 0px' }
    );
    document.querySelectorAll('.rvg').forEach(function (g) { groupIO.observe(g); });
  }

  /* ── 4. Kanvas jaringan hero ───────────────────────────────────────────── */

  var canvas = document.getElementById('network-canvas');

  function initNetworkCanvas() {
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var LINK_DIST = 155;
    var MOUSE_DIST = 170;

    var width = 0;
    var height = 0;
    var nodes = [];
    var particles = [];
    var raf = 0;
    var inView = true;
    var tabVisible = !document.hidden;
    var mouse = { x: -9999, y: -9999 };

    function pickEdge() {
      var n = nodes.length;
      for (var tries = 0; tries < 12; tries++) {
        var a = Math.floor(Math.random() * n);
        for (var b = 0; b < n; b++) {
          if (b === a) continue;
          var dx = nodes[a].x - nodes[b].x;
          var dy = nodes[a].y - nodes[b].y;
          if (Math.hypot(dx, dy) < LINK_DIST) return [a, b];
        }
      }
      return [0, Math.min(1, n - 1)];
    }

    function spawn() {
      var edge = pickEdge();
      return {
        a: edge[0],
        b: edge[1],
        t: Math.random(),
        speed: 0.0035 + Math.random() * 0.007,
        size: 1.1 + Math.random() * 1.5,
      };
    }

    function build() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var count = Math.max(26, Math.min(78, Math.floor((width * height) / 24000)));
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.24,
          vy: (Math.random() - 0.5) * 0.24,
          r: 1 + Math.random() * 1.5,
        });
      }
      particles = [];
      var pc = Math.min(24, Math.floor(count / 3));
      for (var j = 0; j < pc; j++) particles.push(spawn());
    }

    function frame() {
      ctx.clearRect(0, 0, width, height);

      /* Node mengapung lembut */
      for (var n = 0; n < nodes.length; n++) {
        var node = nodes[n];
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;
      }

      /* Tautan antar node terdekat */
      ctx.lineWidth = 1;
      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var dx = nodes[i].x - nodes[j].x;
          var dy = nodes[i].y - nodes[j].y;
          var d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            var alpha = (1 - d / LINK_DIST) * 0.24;
            ctx.strokeStyle = 'rgba(0, 190, 255, ' + alpha.toFixed(3) + ')';
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      /* Node — lebih terang dekat pointer */
      for (var k = 0; k < nodes.length; k++) {
        var nn = nodes[k];
        var md = Math.hypot(nn.x - mouse.x, nn.y - mouse.y);
        var near = md < MOUSE_DIST;
        var nAlpha = near ? 0.95 : 0.62;
        ctx.fillStyle = near
          ? 'rgba(0, 226, 255, ' + nAlpha + ')'
          : 'rgba(130, 190, 255, ' + nAlpha + ')';
        ctx.beginPath();
        ctx.arc(nn.x, nn.y, near ? nn.r + 0.6 : nn.r, 0, Math.PI * 2);
        ctx.fill();

        if (near) {
          ctx.strokeStyle = 'rgba(0, 212, 255, ' + ((1 - md / MOUSE_DIST) * 0.3) + ')';
          ctx.beginPath();
          ctx.moveTo(nn.x, nn.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      /* Partikel data mengalir di sepanjang tautan */
      for (var p = 0; p < particles.length; p++) {
        var pt = particles[p];
        var A = nodes[pt.a];
        var B = nodes[pt.b];
        if (!A || !B) continue;
        var x = A.x + (B.x - A.x) * pt.t;
        var y = A.y + (B.y - A.y) * pt.t;

        ctx.fillStyle = 'rgba(0, 212, 255, 0.16)';
        ctx.beginPath();
        ctx.arc(x, y, pt.size * 3.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(140, 240, 255, 0.95)';
        ctx.beginPath();
        ctx.arc(x, y, pt.size, 0, Math.PI * 2);
        ctx.fill();

        pt.t += pt.speed;
        if (pt.t >= 1) {
          pt.t = 0;
          var edge = pickEdge();
          pt.a = edge[0];
          pt.b = edge[1];
          pt.speed = 0.0035 + Math.random() * 0.007;
        }
      }
    }

    function loop() {
      if (inView && tabVisible) frame();
      raf = requestAnimationFrame(loop);
    }

    /* Listener */
    var resizeTimer = null;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 160);
    }
    function onPointer(e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onPointerLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }
    function onVisibility() {
      tabVisible = !document.hidden;
    }

    var io = new IntersectionObserver(
      function (entries) { inView = entries[0].isIntersecting; },
      { threshold: 0.02 }
    );
    io.observe(canvas);

    build();
    if (reduced) {
      frame(); /* satu frame statis */
    } else {
      raf = requestAnimationFrame(loop);
      window.addEventListener('resize', onResize);
      window.addEventListener('pointermove', onPointer, { passive: true });
      window.addEventListener('pointerleave', onPointerLeave);
      document.addEventListener('visibilitychange', onVisibility);
    }
  }

  if (canvas && canvas.getContext) initNetworkCanvas();

  /* ── 5. Widget latensi live ────────────────────────────────────────────── */

  var latencyEl = document.getElementById('latency-value');
  if (latencyEl) {
    var current = 12;
    setInterval(function () {
      current = 9 + Math.round(Math.random() * 6);
      latencyEl.textContent = current;
    }, 2200);
  }

  /* ── 6. Peta coverage interaktif ───────────────────────────────────────── */

  var VB_W = 720;
  var VB_H = 560;
  var coverageGroup = document.getElementById('map-coverage');
  var linesGroup = document.getElementById('map-lines');
  var pointsGroup = document.getElementById('map-points');
  var tooltip = document.getElementById('map-tooltip');
  var tooltipName = document.getElementById('tooltip-name');
  var tooltipKind = document.getElementById('tooltip-kind');
  var tooltipLink = document.getElementById('tooltip-link');

  /* Data titik — identik dengan sections/coverage.php */
  var MAP_POINTS = {
    balai:     { name: 'Balai Desa Hargorejo', kind: 'Fasilitas Umum', link: 'Fiber',    x: 262, y: 176, tipBelow: false },
    sekolah:   { name: 'SDN Hargorejo',        kind: 'Pendidikan',    link: 'Fiber',    x: 452, y: 148, tipBelow: true },
    masjid:    { name: 'Masjid Baiturrahman',  kind: 'Ibadah',        link: 'Wireless', x: 548, y: 262, tipBelow: false },
    pasar:     { name: 'Pasar Desa',           kind: 'Usaha Warga',   link: 'Fiber',    x: 208, y: 330, tipBelow: false },
    poskesdes: { name: 'Poskesdes',            kind: 'Kesehatan',     link: 'Wireless', x: 318, y: 428, tipBelow: false },
    perumahan: { name: 'Perumahan Warga',      kind: 'Permukiman',    link: 'Fiber',    x: 508, y: 420, tipBelow: false },
    relay:     { name: 'Menara Relay Sawah',   kind: 'Perluasan',     link: 'Backbone', x: 574, y: 468, tipBelow: false },
  };

  var activePoint = null;

  function setLayer(button, groupEl, onCls, offCls, iconWrap, show) {
    button.setAttribute('aria-pressed', show ? 'true' : 'false');
    button.className = show ? onCls : offCls;
    /* Ganti ikon eye ↔ eye-off */
    iconWrap.innerHTML = show
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye h-3.5 w-3.5" aria-hidden="true"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off h-3.5 w-3.5" aria-hidden="true"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"></path><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"></path><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"></path><path d="m2 2 20 20"></path></svg>';
    if (groupEl) groupEl.setAttribute('display', show ? '' : 'none');
  }

  function bindToggle(btnId, onCls, offCls, groupEl) {
    var btn = document.getElementById(btnId);
    if (!btn) return;
    var state = true;
    btn.addEventListener('click', function () {
      state = !state;
      setLayer(btn, groupEl, onCls, offCls, btn, state);
      if (!state && activePoint) clearActive();
    });
  }

  var ON_COVERAGE =
    'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all duration-300 bg-jipo-cyan/15 text-jipo-cyan ring-1 ring-inset ring-jipo-cyan/40';
  var OFF =
    'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all duration-300 bg-white/5 text-white/45 ring-1 ring-inset ring-white/10 hover:text-white/70';
  var ON_POINTS =
    'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all duration-300 bg-jipo-blue/20 text-jipo-cyan ring-1 ring-inset ring-jipo-blue/50';

  bindToggle('toggle-coverage', ON_COVERAGE, OFF, coverageGroup);

  /* Toggle "Titik Koneksi" mengendalikan dua grup sekaligus (garis + titik) */
  var pointsBtn = document.getElementById('toggle-points');
  if (pointsBtn) {
    pointsBtn.addEventListener('click', function () {
      var show = pointsBtn.getAttribute('aria-pressed') === 'false';
      setLayer(pointsBtn, null, ON_POINTS, OFF, pointsBtn, show);
      if (linesGroup) linesGroup.setAttribute('display', show ? '' : 'none');
      if (pointsGroup) pointsGroup.setAttribute('display', show ? '' : 'none');
      if (!show && activePoint) clearActive();
    });
  }

  function setActive(id) {
    activePoint = id;
    var data = MAP_POINTS[id];

    Object.keys(MAP_POINTS).forEach(function (pid) {
      var dot = pointsGroup.querySelector('[data-dot="' + pid + '"]');
      var ring = pointsGroup.querySelector('[data-point="' + pid + '"] .animate-pulse-ring');
      var label = pointsGroup.querySelector('[data-point="' + pid + '"] text');
      var line = linesGroup ? linesGroup.querySelector('[data-line="' + pid + '"]') : null;
      var isActive = pid === id;

      if (dot) {
        dot.setAttribute('r', isActive ? '7' : '5.5');
        dot.setAttribute('fill', isActive ? '#00D4FF' : '#FFFFFF');
        dot.setAttribute('stroke', isActive ? '#FFFFFF' : '#0066FF');
      }
      if (ring) {
        ring.setAttribute('stroke', isActive ? 'rgba(0,212,255,0.9)' : 'rgba(0,212,255,0.45)');
      }
      if (label) {
        label.setAttribute('fill', isActive ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.72)');
      }
      if (line) {
        line.setAttribute('stroke', isActive ? 'rgba(0,212,255,0.85)' : 'rgba(0,190,255,0.3)');
        line.setAttribute('stroke-width', isActive ? '2' : '1.3');
      }
    });

    /* Tooltip */
    if (tooltip && data) {
      tooltipName.textContent = data.name;
      tooltipKind.textContent = data.kind;
      tooltipLink.textContent = data.link;
      tooltip.style.left = (data.x / VB_W) * 100 + '%';
      tooltip.style.top = (data.y / VB_H) * 100 + '%';
      tooltip.style.transform = data.tipBelow
        ? 'translate(-50%, 18px)'
        : 'translate(-50%, calc(-100% - 18px))';
      tooltip.classList.remove('hidden');
    }
  }

  function clearActive() {
    activePoint = null;
    if (tooltip) tooltip.classList.add('hidden');
    Object.keys(MAP_POINTS).forEach(function (pid) {
      var dot = pointsGroup.querySelector('[data-dot="' + pid + '"]');
      var ring = pointsGroup.querySelector('[data-point="' + pid + '"] .animate-pulse-ring');
      var label = pointsGroup.querySelector('[data-point="' + pid + '"] text');
      var line = linesGroup ? linesGroup.querySelector('[data-line="' + pid + '"]') : null;
      if (dot) {
        dot.setAttribute('r', '5.5');
        dot.setAttribute('fill', '#FFFFFF');
        dot.setAttribute('stroke', '#0066FF');
      }
      if (ring) ring.setAttribute('stroke', 'rgba(0,212,255,0.45)');
      if (label) label.setAttribute('fill', 'rgba(255,255,255,0.72)');
      if (line) {
        line.setAttribute('stroke', 'rgba(0,190,255,0.3)');
        line.setAttribute('stroke-width', '1.3');
      }
    });
  }

  if (pointsGroup) {
    pointsGroup.querySelectorAll('[data-point]').forEach(function (g) {
      var id = g.getAttribute('data-point');
      g.addEventListener('mouseenter', function () { setActive(id); });
      g.addEventListener('mouseleave', function () {
        if (activePoint === id) clearActive();
      });
      g.addEventListener('click', function () { setActive(id); });
      /* Dukungan keyboard: Enter/Space */
      g.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setActive(id);
        }
      });
      g.addEventListener('focus', function () { setActive(id); });
      g.addEventListener('blur', function () {
        if (activePoint === id) clearActive();
      });
    });
  }
})();
