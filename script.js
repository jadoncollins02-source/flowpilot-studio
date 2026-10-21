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

const serviceSelect = document.querySelector('#service');
const serviceSearch = document.querySelector('#service-search');
const serviceCards = [...document.querySelectorAll('.service-card')];
const noResults = document.querySelector('#no-results');
const serviceGrid = document.querySelector('#service-grid');

function filterServices() {
  const query = (serviceSearch?.value || '').trim().toLowerCase();
  const terms = query.split(/\s+/).filter(Boolean);
  let visible = 0;
  serviceCards.forEach(card => {
    const searchable = `${card.textContent} ${card.dataset.keywords || ''}`.toLowerCase();
    const match = !query || terms.every(term => searchable.includes(term));
    card.hidden = !match;
    if (match) visible++;
  });
  if (noResults) noResults.hidden = !query || visible > 0;
  if (serviceGrid) serviceGrid.classList.toggle('filtered', Boolean(query));
}
serviceSearch?.addEventListener('input', filterServices);

function chooseService(value) {
  if (!serviceSelect || !value) return;
  const option = [...serviceSelect.options].find(item => item.value === value || item.textContent.trim() === value);
  if (option) serviceSelect.value = option.value || option.textContent.trim();
}
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
  chooseService(link.dataset.service);
}));
noResults?.querySelector('[data-service]')?.addEventListener('click', () => chooseService('Custom service request'));
document.querySelector('#year').textContent = new Date().getFullYear();

const form = document.querySelector('#enquiry-form');
form?.addEventListener('submit', event => {
  event.preventDefault();
  const recipient = 'flowpilotstudio0@gmail.com';
  const data = new FormData(form);
  const subject = encodeURIComponent(`FlowPilot Studio project enquiry — ${data.get('service')}`);
  const body = encodeURIComponent(
    `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nBusiness/website: ${data.get('business') || 'Not provided'}\nService: ${data.get('service')}\n\nProject details:\n${data.get('details')}\n\nI understand that this is an enquiry and that scope, feasibility, timeline, and pricing must be confirmed.`
  );
  const mailto = `mailto:${recipient}?subject=${subject}&body=${body}`;
  const status = document.querySelector('#form-status');
  status.textContent = 'Opening your email app with a draft addressed to flowpilotstudio0@gmail.com. Review it and press Send to submit your enquiry.';
  window.location.href = mailto;
});
