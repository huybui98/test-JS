// function validator
function validator(arr) {
	let formElement = document.querySelector('#form');

	let saveRules = {}; // để lưa tất cả các check đc khai báo

	// lặp qua mỗi check và xử lý
	arr.forEach(function (e) {
		// lưu lại các rules cho mỗi input
		if (Array.isArray(saveRules[e.selector])) {
			saveRules[e.selector].push(e.test);
		} else {
			saveRules[e.selector] = [e.test];
		}
		// console.log(saveRules[e.selector]);

		let inputElement = formElement.querySelector(e.selector);
		let errorElement = inputElement.parentElement.querySelector('.form__mess');

		inputElement.onblur = function () {
			let errorMess;
			// let errorMess = e.test(inputElement.value);
			let rules = saveRules[e.selector]; // lấy ra các rule của selector

			// lặp qua từng rule và kiểm tra
			for (let i = 0; i < rules.length; ++i) {
				errorMess = rules[i](inputElement.value);
				if (errorMess) {
					break;
				}
			}

			let btnElement = document.querySelector('.form__btn');
			if (errorMess) {
				errorElement.innerText = errorMess;
				inputElement.parentElement.classList.add('invalid');

				btnElement.style.cursor = 'unset';
				btnElement.setAttribute('disabled', '');
			} else {
				errorElement.innerText = '';
				inputElement.parentElement.classList.remove('invalid');

				btnElement.style.cursor = 'pointer';
				btnElement.removeAttribute('disabled', '');
			}
		};

		inputElement.oninput = function () {
			errorElement.innerText = '';
			inputElement.parentElement.classList.remove('invalid');
		};
	});

	formElement.onsubmit = function (event) {
		event.preventDefault();

		arr.forEach(function (e) {
			let inputElement = formElement.querySelector(e.selector);
			inputElement.onblur();
		});

		function data() {
			return {
				fullname: formElement.querySelector('#fullname').value,
				email: formElement.querySelector('#email').value,
				password: formElement.querySelector('#password').value,
				password__confirm: formElement.querySelector('.pass__confirm').value
			};
		}
		console.log(data());
		// alert('success');
	};
}

isRequired = (selector) => ({
	selector,
	test: function (value) {
		const regex = /\w\s*$/;
		return regex.test(value) ? undefined : 'Bạn chưa nhập đúng trường này';
	}
});

isEmail = (selector) => ({
	selector,
	test: function (value) {
		const regex = /^\w+([\.-]?\w+)*@gmail([\.-]?\w+)*(\.\w{2,3})+$/;
		return regex.test(value) ? undefined : 'Trường này phải là email';
	}
});

minLength = (selector, min) => ({
	selector,
	test: function (value) {
		return value.length >= min
			? undefined
			: `Vui lòng nhập tối thiểu ${min} ký tự`;
	}
});

isConfirm = (selector) => ({
	selector,
	test: function (value) {
		let valuePass = document.querySelector('#form #password').value;
		return value === valuePass
			? undefined
			: 'Mật khẩu nhập vào không chính xác';
	}
});

// call validate()
validator([
	isRequired('#fullname'),
	isRequired('#email'),
	isEmail('#email'),
	minLength('#password', 8),
	isRequired('#pass__confirm'),
	isConfirm('#pass__confirm')
]);
