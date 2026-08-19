document.addEventListener('DOMContentLoaded', function () {

  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('main-nav');

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

  const header = document.getElementById('header');

  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 20
        ? '0 10px 30px rgba(0,0,0,0.25)'
        : 'none';
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

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

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    if (!header || !sections.length) return;

    let currentSectionId = '';
    const scrollPos = window.scrollY + header.offsetHeight + 30;

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

  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {

    const revealObserver = new IntersectionObserver(
      function (entries, observer) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });

  } else {

    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });

  }

  const counters = document.querySelectorAll('[data-count]');
  let countersAnimated = false;

  function animateCounters() {

    if (countersAnimated) return;
    countersAnimated = true;

    counters.forEach(function (counter) {

      const target =
        parseInt(counter.getAttribute('data-count'), 10) || 0;

      const duration = 1400;
      const startTime = performance.now();

      function tick(now) {

        const progress =
          Math.min((now - startTime) / duration, 1);

        const eased =
          1 - Math.pow(1 - progress, 3);

        counter.textContent =
          Math.floor(eased * target);

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          counter.textContent = target;
        }

      }

      requestAnimationFrame(tick);

    });

  }

  const trustSection =
    document.getElementById('trust');

  if (counters.length) {

    if (
      trustSection &&
      'IntersectionObserver' in window
    ) {

      const counterObserver =
        new IntersectionObserver(function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {
              animateCounters();
              counterObserver.disconnect();
            }

          });

        }, {
          threshold: 0.4
        });

      counterObserver.observe(trustSection);

    } else {

      animateCounters();

    }

  }

  function showError(inputEl, message) {

    if (!inputEl) return;

    const group =
      inputEl.closest('.form-group');

    const errorEl =
      document.getElementById(
        inputEl.id + '-error'
      );

    if (group) {
      group.classList.add('has-error');
    }

    if (errorEl) {
      errorEl.textContent = message;
    }

  }

  function clearError(inputEl) {

    if (!inputEl) return;

    const group =
      inputEl.closest('.form-group');

    const errorEl =
      document.getElementById(
        inputEl.id + '-error'
      );

    if (group) {
      group.classList.remove('has-error');
    }

    if (errorEl) {
      errorEl.textContent = '';
    }

  }

  function isValidPhone(value) {

    const digitsOnly =
      value.replace(/\D/g, '');

    return digitsOnly.length >= 7;

  }

  const quoteForm =
    document.getElementById('quote-form');

  const quoteSuccess =
    document.getElementById('quote-success');

  if (quoteForm) {

    quoteForm.addEventListener('submit', function (e) {

      e.preventDefault();

      let isValid = true;

      const name =
        document.getElementById('q-name');

      const phone =
        document.getElementById('q-phone');

      const product =
        document.getElementById('q-product');

      const quantity =
        document.getElementById('q-quantity');

      [name, phone, product, quantity]
        .forEach(clearError);

      if (
        name &&
        name.value.trim().length < 2
      ) {
        showError(
          name,
          'Please enter your full name.'
        );
        isValid = false;
      }

      if (
        phone &&
        !isValidPhone(phone.value)
      ) {
        showError(
          phone,
          'Please enter a valid phone number.'
        );
        isValid = false;
      }

      if (
        product &&
        !product.value
      ) {
        showError(
          product,
          'Please select a product.'
        );
        isValid = false;
      }

      if (
        quantity &&
        quantity.value.trim().length < 1
      ) {
        showError(
          quantity,
          'Please enter an estimated quantity.'
        );
        isValid = false;
      }

      if (isValid) {

        if (quoteSuccess) {
          quoteSuccess.textContent =
            'Thank you! Your enquiry has been noted. We will get back to you shortly.';
        }

        quoteForm.reset();

        setTimeout(function () {

          if (quoteSuccess) {
            quoteSuccess.textContent = '';
          }

        }, 6000);

      } else if (quoteSuccess) {

        quoteSuccess.textContent = '';

      }

    });

  }

  const contactForm =
    document.getElementById('contact-form');

  const contactSuccess =
    document.getElementById('contact-success');

  if (contactForm) {

    contactForm.addEventListener('submit', function (e) {

      e.preventDefault();

      let isValid = true;

      const name =
        document.getElementById('c-name');

      const contact =
        document.getElementById('c-email');

      const message =
        document.getElementById('c-message');

      [name, contact, message]
        .forEach(clearError);

      if (
        name &&
        name.value.trim().length < 2
      ) {
        showError(
          name,
          'Please enter your full name.'
        );
        isValid = false;
      }

      if (
        contact &&
        contact.value.trim().length < 5
      ) {
        showError(
          contact,
          'Please enter a valid phone number or email.'
        );
        isValid = false;
      }

      if (
        message &&
        message.value.trim().length < 5
      ) {
        showError(
          message,
          'Please enter a short message.'
        );
        isValid = false;
      }

      if (isValid) {

        if (contactSuccess) {
          contactSuccess.textContent =
            'Message sent! We will respond to you as soon as possible.';
        }

        contactForm.reset();

        setTimeout(function () {

          if (contactSuccess) {
            contactSuccess.textContent = '';
          }

        }, 6000);

      } else if (contactSuccess) {

        contactSuccess.textContent = '';

      }

    });

  }

  const backToTopBtn =
    document.getElementById('back-to-top');

  if (backToTopBtn) {

    window.addEventListener('scroll', function () {

      backToTopBtn.classList.toggle(
        'is-visible',
        window.scrollY > 500
      );

    });

    backToTopBtn.addEventListener('click', function () {

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    });

  }

  const yearEl =
    document.getElementById('year');

  if (yearEl) {
    yearEl.textContent =
      new Date().getFullYear();
  }

});
