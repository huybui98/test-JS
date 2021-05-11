// Declare variable
const form = document.getElementById('form');
const nameFood = form.querySelector('#name');
const price = form.querySelector('#price');
const rate = form.querySelector('#rate');
const list = document.querySelector('.list');
const addBtn = form.querySelector('.add');
const saveBtn = form.querySelector('.save');

const mockApi = 'https://609a429a0f5a13001721a72a.mockapi.io/listFood';

function start() {
	getListFood(render);
	handleAddFood();
}
start();

// get list food
function getListFood(callback) {
	fetch(mockApi)
		.then((response) => response.json())
		.then(callback);
}

// render
function render(foods) {
	const html = foods.map((food) => {
		return `<li class= "food-item-${food.id}">
					<h2>Mã số: ${food.id} <span>${food.nameFood}</span> </h2>
					<p>Price: <span class='special'>${food.price}$</span></p>
					<p>Rate: ${food.rate} stars</p>
					<button class="edit" onclick="handelEditFood(${food.id},'${food.nameFood}',${food.price},${food.rate})">Edit</button>
					<button class="del" onclick="deleteFood(${food.id})">Delete</i></button>
				</li>`;
	});
	list.innerHTML = html.join('');
}

function handleAddFood() {
	form.onsubmit = (e) => {
		e.preventDefault();
		const foodData = {
			nameFood: nameFood.value,
			price: price.value,
			rate: rate.value
		};
		addFood(foodData);
		form.reset();
	};
}

function addFood(data) {
	const objAdd = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: JSON.stringify(data)
	};
	fetch(mockApi, objAdd)
		.then((response) => response.json())
		.then(() => {
			getListFood(render);
		});
}

// delete food
function deleteFood(id) {
	if (confirm('Are you sure you want to delete this food?')) {
		const objDel = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			}
		};
		fetch(`${mockApi}/${id}`, objDel)
			.then((response) => response.json())
			.then(function () {
				const foodItem = document.querySelector(`.food-item-${id}`);
				foodItem && foodItem.remove();
			});
	}
}

// edit food
function handelEditFood(id, nameFoodEdit, priceEdit, rateEdit) {
	nameFood.value = nameFoodEdit;
	price.value = priceEdit;
	rate.value = rateEdit;
	addBtn.style.display = 'none';
	saveBtn.style.display = 'block';
	form.onsubmit = (e) => {
		e.preventDefault();
		addBtn.style.display = 'block';
		saveBtn.style.display = 'none';

		const foodData = {
			nameFood: nameFood.value,
			price: price.value,
			rate: rate.value
		};
		editFood(id, foodData);

		setTimeout(() => {
			location.reload();
		}, 1000);
	};
}

function editFood(id, data) {
	const objEdit = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	};
	fetch(`${mockApi}/${id}`, objEdit)
		.then((response) => response.json())
		.then(() => {
			getListFood(render);
		});
}
