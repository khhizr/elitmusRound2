const form = document.querySelector('form');
const center = document.querySelector('.center');
const grid = document.querySelector('.image-grid');

form.addEventListener('submit', async (event) => {
	event.preventDefault();
	const name = event.target.elements.name.value;
	const response = await fetch(`http://localhost:3000/user/${name}`);
	const data = await response.json();
	grid.innerHTML = '';
	center.innerHTML = '';

	if (data.length === 0) {
        center.innerHTML = 'No user found';
    }
	else{
		// Display the name, email, and ID in the center of the page
	const h2 = document.createElement('h2');
	h2.textContent = `${data[0].name}'s Dashboard`;
	center.appendChild(h2);

	
	const p2 = document.createElement('p');
	p2.textContent = `Email: ${data[0].email}`;
	center.appendChild(p2);

	const p3 = document.createElement('p');
	p3.textContent = `Test ID: ${data[0].id}`;
	center.appendChild(p3);

	data.forEach((item) => {
		const div = document.createElement('div');
		div.classList.add('image');
		div.style.backgroundImage = `url(data:image/png;base64,${item.photo})`;
		const timestamp = document.createElement('p');
		timestamp.textContent = `Timestamp: ${item.timestamp}`;
		div.appendChild(timestamp);
		grid.appendChild(div);
	});
	}

	
});