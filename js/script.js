// 3D tilt effect on the hero poster
const el = document.getElementById('poster');

if (el) {
  const height = el.clientHeight;
  const width = el.clientWidth;

  el.addEventListener('mousemove', (evt) => {
    const { layerX, layerY } = evt;

    const yRotation = ((layerX - width / 2) / width) * 20;
    const xRotation = ((layerY - height / 2) / height) * 20;

    el.style.transform = `
      perspective(500px)
      scale(1.1)
      rotateX(${xRotation}deg)
      rotateY(${yRotation}deg)`;
  });

  el.addEventListener('mouseout', () => {
    el.style.transform = `
      perspective(500px)
      scale(1)
      rotateX(0)
      rotateY(0)`;
  });
}

// Smooth scroll for nav links (handles offset for fixed navbar)
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navbarHeight = document.querySelector('.header')?.offsetHeight || 70;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  });
});