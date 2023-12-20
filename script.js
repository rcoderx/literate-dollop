function submitForm() {
    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);

    fetch('automatic-octo-fortnight-production.up.railway.app/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Display the server's response
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
