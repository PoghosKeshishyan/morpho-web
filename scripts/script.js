import database from "../database/index.js";


/**
===========================================
 @SELECTORS
===========================================
*/

const modalSignUp = document.getElementById('modalSignUp');
const signUpBtn = document.getElementById('signUpBtn');
const closeSignUpModal = document.getElementById('closeSignUpModal');
const modalCourses = document.getElementById('modalCourses');
const modalCoursesTitle = document.getElementById('modalCoursesTitle');
const modalCoursesText = document.getElementById('modalCoursesText');


/**
===========================================
 @EVENT_LISTENERS
===========================================
*/

document.addEventListener('DOMContentLoaded', onLoadDom);
signUpBtn.addEventListener('click', signUpModalFunc);
closeSignUpModal.addEventListener('click', closeSignUpModalFunc);
modalCourses.addEventListener('click', handlerModalCourses);


/**
===========================================
 @FUNCTIONS
===========================================
*/

function onLoadDom() {
    const courseButtons = document.querySelectorAll('.courses-btns-container a');

    courseButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const course = this.getAttribute('data-course');
            openModalCoursesFunc(course);
        });
    });
}

function signUpModalFunc(event) {
    event.preventDefault();
    modalSignUp.classList.add('active');
}

function closeSignUpModalFunc() {
    modalSignUp.classList.remove('active');
}

function openModalCoursesFunc(course) {
    if (database[course]) {
        const courseDetails = database[course];

        modalCourses.classList.add('active');
        modalCoursesTitle.innerText = courseDetails.title;
        modalCoursesText.innerText = courseDetails.description;
    } else {
        console.error(`Course ${course} not found in database`);
    }
}

function handlerModalCourses(event) {
    const modalCourses = event.target.parentElement.parentElement.parentElement;

    if (event.target.classList.contains('closeModalCoursesBtn')) {
        modalCourses.classList.remove('active');
    }

    if (event.target.classList.contains('modalCoursesBtn')) {
        event.preventDefault();
        event.target.parentElement.parentElement.classList.remove('active');
        modalSignUp.classList.add('active');
    }
}
