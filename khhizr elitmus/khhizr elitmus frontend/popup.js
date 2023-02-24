// Get the form element
const form = document.getElementById('my-form');

// Add an event listener for when the form is submitted
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const id = document.getElementById('id').value;

    // Open a new page with the live feed
    const newPage = window.open('live_feed.html', '_blank');

    // Pass the input values to the new page using localStorage
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('id', id);

    window.close();
});