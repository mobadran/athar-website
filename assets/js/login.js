const SERVER_URL = 'http://localhost:8080/';

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const rememberCheckbox = document.getElementById('remember');
  const toast = document.getElementById('toast');

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = message;
  }

  function clearError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
  }

  function showToast(message) {
    toast.textContent = message;
    toast.style.display = 'block';

    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
  }

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    clearError(emailInput);
    clearError(passwordInput);

    let isValid = true;
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email) {
      showError(emailInput, 'Please enter your email address');
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError(emailInput, 'Please enter a valid email address');
      isValid = false;
    }

    if (!password) {
      showError(passwordInput, 'Please enter your password');
      isValid = false;
    }

    if (!isValid) return;

    fetch(SERVER_URL + 'api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
      .then(response => {
        try {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Invalid email or password');
          }
        } catch {
          console.log('Error:', response.status);
          throw new Error('Invalid email or password');
        }
      })
      .then(data => {
        console.log(data.accessToken);
        localStorage.setItem("accessToken", data.accessToken); // Store the access token in localStorage
        window.location.href = '../dashboard';
      })
      .catch(error => {
        console.error('Error:', error);
        showError(emailInput, 'Invalid email or password');
        showError(passwordInput, 'Invalid email or password');
      });
  });

  emailInput.addEventListener('focus', () => clearError(emailInput));
  passwordInput.addEventListener('focus', () => clearError(passwordInput));
  document.querySelector('.google-btn').addEventListener('click', function () {
    alert('Google authentication would be implemented here in a production environment.');
  });

  // TODO: Forgot Password
  // document.querySelector('.forgot-password').addEventListener('click', function (e) {
  //   e.preventDefault();

  //   const email = emailInput.value.trim();
  //   if (email && isValidEmail(email)) {
  //     showToast('Password reset instructions sent to your email');
  //   } else {
  //     showError(emailInput, 'Please enter a valid email to reset your password');
  //   }
  // });
});
