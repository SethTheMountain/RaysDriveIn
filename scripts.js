// Slideshow Functionality
document.addEventListener('DOMContentLoaded', () => {
  const slides     = document.querySelectorAll('.slide');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const container  = document.querySelector('.slide-container');
  let   current    = 0;
  let   interval;

  if (!slides.length) return;  // nothing to do

  function showSlide(i) {
    slides.forEach((s, idx) => {
      if (idx === i) {
        s.classList.add('active');
        s.classList.remove('d-none');
      } else {
        s.classList.remove('active');
        s.classList.add('d-none');
      }
      s.setAttribute('aria-hidden', idx !== i);
    });
  }

  function startAuto() {
    interval = setInterval(() => {
      current = (current + 1) % slides.length;
      showSlide(current);
    }, 5000);
  }

  function stopAuto() {
    clearInterval(interval);
  }

  nextButton.addEventListener('click', () => {
    stopAuto();
    current = (current + 1) % slides.length;
    showSlide(current);
    startAuto();
  });

  prevButton.addEventListener('click', () => {
    stopAuto();
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
    startAuto();
  });

  container.addEventListener('mouseenter', stopAuto);
  container.addEventListener('mouseleave', startAuto);

  // initialize
  showSlide(0);
  startAuto();
});