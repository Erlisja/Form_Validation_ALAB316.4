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
function usernameValidation (){
  if (usernameReg.value === "" ){
    alert ("Username field can not be empty.")
    usernameReg.focus();
    return false;
  }
  return usernameReg.value;
}

// email Validation
function emailValidation (){
   let emailValid = emailReg.value;

   if(emailValid === ''){
    alert ('Email can not be empty')
    emailReg.focus();
    return false;
   }
   const atpos = emailValid.indexOf('@');
   const dotpos = emailValid.indexOf('.');
   if (atpos < 1) {
    alert ('You must provide an email address that does not start with @');
    emailReg.focus();
    return false;
   }

   if (dotpos - atpos < 2){
    alert ('Invalid email. You must include a valid domain after the @ symbol')
    emailReg.focus();
    return false;
   }
   if (emailValid.endsWith("@example.com")){
    alert ('Email addresses from the domain "example.com" are not allowed.')
    emailReg.focus();
    return false;
   }
   // the address provided is valid
   return emailValid;
}

// password validation
function validPassword (){
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]$/;
    let passwordValid = passwordReg.value;

    // check if the password is empty or contains the word password
    if ( passwordValid === ""  || passwordValid.trim().toLowerCase() === "password"){
        alert ("Invalid password!");
        passwordReg.focus();
        return false;
    }
    //check if the password matches the pattern
    if (!passwordPattern.test(passwordValid)){
        alert ('Invalid Password! \n Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.')
        passwordReg.focus();
        return false;
    }
    
    // check if the password contains the username
    if (passwordValid.toLowerCase().includes(usernameReg.value.toLowerCase())){
        alert ('Password must not contain the username');
        passwordReg.focus();
        return false;
    }
    // check if passwords match
    if (verifyPass.value !== passwordValid){
        alert ('Passwords do not match.')
        passwordReg.focus()
        return false;
    }
    return passwordValid;
}

// add event listener when the submit button is clicked
formReg.addEventListener('submit',validateFrom);

// function that validates the inputs of the frm
function validateFrom (event){
    const username = usernameValidation();
    const email = emailValidation();
    const password = validPassword();
    // check if the terms and conditions checkbox is checked
    if (!termsCond.checked){
        alert ('You must agree to the terms and conditions to proceed.')
        event.preventDefault();
        return false;
    }
    return true;

    if (!username ){
        event.preventDefault();
        return false;
    }
    return true;

    if(!email) {
        event.preventDefault();
        return false; 
    }
    return true;
    if( !password){
        event.preventDefault();
        return false; 
    }
    return true;
}