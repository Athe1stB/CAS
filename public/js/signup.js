let password = document.getElementById('form3Example4c');
let password1 = document.getElementById('form3Example4cd');
let email = document.getElementById('form3Example3c');
let name = document.getElementById('form3Example1c');
let errorMsg = document.getElementById('errorMsg');
let register = document.getElementById('register');

let matchPass = false;
let validEmail = false;

register.disabled = true;

function toggleRegisterButton(m, e) {
    if (m && e)
        register.disabled = false;
    else
        register.disabled = true;
};

password1.onchange = (e) => {
    console.log(e);
    if (password.value === password1.value) {
        errorMsg.innerText = "Password Matches";
        errorMsg.classList.remove('red');
        errorMsg.classList.add('green');
        matchPass = true;
    } else {
        errorMsg.innerText = "Passwords doesn't match!";
        errorMsg.classList.remove('green');
        errorMsg.classList.add('red');
        matchPass = false;
    }
    toggleRegisterButton(validEmail, matchPass);
};

email.onchange = () => {
    let exp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.value.match(exp)) {
        errorMsg.innerText = " ";
        errorMsg.classList.remove('red');
        errorMsg.classList.add('green');
        validEmail = true;
    } else {
        errorMsg.innerText = "Not a valid email";
        errorMsg.classList.remove('green');
        errorMsg.classList.add('red');
        validEmail = false;
    }
    toggleRegisterButton(validEmail, matchPass);
};