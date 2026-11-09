/* EDIT CONTENT HERE: company details and service descriptions. */
const SITE = {
  company: 'Pure Green Energy & Heating Ltd',
  phoneDisplay: '07520 651396',
  phoneLink: '+447520651396',
  email: 'info@puregreenenergyheating.uk',
  domain: 'puregreenenergyheating.uk',
  registeredAddress: 'Flat 455 Fellows Court Weymouth Terrace, London, England, E2 8LG',
  companyNumber: '16926170',
  services: [
    {title:'Domestic gas boilers', category:'DOMESTIC HEATING', image:'assets/domestic-boiler.webp', alt:'Wall-mounted domestic gas boiler with copper pipework', summary:'Boiler work for home heating and hot water.', details:'We work with domestic gas boilers and associated heating systems. Get in touch to discuss the boiler, its symptoms or the work you have in mind.'},
    {title:'Commercial gas boilers', category:'COMMERCIAL HEATING', image:'assets/commercial-boiler.jpg', alt:'Commercial boiler equipment in a plant room', summary:'Heating solutions for commercial premises.', details:'Commercial boiler systems can involve multiple components, controls and plant-room equipment. Share your site details and requirements so we can discuss an appropriate next step.'},
    {title:'Ground source heat pumps', category:'HEAT PUMPS', image:'assets/ground-source.jpg', alt:'Ground source heat pump unit on display', summary:'Explore heating that draws energy from the ground.', details:'Ground source heat pumps use a ground loop to supply heat to a building. The ground works, available space and internal heating system all matter when considering a project.'},
    {title:'Exhaust air heat pumps', category:'HEAT PUMPS', image:'assets/exhaust-air.jpg', alt:'An exhaust air heat pump unit indoors', summary:'Recover heat from outgoing ventilation air.', details:'An exhaust air heat pump extracts useful heat from air leaving a building. Suitability depends on the ventilation design and the heating and hot water demand.'},
    {title:'Heating systems', category:'HEATING', image:'assets/heat-network.jpg', alt:'Heating system pipework and distribution equipment', summary:'Help with the pipework and components behind comfortable heating.', details:'Heating systems bring together pipework, controls, heat emitters and a heat source. Tell us about your setup and the work you need so we can discuss the next step.'},
    {title:'Heating interface units', category:'DISTRIBUTED HEAT', image:'assets/hiu-support.jpg', alt:'Engineer working on components for a heat distribution system', summary:'Manage heat and hot water at the point of use.', details:'A heating interface unit transfers heat from a central network to an individual property’s heating and hot water circuits. We can discuss the unit and its connected system.'},
    {title:'Solar thermal hot water', category:'RENEWABLE HEAT', image:'assets/solar-thermal.jpg', alt:'Solar thermal collectors on a roof', summary:'Use solar collectors to contribute heat to your hot water system.', details:'Solar thermal systems capture the sun’s energy to heat water. We can discuss the collectors, cylinder and controls in the context of your property and existing hot water setup.'}
  ]
};

// Keep the visible company details in sync with the editable block above.
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.href = `tel:${SITE.phoneLink}`;
  link.textContent = link.classList.contains('header-call') ? SITE.phoneDisplay : `Call ${SITE.phoneDisplay}`;
});
document.querySelectorAll('a[href^="mailto:"]').forEach(link => { link.href = `mailto:${SITE.email}`; if (link.classList.contains('email')) link.textContent = SITE.email; });
document.querySelector('.address-mini').innerHTML = SITE.registeredAddress.replace(', London,', '<br>London,');
document.querySelector('.footer-company').innerHTML = `<h3>Company</h3><p>${SITE.company}<br>Company number ${SITE.companyNumber}</p><p>Registered office: ${SITE.registeredAddress}</p>`;

const grid = document.getElementById('service-grid');
const dialog = document.getElementById('service-dialog');
const dialogBody = document.getElementById('dialog-body');

SITE.services.forEach((service, index) => {
  const card = document.createElement('article');
  card.className = 'service-card';
  if (index === SITE.services.length - 1 && SITE.services.length % 3 === 1) card.classList.add('service-card-wide');
  const media = service.image ? `<img src="${service.image}" alt="${service.alt}" loading="lazy">` : `<div class="service-graphic" aria-hidden="true"><span>${String(index + 1).padStart(2,'0')}</span><i></i></div>`;
  card.innerHTML = `<div class="card-media">${media}</div><div class="card-body"><div class="card-meta"><span>${service.category}</span><span>${String(index + 1).padStart(2,'0')} / ${String(SITE.services.length).padStart(2,'0')}</span></div><h3>${service.title}</h3><p>${service.summary}</p><button type="button" class="card-link">View service</button></div>`;
  card.querySelector('button').addEventListener('click', () => {
    dialogBody.innerHTML = `<div class="dialog-media">${media}</div><div class="dialog-copy"><p class="eyebrow">${service.category}</p><h2 id="dialog-title">${service.title}</h2><p>${service.details}</p><div class="dialog-actions"><a class="button button-lime" href="tel:${SITE.phoneLink}">Call ${SITE.phoneDisplay}</a><a class="button button-dark" href="mailto:${SITE.email}?subject=${encodeURIComponent('Enquiry: ' + service.title)}">Email about this service</a></div></div>`;
    dialog.showModal();
  });
  grid.append(card);
});

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false');}));
document.getElementById('year').textContent = new Date().getFullYear();

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const headings = document.querySelectorAll('.intro h2, .split-copy h2, .areas h2, .contact h2');
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        reveal.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  headings.forEach(heading => {heading.classList.add('reveal-ready'); reveal.observe(heading);});
}
