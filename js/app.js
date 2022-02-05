const nav = document.querySelector('.nav-main');
const navToggle = document.querySelector('.mobile-nav-toggle');
const bars = document.querySelectorAll('.bar');
const links = document.querySelector('.nav-links');

navToggle.addEventListener('click', toggleMenu);
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') closeMenu();
});
links.addEventListener('click', (e) => {
	if (e.target.tagName.toLowerCase() === 'a') closeMenu();
});

function toggleMenu() {
	const visibility = nav.getAttribute('data-visible');

	if (visibility === 'false') {
		nav.setAttribute('data-visible', true);
		navToggle.setAttribute('aria-expanded', true);
		for (const bar of bars) {
			bar.classList.add('active');
		}
	} else {
		closeMenu();
	}
}

function closeMenu() {
	nav.setAttribute('data-visible', false);
	navToggle.setAttribute('aria-expanded', false);
	for (const bar of bars) {
		bar.classList.remove('active');
	}
}
