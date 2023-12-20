const urlParams = new URLSearchParams(window.location.search);
const refereeAddressParam = urlParams.get('ref');

// Function to populate the referee address input field
function populateRefereeAddress() {
    // Check for the 'ref' query parameter in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const refereeAddressParam = urlParams.get('ref');

    // Fill the input field if 'ref' parameter is present
    if (refereeAddressParam) {
        document.getElementById('refereeAddress').value = refereeAddressParam;
    }
}

// Call the function to populate the referee address input field when the page loads
window.addEventListener('load', populateRefereeAddress);

// Rest of your code...


function submitForm() {
    const userAddress = document.getElementById('userAddress').value;
    const refereeAddress = document.getElementById('refereeAddress').value;
// Check for the 'ref' query parameter in the URL


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
            setRegistrationCookie(); // Set the registration cookie here
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
function exportToCSV() {
    // Trigger a GET request to the /export-csv endpoint
    fetch('https://automatic-octo-fortnight-production.up.railway.app/export-csv')
        .then(response => {
            if (response.ok) {
                // If the export is successful, prompt the user to download the CSV
                return response.blob();
            } else {
                throw new Error('Export failed');
            }
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'user_data.csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
function setRegistrationCookie() {
    document.cookie = "registered=true; max-age=86400; path=/"; // Expires in 1 day
}
window.onload = function() {
    if (document.cookie.split(';').some((item) => item.trim().startsWith('registered='))) {
        document.getElementById('registrationForm').style.display = 'none';
    }
};
