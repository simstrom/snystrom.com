const nav = document.querySelector('.nav-main');
const navToggle = document.querySelector('.mobile-nav-toggle');
const bars = document.querySelectorAll('.bar');
const links = document.querySelector('.nav-links');
const themeBtn = document.querySelector('.theme');

themeBtn.addEventListener('click', toggleTheme);
navToggle.addEventListener('click', toggleMenu);
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') closeMenu();
});
links.addEventListener('click', (e) => {
	if (e.target.tagName.toLowerCase() === 'a') closeMenu();
});

function toggleTheme() {
	if (document.body.classList.contains('ui-dark')) {
		document.body.classList.add('ui-light');
		document.body.classList.remove('ui-dark');
		themeBtn.innerHTML =
			'\n\t\t\t\t<svg viewBox="0 0 512 512" height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg"><path d="M264 480A232 232 0 0132 248c0-94 54-178.28 137.61-214.67a16 16 0 0121.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200 31.34 0 59.57-5.07 81.61-14.67a16 16 0 0121.06 21.06C442.28 426 358 480 264 480z"></path></svg>';
	} else {
		document.body.classList.add('ui-dark');
		document.body.classList.remove('ui-light');
		themeBtn.innerHTML =
			'\n\t\t\t\t<svg viewBox="0 0 512 512" height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg"><path d="M256 118a22 22 0 01-22-22V48a22 22 0 0144 0v48a22 22 0 01-22 22zm0 368a22 22 0 01-22-22v-48a22 22 0 0144 0v48a22 22 0 01-22 22zm113.14-321.14a22 22 0 01-15.56-37.55l33.94-33.94a22 22 0 0131.11 31.11l-33.94 33.94a21.93 21.93 0 01-15.55 6.44zM108.92 425.08a22 22 0 01-15.55-37.56l33.94-33.94a22 22 0 1131.11 31.11l-33.94 33.94a21.94 21.94 0 01-15.56 6.45zM464 278h-48a22 22 0 010-44h48a22 22 0 010 44zm-368 0H48a22 22 0 010-44h48a22 22 0 010 44zm307.08 147.08a21.94 21.94 0 01-15.56-6.45l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.55 37.56zM142.86 164.86a21.89 21.89 0 01-15.55-6.44l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.56 37.55zM256 358a102 102 0 11102-102 102.12 102.12 0 01-102 102z"></path></svg>';
	}
}

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
