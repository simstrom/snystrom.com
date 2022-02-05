const nav = document.querySelector('.nav-main');
const navToggle = document.querySelector('.mobile-nav-toggle');
const bars = document.querySelectorAll('.bar');

navToggle.addEventListener('click', () => {
	const visibility = nav.getAttribute('data-visible');

	if (visibility === 'false') {
		nav.setAttribute('data-visible', true);
		navToggle.setAttribute('aria-expanded', true);
		for (const bar of bars) {
			bar.classList.add('active');
		}
	} else {
		nav.setAttribute('data-visible', false);
		navToggle.setAttribute('aria-expanded', false);
		for (const bar of bars) {
			bar.classList.remove('active');
		}
	}
});
