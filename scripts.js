/* === scripts.js === */
document.addEventListener('DOMContentLoaded', () => {
  // Smooth Scroll for Navbar Links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Slideshow Functionality
  const slides = document.querySelectorAll('.slide');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('d-block', i === index);
      slide.classList.toggle('d-none', i !== index);
      slide.setAttribute('aria-hidden', i !== index);
    });
  }

  if (slides.length > 0) {
    showSlide(0);
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlideFunc() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  if (nextButton && prevButton) {
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlideFunc);

    // Auto-cycle slides every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause slideshow on hover or focus
    const slideContainer = document.querySelector('.slide-container');
    if (slideContainer) {
      slideContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
      slideContainer.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 5000));
    }

    prevButton.addEventListener('focus', () => clearInterval(slideInterval));
    nextButton.addEventListener('focus', () => clearInterval(slideInterval));
    prevButton.addEventListener('blur', () => slideInterval = setInterval(nextSlide, 5000));
    nextButton.addEventListener('blur', () => slideInterval = setInterval(nextSlide, 5000));
  }
});
