// select the forms
const formReg = document.getElementById('registration')
console.log(formReg);
const formLogin = document.getElementById('login')
//const for the registration form
const usernameReg = formReg.elements['username'];
const emailReg = formReg.elements['email'];
const passwordReg = formReg.elements['password'];
const verifyPass = formReg.elements['passwordCheck'];
const termsCond = formReg.elements['terms'];

// constants for the login form
const usernameLogin = formLogin.elements['username'];
const passwordLogin = formLogin.elements['password'];
const persist = formLogin.elements['persist'];


//* ========= Registration Form Validations ============ */

// username Validation
function usernameValidation() {
    if (usernameReg.value === "") {
        alert("Username field can not be empty.")
        usernameReg.focus();
        return false;
    }
    return usernameReg.value;
}

// email Validation
function emailValidation() {
    let emailValid = emailReg.value;

    if (emailValid === '') {
        alert('Email can not be empty')
        emailReg.focus();
        return false;
    }
    const atpos = emailValid.indexOf('@');
    const dotpos = emailValid.indexOf('.');
    if (atpos < 1) {
        alert('You must provide an email address that does not start with @');
        emailReg.focus();
        return false;
    }

    if (dotpos - atpos < 2) {
        alert('Invalid email. You must include a valid domain after the @ symbol')
        emailReg.focus();
        return false;
    }
    if (emailValid.endsWith("@example.com")) {
        alert('Email addresses from the domain "example.com" are not allowed.')
        emailReg.focus();
        return false;
    }
    // the address provided is valid
    return emailValid;
}

// password validation
function validPassword() {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
    let passwordValid = passwordReg.value;

    // check if the password is empty or contains the word password
    if (passwordValid === "" || passwordValid.trim().toLowerCase() === "password") {
        alert("Invalid password!");
        passwordReg.focus();
        return false;
    }
    //check if the password matches the pattern
    if (!passwordPattern.test(passwordValid)) {
        alert('Invalid Password! \n Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.')
        passwordReg.focus();
        return false;
    }

    // check if the password contains the username
    if (passwordValid.toLowerCase().includes(usernameReg.value.toLowerCase())) {
        alert('Password must not contain the username');
        passwordReg.focus();
        return false;
    }
    // check if passwords match
    if (verifyPass.value !== passwordValid) {
        alert('Passwords do not match.')
        passwordReg.focus()
        return false;
    }
    return passwordValid;
}

// add event listener when the submit button is clicked
formReg.addEventListener('submit', validateFrom);

// function that validates the inputs of the frm
function validateFrom(event) {
    // prevent the form from submitting
    event.preventDefault();

    // get the values of the inputs
    const username = usernameValidation();
    const email = emailValidation();
    const password = validPassword();

    // check if the terms and conditions checkbox is checked
    if (!termsCond.checked) {
        alert('You must agree to the terms and conditions to proceed.')
        event.preventDefault();
        return false;
    }
    // check if all the inputs are valid 
    if (username && email && password) {
        // check if the user already exists
        if (localStorage.getItem(username)) {
            alert('User already exists. Please login')
            return false;
        }
        // check if all the inputs are valid 
        if (username && email && password) {
            // get existing users from local storage or create an empty array if it does not exist
            let users = localStorage.getItem('users');
            users = users ? users.split('|') : [];

            // check if the user already exists based on username
            const userExists = users.some(user => user.toLowerCase().startsWith(`username=${username.toLowerCase()}`));
            const emailExists = users.some(user => user.toLowerCase().includes(`email=${email.toLowerCase()}`));
            

            if (userExists && !emailExists) {
                alert('That username is already taken. Please choose another username.');
                return false;
            } else if (userExists && emailExists) {
                alert('That username and email are already registered. Please login .');
                return false;
            } else if (!userExists && emailExists) {
                alert('That email is already registered. Please login with your username.');
                return false;
            } else {
                // create a new user string
                const newUser = `username=${username.toLowerCase()}|email=${email.toLowerCase()}|password=${password}`;

                // add the new user string to the users array
                users.push(newUser);

                // save the updated users array back to local storage
                localStorage.setItem('users', users.join('|'));

                //clear the form after submission
                formReg.reset();
                alert('Registration Successful')
                return true;
            }
        }
        event.preventDefault();
        return false;
    }
}

// ============ Login Form Validations ============ //
//           ======  Part 4 ======

// add event listener when the submit button is clicked

// validate username for login form
function usernameLoginValidation() {
    if (usernameLogin.value.trim() === "") {
        alert("Username field can not be empty.")
        usernameLogin.focus();
        return false;
    }
    return usernameLogin.value.trim();
}

// validate password for login form
function passwordLoginValidation() {
    if (passwordLogin.value === "") {
        alert("Password field can not be empty.")
        passwordLogin.focus();
        return false;
    }
    return passwordLogin.value;

}

formLogin.addEventListener('submit', validateLogin);

function validateLogin(event) {
    event.preventDefault();

    const username = usernameLoginValidation();
    const password = passwordLoginValidation();
    console.log('Username:', username); // Ensure the username is retrieved correctly
    console.log('Password:', password); // Ensure the password is retrieved correctly

    //if the validation of username or password fails, return false
    if (!username || !password) {
        console.log('Validation failed');
        return false;
    }

   // Retrieve users from localStorage as a string
   let users = localStorage.getItem('users');
   console.log('Users from localStorage:', users); // Check if we retrieve the users correctly

   // Split the users string into an array based on the pipe '|' separator
   users = users ? users.split('|') : [];
   console.log('Users after split:', users); // Check the users array after splitting

   // Iterate over the user data to find a matching username
   let user = null;
   for (let i = 0; i < users.length; i += 3) { // Increment by 3 to reach the next username
       const storedUsername = users[i].split('=')[1]; 
       const storedPassword = users[i + 2].split('=')[1]; 

       // username check
       if (storedUsername.toLowerCase() === username.toLowerCase()) {
           user = { username: storedUsername, password: storedPassword };
           break;
       }
   }

   if (user) {
       // Check if the entered password matches the stored password
       if (user.password === password) {
           alert('Login Successful!');
           formLogin.reset(); // Clear the form after successful login
           return true; // Allow form submission (or perform actions after login)
       } else {
           alert('Incorrect Password. Please try again.');
           return false; // Prevent form submission due to incorrect password
       }
   } else {
       alert('User does not exist. Please register.');
       return false; // Prevent form submission if user doesn't exist
   }
}