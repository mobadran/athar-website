let selectedPlan = 'premium';

function selectPlan(plan) {
  selectedPlan = plan;
  document.querySelectorAll('.plan-card').forEach((card) => {
    card.classList.remove('selected');
  });

  document.querySelector(`.plan-card[data-plan="${plan}"]`).classList.add('selected');
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
}

function showError(fieldId, isError, customMessage) {
  const field = document.getElementById(fieldId);
  const formGroup = field.closest('.form-group');

  if (isError) {
    formGroup.classList.add('error');
    if (customMessage) {
      formGroup.querySelector('.error-message').textContent = customMessage;
    }
  } else {
    formGroup.classList.remove('error');
  }
}

function validateForm() {
  let isValid = true;

  // Account Information
  const firstName = document.getElementById('first-name').value.trim();
  const isFirstNameValid = firstName !== '';
  showError('first-name', !isFirstNameValid);
  isValid = isValid && isFirstNameValid;

  const lastName = document.getElementById('last-name').value.trim();
  const isLastNameValid = lastName !== '';
  showError('last-name', !isLastNameValid);
  isValid = isValid && isLastNameValid;

  const email = document.getElementById('email').value.trim();
  const isEmailValid = isValidEmail(email);
  showError('email', !isEmailValid);
  isValid = isValid && isEmailValid;

  const password = document.getElementById('password').value;
  const isPasswordValid = isValidPassword(password);
  showError('password', !isPasswordValid);
  isValid = isValid && isPasswordValid;

  const confirmPassword = document.getElementById('confirm-password').value;
  const isConfirmPasswordValid = confirmPassword === password;
  showError('confirm-password', !isConfirmPasswordValid);
  isValid = isValid && isConfirmPasswordValid;

  const restaurantName = document.getElementById('restaurant-name').value.trim();
  const isRestaurantNameValid = restaurantName !== '';
  showError('restaurant-name', !isRestaurantNameValid);
  isValid = isValid && isRestaurantNameValid;

  const cuisineType = document.getElementById('food-type').value;
  const isCuisineTypeValid = cuisineType !== '';
  showError('food-type', !isCuisineTypeValid);
  isValid = isValid && isCuisineTypeValid;

  const restaurantAddress = document.getElementById('restaurant-address').value.trim();
  const isRestaurantAddressValid = restaurantAddress !== '';
  showError('restaurant-address', !isRestaurantAddressValid);
  isValid = isValid && isRestaurantAddressValid;

  function saveToLocalStorage() {
    const userData = {
      userType: 'business',
      firstName: document.getElementById('first-name').value.trim(),
      lastName: document.getElementById('last-name').value.trim(),
      email: document.getElementById('email').value.trim(),
      createdAt: new Date().toISOString(),
      business: {
        restaurantName: document.getElementById('restaurant-name').value.trim(),
        cuisineType: document.getElementById('food-type').value,
        address: document.getElementById('restaurant-address').value.trim(),
        plan: selectedPlan,
      },
    };

    const userId = 'user_' + Date.now();
    const existingUsers = JSON.parse(localStorage.getItem('Athar-users')) || [];

    existingUsers.push({
      id: userId,
      ...userData,
    });

    localStorage.setItem('Athar-users', JSON.stringify(existingUsers));
    localStorage.setItem('currentAthar-users', userId);

    return userId;
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';

    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
  }

  document.getElementById('businessSignupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    if (validateForm()) {
      const userId = saveToLocalStorage();
      showToast('Business account created successfully!');
      this.reset();
      setTimeout(() => {
        window.location.href = '../dashboard/';
      }, 2000);

      console.log('Business user created with ID:', userId);
    }
  });

  document.getElementById('email').addEventListener('blur', function () {
    const isEmailValid = isValidEmail(this.value.trim());
    showError('email', !isEmailValid);
  });

  document.getElementById('password').addEventListener('blur', function () {
    const isPasswordValid = isValidPassword(this.value);
    showError('password', !isPasswordValid);
  });

  document.getElementById('confirm-password').addEventListener('input', function () {
    const password = document.getElementById('password').value;
    const isConfirmPasswordValid = this.value === password;
    showError('confirm-password', !isConfirmPasswordValid);
  });
}
