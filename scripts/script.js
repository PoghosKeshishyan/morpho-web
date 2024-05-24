import { db_en } from "../database/modalCourses.js";


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
const modalCoursesSelect = document.getElementById('modalCoursesSelect');


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
    if (db_en[course]) {
        const courseDetails = db_en[course];

        modalCourses.classList.add('active');
        modalCoursesTitle.innerText = courseDetails.title;
        modalCoursesText.innerText = courseDetails.description;

        const allCourses = Array.from(document.querySelectorAll('.modalSignUp .inputBox select option'));
        let selectedIndex;
        
        allCourses.forEach((course, index) => {
            if (course.innerText.toLowerCase() === courseDetails.title.toLowerCase()) {
                selectedIndex = index;
            }
        });
        
        modalCoursesSelect.selectedIndex = selectedIndex;
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
