document.addEventListener('DOMContentLoaded', function () {

  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('main-nav');

  // Mobile menu
  if (hamburger && mainNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('is-open');

      hamburger.classList.toggle('is-active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('is-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Header shadow on scroll
  const header = document.getElementById('header');

  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow =
        window.scrollY > 20
          ? '0 10px 30px rgba(0,0,0,0.25)'
          : 'none';
    });
  }

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {

      const targetId = anchor.getAttribute('href');

      if (targetId && targetId.length > 1) {
        const target = document.querySelector(targetId);

        if (target) {
          e.preventDefault();

          const headerHeight = header ? header.offsetHeight : 0;

          const targetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Active navigation link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    if (!sections.length) return;

    let currentSectionId = '';
    const scrollPos =
      window.scrollY +
      (header ? header.offsetHeight : 0) +
      30;

    sections.forEach(function (section) {
      if (scrollPos >= section.offsetTop) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === '#' + currentSectionId
      );
    });
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

});
