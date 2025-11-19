// Getting elements
const emailInput = document.getElementById('email-input');
const submitButton = document.getElementById('submit-button');
const dismissButton = document.getElementById('dismiss-button');
const signupCard = document.getElementById('signup-card');
const successCard = document.getElementById('success-card');
const errorMessage = document.getElementById('error-message');
const userEmailSpan = document.getElementById('user-email');


// Show error state
function showError() {
    errorMessage.classList.remove('hidden');
    emailInput.classList.add('error-input');
}

// Hide error state
function hideError() {
    errorMessage.classList.add('hidden');
    emailInput.classList.remove('error-input');
}

// Switch to success stage
const showSuccessMessage = (email) => {
    signupCard.classList.add('hidden');
    successCard.classList.remove('hidden');
    userEmailSpan.textContent = email;
};

// Switch  to signup stage
function showSignupStage() {
    successCard.classList.add('hidden');
    signupCard.classList.remove('hidden');
    emailInput.value = '';
    hideError();
}

// Email validation function
const validateEmail = (email) => {
    const domain = email.split('@')[1];
    const emailDomain = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'collman.com'];
    
    if (email === '' || !email.includes('@')) {
        showError();
        return false;
    }
    if (!emailDomain.includes(domain)) {
        showError();
        return false;
    } else {
        hideError();
    }
    
    return true;
};
// "Enable/disable" submit button based on email validity
emailInput.addEventListener('input', updateButtonState);

function updateButtonState() {
    const email = emailInput.value.trim();
    if (validateEmail(email)) {
        submitButton.classList.add('enabled-button');
    } else {
        submitButton.classList.remove('enabled-button');
    }
}

// Handle form submission
submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    // Validate email
    if (validateEmail(email)) {
        showSuccessMessage(email);
    }
});

// Handle dismiss button

dismissButton.addEventListener('click', function() {
    showSignupStage();
});

// Hide error when user starts typing
emailInput.addEventListener('input', function() {
    if (!errorMessage.classList.contains('hidden')) {
        hideError();
    }
});
