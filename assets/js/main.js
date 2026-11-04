/* =========================================================
   ACADEMIA FIT2 — scripts da página
   ========================================================= */

/* ---------------------------------------------------------
   1. CONFIGURAÇÃO
   Troque o número abaixo pelo WhatsApp real da academia.
   Formato: código do país + DDD + número, só dígitos.
   Exemplo: 5535999998888
--------------------------------------------------------- */
const WHATSAPP_NUMERO = '5535999999999'; // <-- TROCAR PELO NÚMERO REAL

(function () {
  'use strict';

  const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 2. Links de WhatsApp ---------- */
  // Todo link com [data-wa] recebe o número e a mensagem de [data-msg].
  document.querySelectorAll('[data-wa]').forEach(function (link) {
    const msg = link.getAttribute('data-msg') || 'Olá! Vim pelo site da Fit2.';
    link.href = 'https://wa.me/' + WHATSAPP_NUMERO + '?text=' + encodeURIComponent(msg);
    link.target = '_blank';
    link.rel = 'noopener';
  });

  /* ---------- 3. Header: estado ao rolar ---------- */
  const topo = document.getElementById('topo');
  let ticking = false;

  function aoRolar() {
    topo.classList.toggle('rolado', window.scrollY > 40);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(aoRolar); ticking = true; }
  }, { passive: true });
  aoRolar();

  /* ---------- 4. Menu mobile ---------- */
  const botaoMenu = document.getElementById('abrirMenu');
  const menu = document.getElementById('menu');

  function fecharMenu() {
    menu.classList.remove('aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
    botaoMenu.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('menu-aberto');
  }

  botaoMenu.addEventListener('click', function () {
    const aberto = menu.classList.toggle('aberto');
    botaoMenu.setAttribute('aria-expanded', String(aberto));
    botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('menu-aberto', aberto);
  });

  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', fecharMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') fecharMenu();
  });

  /* ---------- 5. Revelar ao entrar na viewport ---------- */
  const alvos = document.querySelectorAll('[data-revelar]');

  if (semMovimento || !('IntersectionObserver' in window)) {
    alvos.forEach(function (el) { el.classList.add('visivel'); });
  } else {
    const observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visivel');
          observador.unobserve(entrada.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    alvos.forEach(function (el) { observador.observe(el); });
  }

  /* ---------- 6. Parallax discreto na foto do hero ----------
     Só roda em telas grandes, com rAF e transform (sem repaint pesado). */
  const foto = document.querySelector('[data-parallax]');
  const telaGrande = window.matchMedia('(min-width: 901px)');

  if (foto && !semMovimento && telaGrande.matches) {
    let agendado = false;

    function mover() {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        foto.style.transform = 'translate3d(0,' + (y * 0.14).toFixed(2) + 'px,0)';
      }
      agendado = false;
    }

    window.addEventListener('scroll', function () {
      if (!agendado) { window.requestAnimationFrame(mover); agendado = true; }
    }, { passive: true });
  }

  /* ---------- 7. Estrutura: troca a foto conforme o texto rola ---------- */
  const itens = document.querySelectorAll('.fluxo__item');
  const fotos = document.querySelectorAll('.fluxo__img');

  if (itens.length && fotos.length && 'IntersectionObserver' in window) {
    const trocar = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        const slot = entrada.target.getAttribute('data-slot');

        itens.forEach(function (i) { i.classList.toggle('ativo', i === entrada.target); });
        fotos.forEach(function (f) {
          f.classList.toggle('ativo', f.getAttribute('data-slot') === slot);
        });
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    itens.forEach(function (i) { trocar.observe(i); });
    itens[0].classList.add('ativo');
  } else {
    itens.forEach(function (i) { i.classList.add('ativo'); });
  }

  /* ---------- 8. Lightbox da galeria ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const fechar = document.getElementById('fecharLightbox');
  let ultimoFoco = null;

  document.querySelectorAll('.galeria__item img').forEach(function (img) {
    img.parentElement.setAttribute('tabindex', '0');
    img.parentElement.setAttribute('role', 'button');
    img.parentElement.setAttribute('aria-label', 'Ampliar foto: ' + img.alt);

    function abrir() {
      ultimoFoco = document.activeElement;
      lightboxImg.src = img.getAttribute('data-cheia') || img.src;
      lightboxImg.alt = img.alt;
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      fechar.focus();
    }

    img.parentElement.addEventListener('click', abrir);
    img.parentElement.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrir(); }
    });
  });

  function fecharLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
    if (ultimoFoco) ultimoFoco.focus();
  }

  fechar.addEventListener('click', fecharLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) fecharLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightbox.hidden) fecharLightbox();
  });

  /* ---------- 9. Vídeo: botão de play sobre a capa ---------- */
  const video = document.getElementById('videoLeo');
  const play = document.getElementById('playLeo');

  if (video && play) {
    play.addEventListener('click', function () {
      const p = video.play();
      // Safari antigo não devolve promise em play()
      if (p && typeof p.catch === 'function') {
        p.catch(function () { play.hidden = false; });
      }
    });

    // 'playing' só dispara quando o vídeo realmente anda; 'play' dispara
    // mesmo se a reprodução falhar logo em seguida.
    video.addEventListener('playing', function () { play.hidden = true; });
    video.addEventListener('ended', function () { play.hidden = false; });
    video.addEventListener('error', function () { play.hidden = false; });
  }

  /* ---------- 10. Planos: preço contando e luz no cursor ---------- */
  const planos = document.querySelectorAll('.plano');

  // a) preço sobe de 0 até o valor quando o card aparece
  const precos = document.querySelectorAll('[data-conta]');

  function contar(el) {
    const alvo = parseInt(el.getAttribute('data-conta'), 10);
    if (isNaN(alvo)) return;

    const duracao = 900;
    const inicio = performance.now();

    function passo(agora) {
      const t = Math.min((agora - inicio) / duracao, 1);
      const suave = 1 - Math.pow(1 - t, 3); // desacelera no fim
      el.textContent = Math.round(alvo * suave);
      if (t < 1) window.requestAnimationFrame(passo);
      else el.textContent = alvo;
    }
    window.requestAnimationFrame(passo);
  }

  if (semMovimento || !('IntersectionObserver' in window)) {
    precos.forEach(function (el) {
      el.textContent = el.getAttribute('data-conta');
    });
  } else {
    const olhoPreco = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        contar(e.target);
        olhoPreco.unobserve(e.target);
      });
    }, { threshold: 0.6 });

    precos.forEach(function (el) {
      el.textContent = '0';
      olhoPreco.observe(el);
    });
  }

  // b) brilho vermelho acompanhando o cursor (só em mouse)
  const temMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (temMouse && !semMovimento) {
    planos.forEach(function (card) {
      let agendado = false;
      let x = 0;
      let y = 0;

      card.addEventListener('mousemove', function (e) {
        const r = card.getBoundingClientRect();
        x = ((e.clientX - r.left) / r.width) * 100;
        y = ((e.clientY - r.top) / r.height) * 100;

        if (!agendado) {
          agendado = true;
          window.requestAnimationFrame(function () {
            card.style.setProperty('--mx', x.toFixed(1) + '%');
            card.style.setProperty('--my', y.toFixed(1) + '%');
            agendado = false;
          });
        }
      });
    });
  }

  /* ---------- 11. Ano do rodapé ---------- */
  const ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
