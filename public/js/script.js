document.addEventListener('DOMContentLoaded', () => {
  // Année dans le footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menu mobile
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Effet "machine à écrire" dans le terminal du hero
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const out1 = document.getElementById('tOut1');
  const out2 = document.getElementById('tOut2');

  const line1 = 'djaffar — développeuse full stack';
  const line2 = 'web · mobile · desktop · cybersécurité';

  function typeInto(el, text, speed, done) {
    if (!el) return;
    if (reduceMotion) { el.textContent = text; if (done) done(); return; }
    let i = 0;
    (function step() {
      el.textContent = text.slice(0, i);
      i++;
      if (i <= text.length) {
        setTimeout(step, speed);
      } else if (done) {
        done();
      }
    })();
  }

  typeInto(out1, line1, 28, () => {
    setTimeout(() => typeInto(out2, line2, 24), 300);
  });

  // Formulaire de contact
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const submitBtn = document.getElementById('contactSubmit');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim(),
      };
      if (!data.name || !data.email || !data.message) {
        status.textContent = 'Merci de remplir tous les champs.';
        return;
      }

      submitBtn.disabled = true;
      status.textContent = 'Envoi en cours…';

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (json.ok) {
          status.textContent = 'Message envoyé, merci ! Je reviens vers vous rapidement.';
          form.reset();
        } else {
          status.textContent = "Une erreur s'est produite. Réessayez, ou écrivez directement par e-mail.";
        }
      } catch (err) {
        status.textContent = "Une erreur s'est produite. Réessayez, ou écrivez directement par e-mail.";
      } finally {
        submitBtn.disabled = false;
      }
    });
  }
});
