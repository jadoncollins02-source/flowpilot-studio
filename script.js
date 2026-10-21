const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
  const select = document.querySelector('#service');
  if (select) select.value = link.dataset.service;
}));
document.querySelector('#year').textContent = new Date().getFullYear();

const form = document.querySelector('#enquiry-form');
form?.addEventListener('submit', event => {
  event.preventDefault();
  // Replace this placeholder with your real business inbox before launch.
  const recipient = 'REPLACE-WITH-YOUR-EMAIL@example.com';
  if (recipient.includes('REPLACE-WITH-YOUR-EMAIL')) {
    document.querySelector('#form-status').textContent =
      'Demo only: add your business email in script.js before publishing. No information has been sent or stored.';
    return;
  }
  const data = new FormData(form);
  const subject = encodeURIComponent(`Project enquiry — ${data.get('service')}`);
  const body = encodeURIComponent(
    `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nBusiness/website: ${data.get('business') || 'Not provided'}\nService: ${data.get('service')}\n\nProject details:\n${data.get('details')}`
  );
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  document.querySelector('#form-status').textContent =
    'Your email app should open with the enquiry prepared. Please review and send it there.';
});
