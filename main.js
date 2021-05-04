function validator(arr) {
	const form = document.querySelector('#form');
	const userNameInput = form['username'];
	const emailInput = form['email'];
	const passwordInput = form['password'];
	const confirmPasswordInput = form['confirm-pass'];

	arr.forEach((e) => {
		let input = form.querySelector(e.selector);
		let errElement = input.parentElement.querySelector('.form__mess');
		input.onblur = function () {
			if (e.test(input.value)) {
				errElement.innerText = e.test(input.value);
				input.parentElement.classList.add('invalid');
			} else {
				errElement.innerText = '';
				input.parentElement.classList.remove('invalid');
			}
		};

		input.oninput = function () {
			errElement.innerText = '';
			input.parentElement.classList.remove('invalid');
		};
	});

	const account = JSON.parse(localStorage.getItem('account')) || [];
	const addAccount = (userName, email, password, confirmPassword) => {
		account.push({
			userName,
			email,
			password,
			confirmPassword
		});
		localStorage.setItem('account', JSON.stringify(account));

		return { userName, email, password, confirmPassword };
	};

	form.onsubmit = function (event) {
		arr.forEach((e) => {
			let input = form.querySelector(e.selector);
			let errElement = input.parentElement.querySelector('.form__mess');
			input.onblur();

			if (errElement.innerText == '') true;
			else event.preventDefault();
		});

		let check = account.every(
			(element) => element.userName != userNameInput.value
		);
		if (check === false) {
			alert('Username is already taken. Please re-fill');
			event.preventDefault();
		} else {
			addAccount(
				userNameInput.value,
				emailInput.value,
				passwordInput.value,
				confirmPasswordInput.value
			);
		}
	};
}

const isRequired = (selector) => ({
	selector,
	test: function (value) {
		return value ? undefined : 'Vui lòng nhập trường này';
	}
});

const isEmail = (selector) => ({
	selector,
	test: function (value) {
		const regex = /^\w+([\.-]?\w+)*@gmail([\.-]?\w+)*(\.\w{2,3})+$/;
		return regex.test(value) ? undefined : 'Trường này phải là email';
	}
});

const minLength = (selector, min) => ({
	selector,
	test: function (value) {
		return value.length >= min
			? undefined
			: `Vui lòng nhập tối thiểu ${min} ký tự`;
	}
});

const isConfirm = (selector) => ({
	selector,
	test: function (value) {
		const valuePassword = document.querySelector('#form .form__password').value;
		if (value === '') {
			return 'Vui lòng nhập trường này';
		} else if (value === valuePassword) {
			return undefined;
		} else {
			return 'Mật khẩu nhập lại không chính xác';
		}
	}
});
