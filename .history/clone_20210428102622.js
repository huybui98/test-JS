notes = [
	{
		contents: 'Hello World 1',
		function: console.log,
		children: [
			{
				contents: 'Hello World A',
				function: console.log,
				children: [
					{
						a: 1,
						b: 2
					},
					{
						a: 2,
						b: 3
					}
				]
			}
		]
	},
	{
		contents: 'Hello World 2',
		function: console.log,
		children: []
	}
];

let info = {
	school: 'PTIT',
	class: 'VT',
	teacher: 'Mentor',
	term: 2021,
	subject: {
		math: {
			a: 10,
			b: 9
		},
		biology: {
			a: 7,
			b: 8
		}
	},
	results: [
		{
			a: 1,
			b: 2
		},
		{
			c: 3,
			d: 4
		},
		[1, 2, 3, [2, 3], { a: 1 }]
	]
};

function cloneObj(obj) {
	let clone = {};
	for (var i in obj) {
		if (typeof obj[i] == 'object' && obj[i] != null) {
			clone[i] = cloneObj(obj[i]);
		} else {
			clone[i] = obj[i];
		}
		if (Array.isArray(obj[i])) {
			const copy = (items) =>
				items.map((item) => (Array.isArray(item) ? copy(item) : cloneObj(item)));
			clone[i] = copy(obj[i]);
		}
	}
	return clone;
}

// let copyObj = cloneObj(info);
// copyObj.subject.math.a = 20;
// console.log(copyObj);
// console.log('------------------------------------------');
// console.log(info);

