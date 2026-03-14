/* ============================================================
   NEO-BRUTALISMO COMERCIAL — script.js
   ============================================================ */

// ── 1. Animated Metrics Counter ──────────────────────────────
function animateCounter(el, target, suffix = '') {
  const duration = 1800;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// Run counters when metrics enter viewport
const metricsBar = document.querySelector('.metrics-bar');
if (metricsBar) {
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.metric-number[data-target]').forEach(el => {
          const target = parseInt(el.dataset.target, 10);
          const suffix = el.dataset.suffix || '';
          animateCounter(el, target, suffix);
        });
        counterObs.disconnect();
      }
    });
  }, { threshold: 0.4 });
  counterObs.observe(metricsBar);
}

// ── 2. Click effect on the poster ─────────────────────
const poster = document.getElementById('poster');
if (poster) {
  poster.addEventListener('mousedown', () => {
    poster.style.transform = 'translate(10px, 10px)';
    poster.style.boxShadow = '0px 0px 0px #000';
  });
  poster.addEventListener('mouseup', () => {
    poster.style.transform = 'translate(0px, 0px)';
    poster.style.boxShadow = '12px 12px 0px #000';
  });
  poster.addEventListener('mouseleave', () => {
    poster.style.transform = 'translate(0px, 0px)';
    poster.style.boxShadow = '12px 12px 0px #000';
  });
}

// ── 3. Smooth scroll for nav links ─
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navbarHeight = document.querySelector('.header')?.offsetHeight ?? 80;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  });
});

// ── 5. Language Toggle Script ─────────────
const translations = {
  en: {
    navAbout: "About Me",
    navSkills: "Skills",
    navProjects: "Portfolio",
    navContact: "Contact",
    heroHey: "HEY THERE!",
    heroName: "I'M MANUELA VARGAS",
    heroTitle: "FULL-STACK DEVELOPER",
    btnProjects: "View Projects",
    btnContact: "Contact Me",
    metricProjects: "Projects",
    metricExp: "Experience",
    metricTech: "Tech Stack",
    titleAbout: "ABOUT ME!",
    aboutText: "I am a Full-Stack Developer specializing in building robust, scalable digital solutions. With strong expertise in Java, Spring Boot, Angular, and Python, I bridge the gap between complex backend architectures and intuitive frontend experiences. My focus is on writing clean, maintainable code that drives business value, optimizes processes, and delivers exceptional products from concept to deployment.",
    titleSkills: "SKILLS",
    titleProjects: "PROJECTS",
    proj0: "Complete e-commerce catalog featuring web templates tailored for digital products and intuitive navigation.",
    proj1: "Robust backend API architecture for medical clinic management, built with Java and Spring Boot.",
    proj2: "Innovative web style generator app designed for custom layout proposals and intuitive PDF exports.",
    proj3: "Modern E-Commerce frontend showing clean layouts, product grids, and interactive UI states.",
    proj4: "Full-stack Python application utilizing Flask and SQL for dynamic data management and CRUD operations.",
    proj5: "Complete hotel reservation management system showcasing complex Java object-oriented principles.",
    proj6: "Interactive text encryption and decryption tool built entirely with Vanilla JavaScript, HTML, and CSS.",
    titleContact: "CONTACT ME!",
    contactTalk: "LET'S TALK!",
    contactSuccess: "Message sent successfully!",
    labelName: "FULL NAME",
    labelEmail: "EMAIL ADDRESS",
    labelSubject: "SUBJECT",
    labelMessage: "MESSAGE",
    btnSubmit: "SEND MESSAGE"
  },
  es: {
    navAbout: "Sobre Mí",
    navSkills: "Habilidades",
    navProjects: "Proyectos",
    navContact: "Contacto",
    heroHey: "¡HOLA!",
    heroName: "SOY MANUELA VARGAS",
    heroTitle: "DESARROLLADORA FULL-STACK",
    btnProjects: "Ver Proyectos",
    btnContact: "Contáctame",
    metricProjects: "Proyectos",
    metricExp: "Experiencia",
    metricTech: "Tecnologías",
    titleAbout: "SOBRE MÍ!",
    aboutText: "Soy una Desarrolladora Full-Stack especializada en construir soluciones digitales robustas y escalables. Con una sólida experiencia en Java, Spring Boot, Angular y Python, conecto arquitecturas backend complejas con experiencias frontend intuitivas. Mi enfoque principal es escribir código limpio y mantenible que impulse el valor del negocio, optimice procesos y entregue productos excepcionales desde el concepto hasta el despliegue.",
    titleSkills: "HABILIDADES",
    titleProjects: "PROYECTOS",
    proj0: "Catálogo e-commerce completo con plantillas web diseñadas para productos digitales y navegación intuitiva.",
    proj1: "Arquitectura API robusta para gestión de clínicas médicas, construida en Java y Spring Boot.",
    proj2: "Innovador generador web diseñado para layouts personalizados y exportación intuitiva a PDF.",
    proj3: "Frontend e-commerce moderno con listas limpias, grillas de productos y UI altamente interactiva.",
    proj4: "Gestor full-stack con Python, Flask y SQL para manejo asincrónico y operaciones CRUD.",
    proj5: "Software para gestión de reservas de hotel aplicando complejos conceptos de programación orientada a objetos.",
    proj6: "Herramienta interactiva de encripción y desencripción basada exclusivamente en Vanilla Javascript, HTML y CSS.",
    titleContact: "CONTÁCTAME!",
    contactTalk: "¡HABLEMOS!",
    contactSuccess: "¡Mensaje enviado con éxito!",
    labelName: "NOMBRE COMPLETO",
    labelEmail: "CORREO ELECTRÓNICO",
    labelSubject: "ASUNTO",
    labelMessage: "MENSAJE",
    btnSubmit: "ENVIAR MENSAJE"
  }
};

let currentLang = 'en';
const toggleBtn = document.getElementById('langToggleBtn');
const langTxt = document.getElementById('langTxt');
const elementsToTranslate = document.querySelectorAll('[data-lang]');

if(toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'es' : 'en';
    langTxt.textContent = currentLang.toUpperCase();
    
    // Toggle visual class
    if (currentLang === 'es') {
      toggleBtn.classList.add('is-es');
    } else {
      toggleBtn.classList.remove('is-es');
    }

    elementsToTranslate.forEach(el => {
      const key = el.getAttribute('data-lang');
      if (translations[currentLang][key]) {
         if (el.tagName === 'INPUT' && el.type === 'submit') {
            el.value = translations[currentLang][key];
         } else {
            el.textContent = translations[currentLang][key];
         }
      }
    });
  });
}

// ── 4. Scroll-reveal: snap in ─────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.skill-item, .card, .dbox').forEach((el) => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});