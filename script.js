function submitForm() {
    const userAddress = document.getElementById('userAddress').value;
    const refereeAddress = document.getElementById('refereeAddress').value;
// Check for the 'ref' query parameter in the URL
const urlParams = new URLSearchParams(window.location.search);
const refereeAddressParam = urlParams.get('ref');

// Fill the input field if 'ref' parameter is present
if (refereeAddressParam) {
    document.getElementById('refereeAddress').value = refereeAddressParam;
}

    if (!userAddress) {
        alert('Please enter your Solana address.');
        return;
    }

    if (refereeAddress && refereeAddress === userAddress) {
        alert("Referee's address cannot be the same as yours.");
        return;
    }

    const formData = {
        twitterUsername: document.getElementById('twitterUsername').value,
        telegramUsername: document.getElementById('telegramUsername').value,
        userAddress: userAddress,
        refereeAddress: refereeAddress
    };

    // Convert formData to JSON format
    const jsonData = JSON.stringify(formData);
    console.log('Data being sent to the server:', formData);

    fetch('https://automatic-octo-fortnight-production.up.railway.app/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData  // Send the JSON data
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'Registration successful') {
            alert('Registered successfully!');
        } else {
            alert(data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function fetchReferralCount() {
    const userAddress = document.getElementById('checkAddress').value;
    
    if (!userAddress) {
        alert('Please enter your Solana address.');
        return;
    }

    fetch(`https://automatic-octo-fortnight-production.up.railway.app/referrals/${userAddress}`)
    .then(response => response.json())
    .then(data => {
        alert(`Total referrals: ${data.referralCount}`);
    })
    .catch(error => console.error('Error:', error));
}
function generateReferralLink() {
    const userAddress = document.getElementById('userAddress').value;
    const registrationURL = `https://yourfrontenddomain.com/register?ref=${userAddress}`;
    alert('Your referral link:\n' + registrationURL);
}
