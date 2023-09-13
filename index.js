
// window.addEventListener('load', () => {  == pura page load hone ke baad iske andar ka function exectue hoga ,add eventlistener to window object

window.addEventListener('load', () => {
	//let todos = JSON.parse(localStorage.getItem('todos')) || [];
	//Here, the code is attempting to retrieve data from the browser's localStorage using the 
	//key 'todos'. The localStorage is a storage area that persists data even after the user closes the browser.
	// The JSON.parse() function is used to convert the stored JSON string into a JavaScript object. If there is no 
	//'todos' key in the localStorage, or if the value is not valid JSON, an empty array [] is used as the default value
	// for the todos variable.
	let todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.querySelector('#name');//kya name dalna hai
	const newTodoForm = document.querySelector('#new-todo-form'); //konsi item add krni hai
	const filterSelect = document.querySelector('#filter');//to choose filter
	const sortSelect = document.querySelector('#sort');//to fetch data present in sort id
	const searchInput = document.querySelector('#search');

	const username = localStorage.getItem('username') || '';
	nameInput.value = username;//what's up main name dene ke liye

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);//jab name change kre toh browser ki local storage mai jo ab name dala hai vo ajaye
	});
	

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();//submit krne ke baad pura page refresh na ho

		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
			


		};

		// console.log("createdAt:", new Date().getTime());//to show timestamp..

		todos.push(todo);//todos main push kardia yeh upar wala todo object
		localStorage.setItem('todos', JSON.stringify(todos));//javascript object ko json sting main convert krdia
		e.target.reset();
		DisplayTodos();
	});

	filterSelect.addEventListener('change', () => {//jaise hi kuch change hi todos man display hojayegA
		DisplayTodos();
	});

	sortSelect.addEventListener('change', () => {
		DisplayTodos();
	});

	searchInput.addEventListener('input', () => {
		DisplayTodos();
	});

	DisplayTodos();
});
function DisplayTodos() {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	let todos = JSON.parse(localStorage.getItem('todos')) || [];
	const filterSelect = document.querySelector('#filter');
	const sortSelect = document.querySelector('#sort');
	const searchInput = document.querySelector('#search');
	const searchTerm = searchInput.value.toLowerCase();

	// Filter todos based on search term
	todos = todos.filter(todo => todo.content.toLowerCase().includes(searchTerm));
	const filter = filterSelect.value;
	const sortOption = sortSelect.value;

	if (filter !== 'all') {
		todos = todos.filter(todo => todo.category === filter);
	}

	if (sortOption === 'newest') {
		todos.sort((a, b) => b.createdAt - a.createdAt);
	} else if (sortOption === 'oldest') {
		todos.sort((a, b) => a.createdAt - b.createdAt);
		

	}

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		}
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}

		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

	})
}
