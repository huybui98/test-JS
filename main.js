function validator(arr) {
	const form = document.querySelector('#form');
	const userNameInput = form['username'];
	const emailInput = form['email'];
	const passwordInput = form['password'];

	arr.forEach((e) => {
		const input = form.querySelector(e.selector);
		const errElement = input.parentElement.querySelector('.form__mess');
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
	const addAccount = (userName, email, password) => {
		account.push({
			userName,
			email,
			password
		});
		localStorage.setItem('account', JSON.stringify(account));

		return { userName, email, password };
	};

	form.onsubmit = function (event) {
		arr.forEach((e) => {
			const input = form.querySelector(e.selector);
			const errElement = input.parentElement.querySelector('.form__mess');
			input.onblur();

			if (errElement.innerText == '') true;
			else event.preventDefault();
		});

		const check = account.every(
			(element) => element.userName !== userNameInput.value
		);
		if (!check) {
			alert('Username is already taken. Please re-fill');
			event.preventDefault();
		} else {
			addAccount(userNameInput.value, emailInput.value, passwordInput.value);
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
		if (!value) {
			return 'Vui lòng nhập trường này';
		} else if (value === valuePassword) {
			return undefined;
		} else {
			return 'Mật khẩu nhập lại không chính xác';
		}
	}
});
