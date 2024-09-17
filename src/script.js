// Function to generate a strong random password according to NIST 800-171
function generatePassword(length = 15) {
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+{}|:<>?';
    
    // Ensure the password contains at least one of each type
    let password = '';
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];
    
    const allChars = upperCase + lowerCase + numbers + specialChars;
    
    // Fill the remaining characters randomly from all character sets
    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    // Shuffle the password to avoid predictable patterns
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    return password;
}

// Function to check password strength according to NIST 800-171
function checkPasswordStrength(password) {
    const minLength = 12;
    const upperCasePattern = /[A-Z]/;
    const lowerCasePattern = /[a-z]/;
    const numberPattern = /\d/;
    const specialCharPattern = /[!@#$%^&*()_+{}|:<>?]/;

    const hasUpperCase = upperCasePattern.test(password);
    const hasLowerCase = lowerCasePattern.test(password);
    const hasNumber = numberPattern.test(password);
    const hasSpecialChar = specialCharPattern.test(password);

    if (password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
        return { strength: 'Strong', color: 'green' };
    } else if (password.length >= minLength && (hasUpperCase || hasLowerCase) && hasNumber) {
        return { strength: 'Medium', color: 'orange' };
    } else {
        return { strength: 'Weak', color: 'red' };
    }
}

// Add this function to handle copying to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const copyBtn = document.getElementById('copyBtn');
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
        }, 2000);
    });
}

// Event listeners
document.getElementById('generateBtn').addEventListener('click', () => {
    const password = generatePassword();
    document.getElementById('generatedPassword').value = password;
    const { strength, color } = checkPasswordStrength(password);
    document.getElementById('strengthMessage').textContent = `Password Strength: ${strength}`;
    document.getElementById('strengthMessage').style.color = color;
    
    // Enable the copy button after generating a password
    document.getElementById('copyBtn').disabled = false;
});

document.getElementById('passwordInput').addEventListener('input', (e) => {
    const { strength, color } = checkPasswordStrength(e.target.value);
    document.getElementById('strengthMessage').textContent = `Password Strength: ${strength}`;
    document.getElementById('strengthMessage').style.color = color;
});

// Add event listener for the copy button
document.getElementById('copyBtn').addEventListener('click', () => {
    const password = document.getElementById('generatedPassword').value;
    copyToClipboard(password);
});

// Disable right click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});