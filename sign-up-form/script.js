let email = document.getElementById("email");
let phone = document.getElementById("phone-number");
let password = document.getElementById("password");
let confirm_password = document.getElementById("confirm-password");
let login_password = document.getElementById("login-password");

let password_element = document.getElementsByClassName("row")[2].children[0];

let signup_form = document.getElementById("signup-form");
let login_form = document.getElementById("login-form");

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
let lowerCaseRegex = /[a-z]/g;
let upperCaseRegex = /[A-Z]/g;
let numberRegex = /[0-9]/g;

let password_mismathch = document.createElement('div');

let lowercase = document.getElementById("lower-case");
let uppercase = document.getElementById("upper-case");
let number = document.getElementById("number");
let length = document.getElementById("length");


email.addEventListener("input", (event) => {
  if (email.value.match(emailRegex)) {
    email.setCustomValidity("");
  }
  else {
    email.setCustomValidity("Please enter a valid email address");
  }
});

phone.addEventListener("input", (event) => {
  if (phone.value.match(phoneRegex)) {
    phone.setCustomValidity("");
  }
  else {
    phone.setCustomValidity("Please enter a valid phone number");
  }
});


password.onfocus = function () {
  document.getElementById("password-message").style.display = "block";
};

password.onblur = function () {
  document.getElementById("password-message").style.display = "none";
};

password.onkeyup = () => {
  if (password.value.match(lowerCaseRegex)) {
    lowercase.classList.remove("invalid");
    lowercase.classList.add("valid");
  } else {
    lowercase.classList.remove("valid");
    lowercase.classList.add("invalid");
  }

  if (password.value.match(upperCaseRegex)) {
    uppercase.classList.remove("invalid");
    uppercase.classList.add("valid");
  } else {
    uppercase.classList.remove("valid");
    uppercase.classList.add("invalid");
  }

  if (password.value.match(numberRegex)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  if (password.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
};


confirm_password.addEventListener("input", (event) => {
  if (password.value != confirm_password.value || password.value == "" && confirm_password.value == "") {
    password.style.borderColor = "rgb(255, 0, 0)";
    confirm_password.style.borderColor = "rgb(255, 0, 0)";
    password_mismathch.textContent = "*Passwords do not match";
    password_mismathch.style.color = "rgb(255, 0, 0)";
    password_mismathch.style.fontSize = "12px"
    password_element.appendChild(password_mismathch);
  }
  else {
    confirm_password.style.borderColor = "rgb(0, 255, 0)";
    password.style.borderColor = "rgb(0, 255, 0)";
    password_element.removeChild(password_mismathch);
  }
});

signup_form.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Form Submitted Successfully!");
  window.location.replace("login.html");
});