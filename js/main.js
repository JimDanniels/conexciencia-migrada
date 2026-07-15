// ====== NAVBAR RESPONSIVE ======
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const abierto = navLinks.classList.toggle('abierto');
    navToggle.setAttribute('aria-expanded', abierto ? 'true' : 'false');
  });

  // Cierra el menú al elegir una opción (útil en mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('abierto');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ====== ACORDEÓN FAQ ======
document.querySelectorAll('.acordeon-pregunta').forEach(boton => {
  boton.addEventListener('click', () => {
    const respuesta = boton.nextElementSibling;
    const expandido = boton.getAttribute('aria-expanded') === 'true';

    // Cierra las demás preguntas abiertas (comportamiento tipo acordeón)
    document.querySelectorAll('.acordeon-pregunta').forEach(otroBoton => {
      if (otroBoton !== boton) {
        otroBoton.setAttribute('aria-expanded', 'false');
        otroBoton.nextElementSibling.style.maxHeight = null;
      }
    });

    boton.setAttribute('aria-expanded', expandido ? 'false' : 'true');
    respuesta.style.maxHeight = expandido ? null : respuesta.scrollHeight + 'px';
  });
});

// ====== RESALTAR ENLACE ACTIVO SEGÚN SCROLL ======
const secciones = document.querySelectorAll('section[id], footer[id]');
const enlacesNav = document.querySelectorAll('.nav-links a');

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      const id = entrada.target.getAttribute('id');
      enlacesNav.forEach(enlace => {
        enlace.style.color = enlace.getAttribute('href') === `#${id}` ? 'var(--naranja)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

secciones.forEach(seccion => observador.observe(seccion));
