window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("scrollToTopBtn").style.display = "block";
  } else {
    document.getElementById("scrollToTopBtn").style.display = "none";
  }
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

document.addEventListener("DOMContentLoaded", function() {
  const animationSection = document.getElementById('animationSection');
  let animationTriggered = false;

  function fadeInSection() {
      const sectionTop = animationSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight && !animationTriggered) {
          animationSection.classList.add('fade-in');
          animationTriggered = true;
      }
  }

  window.addEventListener('scroll', fadeInSection);
});

document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll('section');
  const windowHeight = window.innerHeight;

  function fadeInSection(section) {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop < windowHeight) {
          section.classList.add('fade-in');
      }
  }

  sections.forEach(section => {
      window.addEventListener('scroll', function() {
          fadeInSection(section);
      });
  });
});
const headerElement = document.getElementById('mainHeader');
headerElement.classList.add('fade-in');


