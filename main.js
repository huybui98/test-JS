// Declare variable
const form = document.getElementById('form');
const id = form.querySelector('#id');
const nameFood = form.querySelector('#name');
const price = form.querySelector('#price');
const rate = form.querySelector('#rate');
const list = document.querySelector('.list');

const addBtn = form.querySelector('.add');
const saveBtn = form.querySelector('.save');

const listFood = JSON.parse(localStorage.getItem('listFood')) || [];

function Validator(arr) {
	arr.forEach((e) => {
		const input = form.querySelector(e.selector);
		const mess = input.parentElement.querySelector('.mess');

		input.onblur = function () {
			if (e.test(input.value)) {
				mess.innerText = e.test(input.value);
				input.parentElement.classList.add('invalid');
			} else {
				mess.innerText = '';
				input.parentElement.classList.remove('invalid');
			}
		};

		input.oninput = function () {
			mess.innerText = '';
			input.parentElement.classList.remove('invalid');
		};
	});

	form.onsubmit = function (event) {
		event.preventDefault();
		arr.forEach((e) => {
			const input = form.querySelector(e.selector);
			input.onblur();
		});

		const checkError = arr.every((element) => {
			const inputCheck = form.querySelector(element.selector);
			return element.test(inputCheck.value) === undefined;
		});
		if (checkError) {
			checkID();
		}
	};
	render();
}

// check id for not same
function checkID() {
	const checkID = listFood.every((element) => {
		return element.id !== id.value;
	});
	if (checkID) {
		addFood(id.value, nameFood.value, price.value, rate.value);
		render();
		location.reload();
	} else {
		alert('ID has not been entered or the same id. Please re-fill');
	}
}

// Save in localStorage
function addFood(id, nameFood, price, rate) {
	listFood.push({
		id,
		nameFood,
		price,
		rate
	});
	localStorage.setItem('listFood', JSON.stringify(listFood));
}

// render
function render() {
	const addDots = (str, min) => {
		if (str.length > min) {
			str = str.substr(0, min) + '...';
		}
		return str;
	};
	const html = listFood.map((food, index) => {
		return `<li>
					<h2>Mã số: ${food.id} <span>${addDots(food.nameFood, 10)}</span> </h2>
					<p>Price: <span class='special'>${food.price}$</span></p>
					<p>Rate: ${food.rate} stars</p>
					<button class="edit" onclick="editFood(${index})"><i class="fas fa-edit icon icon-edit"></i></button>
					<button class="del" onclick="deleteFood(${index})"><i class="fas fa-trash icon icon-remove"></i></button>
				</li>`;
	});
	list.innerHTML = html.join('');
}

// delete food
function deleteFood(index) {
	if (confirm('Are you sure you want to delete this food?')) {
		listFood.splice(index, 1);
		localStorage.setItem('listFood', JSON.stringify(listFood));
		// render();
		location.reload();
	}
}

// edit food
function editFood(index) {
	if (confirm('Please re-fill form!')) {
		id.value = listFood[index].id;
		nameFood.value = listFood[index].nameFood;
		price.value = listFood[index].price;
		rate.value = listFood[index].rate;

		addBtn.style.display = 'none';
		saveBtn.style.display = 'block';

		form.onsubmit = function (event) {
			event.preventDefault();

			addBtn.style.display = 'block';
			saveBtn.style.display = 'none';
			listFood[index].id = id.value;
			listFood[index].nameFood = nameFood.value;
			listFood[index].price = price.value;
			listFood[index].rate = rate.value;

			const arr = [
				isRequired('#id'),
				isRequired('#name'),
				isIntegerPrice('#price'),
				isRate('#rate')
			];
			arr.forEach((e) => {
				const input = form.querySelector(e.selector);
				input.onblur();
			});
			const checkError = arr.every((element) => {
				const inputCheck = form.querySelector(element.selector);
				return element.test(inputCheck.value) === undefined;
			});
			if (checkError) {
				localStorage.setItem('listFood', JSON.stringify(listFood));
				render();
				location.reload();
			}
		};
	}
}

// search/filter by field
const liElement = document.getElementsByTagName('li');
function search(tagElement, number, event) {
	Array.from(liElement).filter((item) => {
		const searchText = item.getElementsByTagName(`${tagElement}`)[number]
			.innerText;
		return searchText.includes(event.target.value.toUpperCase())
			? (item.style.display = 'block')
			: (item.style.display = 'none');
	});
}

// Validate form
const isRequired = (selector) => ({
	selector,
	test: function (value) {
		return value ? undefined : 'Vui lòng nhập trường này';
	}
});

const isIntegerPrice = (selector) => ({
	selector,
	test: function (value) {
		if (!value) return 'Vui lòng nhập trường này';
		else if (value > 0) return undefined;
		return 'Giá tiền đươc nhập không đúng';
	}
});

const isRate = (selector) => ({
	selector,
	test: function (value) {
		if (!value) return 'Vui lòng nhập trường này';
		else if (value <= 5 && value >= 1) return undefined;
		return 'Đánh giá của bạn không đúng';
	}
});

Validator([
	isRequired('#id'),
	isRequired('#name'),
	isIntegerPrice('#price'),
	isRate('#rate')
]);
