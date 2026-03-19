(() => {
  const carousel = document.querySelector('[data-carousel]');
  const track = document.querySelector('[data-track]');
  const slides = Array.from(document.querySelectorAll('[data-slide]'));
  const dotsWrap = document.querySelector('[data-dots]');
  const prevBtn = document.querySelector('[data-prev]');
  const nextBtn = document.querySelector('[data-next]');

  if (!carousel || !track || slides.length === 0 || !dotsWrap) return;

  let index = 0;
  let timer = null;
  const intervalMs = 5200;

  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', `Ir para manchete ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function applyState() {
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((slide, i) => {
      slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      dot.setAttribute('aria-pressed', i === index ? 'true' : 'false');
    });
  }

  function goTo(nextIndex) {
    index = (nextIndex + slides.length) % slides.length;
    applyState();
  }

  function startAuto() {
    stopAuto();
    timer = window.setInterval(() => goTo(index + 1), intervalMs);
  }

  function stopAuto() {
    if (!timer) return;
    window.clearInterval(timer);
    timer = null;
  }

  prevBtn?.addEventListener('click', () => goTo(index - 1));
  nextBtn?.addEventListener('click', () => goTo(index + 1));

  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);
  carousel.addEventListener('focusin', stopAuto);
  carousel.addEventListener('focusout', startAuto);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAuto();
    else startAuto();
  });

  applyState();
  startAuto();
})();
