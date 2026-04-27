document.addEventListener('DOMContentLoaded', function () {

  /* 1. CURSOR GLOW */
  var cursorGlow = document.getElementById('cursorGlow');

  document.addEventListener('mousemove', function (e) {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top  = e.clientY + 'px';
  });


  /* 2. MOBILE NAV TOGGLE */
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });

  var links = navLinks.querySelectorAll('.nav-link');
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });


  /* 3. NAVBAR SCROLL SHADOW + ACTIVE LINK */
  var navbar   = document.getElementById('navbar');
  var sections = document.querySelectorAll('section[id]');
  var navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    setActiveLink();
  });

  function setActiveLink() {
    var current = '';
    sections.forEach(function (sec) {
      if (window.scrollY >= sec.offsetTop - 140) {
        current = sec.getAttribute('id');
      }
    });
    navItems.forEach(function (a) {
      if (a.getAttribute('href') === '#' + current) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }

  setActiveLink();


  /* 4. SCROLL REVEAL */
  var revealEls = document.querySelectorAll('.reveal');

  var revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('show');

      var bars = entry.target.querySelectorAll('.sbar-fill');
      bars.forEach(function (bar) {
        setTimeout(function () {
          bar.style.transform = 'scaleX(' + bar.dataset.w + ')';
        }, 300);
      });

      revealIO.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealEls.forEach(function (el) {
    revealIO.observe(el);
  });


  /* 5. TITLE LINE ANIMATION */
  var titleLines = document.querySelectorAll('.sec-line');

  var lineIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('grow');
        lineIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  titleLines.forEach(function (line) {
    lineIO.observe(line);
  });


  /* 6. CONTACT FORM */
  var form      = document.getElementById('contactForm');
  var submitBtn = document.getElementById('submitBtn');
  var successEl = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled    = true;

      setTimeout(function () {
        successEl.style.display = 'block';
        form.reset();
        submitBtn.textContent = 'Send Message →';
        submitBtn.disabled    = false;

        setTimeout(function () {
          successEl.style.display = 'none';
        }, 4000);
      }, 1200);
    });
  }


  /* 7. SMOOTH SCROLL */
  var anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });


  /* 8. AUTO YEAR IN FOOTER */
  var footerCopy = document.querySelector('.foot-copy');
  if (footerCopy) {
    footerCopy.textContent =
      'Copyright ' + new Date().getFullYear() +
      ' Revilla, Matt Andrei — ITE 399 Final Project';
  }


  /* 9. PROJECT CARD GLOW ON HOVER */
  var projCards = document.querySelectorAll('.proj-card');
  projCards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      card.style.boxShadow =
        '0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(249,115,22,0.15)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.boxShadow = '';
    });
  });

});