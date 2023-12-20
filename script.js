function submitForm() {
    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);

    fetch('automatic-octo-fortnight-production.up.railway.app/submit', { // Replace with your actual backend domain
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if(data === 'Registration successful') {
            const userAddress = document.getElementById('userAddress').value;
            const referralLink = `https://yourfrontenddomain.com/${userAddress}`; // Replace with your actual frontend domain
            alert('Registered successfully!\nYour referral link: ' + referralLink);
        } else {
            alert(data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
