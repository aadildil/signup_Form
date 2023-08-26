const signUpButton = document.getElementById("signUpButton");
const logOutButton = document.getElementById("logOutButton");
const headerSignUpButton = document.getElementById("headerSignUp");
const profileButton = document.getElementById("profileButton");

const nameField = document.getElementById("fullName");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const confirmPasswordField = document.getElementById("confirmPassword");
const errorMessage = document.getElementById("error");
const successMessage = document.getElementById("success");

const container = document.getElementsByClassName("container")[0];
const profileContainer = document.getElementsByClassName("profile-container")[0];

const profileName = document.querySelector(".profileName");
const profileEmail = document.querySelector(".profileEmail");
const profilePassword = document.querySelector(".profilePassword");

let user = {};


function signUpFucntion(event) {
    event.preventDefault();
    const name = nameField.value;
    const email = emailField.value;
    const password = passwordField.value;
    const confirmPassword = confirmPasswordField.value;

    if (name === "" || name === null) {

        errorMessage.innerText = "Error : please enter full name";
        errorStyle(nameField);
    }
    else if (email === "" || email === null) {
        errorMessage.innerText = "Error : please enter email";
        errorStyle(emailField);
    }
    else if (!emailField.checkValidity()) {
        errorMessage.innerText = "Email is invalid";
        errorStyle(emailField);

    }
    else if (password === "" || password === null) {
        errorMessage.innerText = "Error : please enter password";
        errorStyle(passwordField);
    }

    else if (confirmPassword === "" || confirmPassword === null) {
        errorMessage.innerText = "Error : please confirm password";
        errorStyle(confirmPasswordField);
    }
    else if (confirmPassword !== password) {
        errorMessage.innerText = "passwords are not matching"
        errorStyle(passwordField);
        errorStyle(confirmPasswordField);
    }
    else {
        successMessage.innerText = "Successfully Signed up"
        setTimeout(() => {
            setProfileDetails(name, email, password);
        }, 1500);


        nameField.value = "";
        emailField.value = "";
        passwordField.value = "";
        confirmPasswordField.value = "";
    }



}

function setProfileDetails(name, email, password) {
    profileName.innerText = `Full name : ${name}`;
    profileEmail.innerText = `Email : ${email}`;
    profilePassword.innerText = `Password : ${password}`;

    user = {
        fullName: name,
        email: email,
        password: password,
        accessToken: generateAccessToken()
    };
    localStorage.setItem('user', JSON.stringify(user));

    container.style.display = "none";
    profileContainer.style.display = "block";
    successMessage.innerText = ""
    errorMessage.innerText = "";
}

// Function to generate a random access token
function generateAccessToken() {
    const random = new Uint8Array(16);
    window.crypto.getRandomValues(random);
    return Array.from(random, byte => byte.toString(16).padStart(2, '0')).join('');
}

function logOutFunction() {
    localStorage.removeItem('user');
    profileContainer.style.display = 'none';
    container.style.display = 'block';
    successMessage.innerText = "";
    errorMessage.innerText = "";
    user={};
}

//onload checking for stored information
const storedUser = localStorage.getItem('user');
if (storedUser) {
    user = JSON.parse(storedUser);
    setProfileDetails(user.fullName, user.email, user.password);
    container.style.display = "none";
    profileContainer.style.display = "block";
}


//form sign up button
signUpButton.addEventListener("click", signUpFucntion);

//for logout
logOutButton.addEventListener("click", logOutFunction)

//for header signup
headerSignUpButton.addEventListener('click', () => {
    if (Object.keys(user).length === 0) {

    }
    else {
        window.alert("already logged in");
    }
})

profileButton.addEventListener('click', () => {
    if (Object.keys(user).length === 0) {
        window.alert("please create an account to log in");
    }
    else {

    }
})


nameField.addEventListener("focus", () => {
    errorMessage.innerText = "";
    clearErrorStyle();
})
passwordField.addEventListener("focus", () => {
    errorMessage.innerText = "";
    clearErrorStyle();
})
confirmPasswordField.addEventListener("focus", () => {
    errorMessage.innerText = "";
    
    clearErrorStyle();
})
emailField.addEventListener("focus", () => {
    errorMessage.innerText = "";
    clearErrorStyle();
})



function errorStyle(field)
{
    field.style.borderBottomColor="red"

}
function clearErrorStyle()
{
    nameField.style.borderBottomColor="white";
    emailField.style.borderBottomColor="white";
    passwordField.style.borderBottomColor="white";
    confirmPasswordField.style.borderBottomColor="white";
}
