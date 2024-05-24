import { db_am } from '../database/sendEmail.js';

const modalSignUp = document.getElementById('modalSignUp');
const form = document.getElementById('modalSignUpForm');
const result = document.getElementById('resultModalSignUp');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.classList.add('active');
    result.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>'
    result.innerHTML += `<p>${db_am[0]}</p>`;

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json,
    })
        .then(async (response) => {
            if (response.status == 200) {
                result.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
                result.innerHTML += `<p>${db_am[1]}</p>`;
            } else {
                console.log(response);
                result.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>'
                result.innerHTML += `<p>${db_am[2]}</p>`;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>'
            result.innerHTML += `<p>${db_am[2]}</p>`;
        })
        .then(function () {
            form.reset();

            setTimeout(() => {
                modalSignUp.classList.remove('active');
                result.classList.remove('active');
            }, 4000);
        });
});
