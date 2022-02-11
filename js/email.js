export const form = document.getElementById('contact-form');
const snack = document.getElementById('snackbar');

const displaySnack = () => {
	snack.classList.add('show');
	setTimeout(() => {
		snack.classList.remove('show');
	}, 3000);
};

const setSnackState = (res) => {
	if (!res) {
		snack.classList.add('error');
		snack.innerText = 'Error sending message. Please try later!';
	} else {
		snack.classList.remove('error');
		snack.innerText = 'Message sent successfully!';
		form[1].value = form[2].value = '';
	}
};

export const sendEmail = async (e) => {
	e.preventDefault();
	form.contact_number.value = (Math.random() * 100000) | 0;
	await emailjs
		.sendForm('service_9u8pleo', 'template_hqa0uaq', form)
		.then(() => setSnackState(true))
		.catch(() => setSnackState(false))
		.then(() => displaySnack());
};
