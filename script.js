"use strict"
// Elements
const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");

const displayYear = document.querySelector("#age-year");
const displayMonth = document.querySelector("#age-month");
const displayDay = document.querySelector("#age-day");

const form = document.querySelector("form");
const submitBtn = document.querySelector("button[type='submit']");
const emptyFieldError = document.querySelector(".empty-fields");

// Functions

// Function to indicate invalid input
const isInvalid = (input, message) => {
    const fieldContainer = input.parentElement;

    fieldContainer.classList.add("invalid");

    const errorMsg = fieldContainer.querySelector("small");
    errorMsg.textContent = message;
}

// Function to indicate valid input
const isValid = (input) => {
    const fieldContainer = input.parentElement;

    fieldContainer.classList.remove("invalid");

    const errorMsg = fieldContainer.querySelector("small");
    errorMsg.textContent = "";
}

// Check if year is a leap year
function isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0 ? 29 : 28;
}

//Check the number of days in each month for proper calculation
function maxNumberOfDays(month) {
    let maximumNumberOfDays;
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            maximumNumberOfDays = 31;
            break;

        default:
            maximumNumberOfDays = 30;
    }

    return maximumNumberOfDays;
}

function calcAge(dd, mm, yy) {
    if (currentDay < dd) {
        displayDay.textContent = currentDay - dd + 30;
        currentMonth = currentMonth - 1;
    } else {
        displayDay.textContent = currentDay - dd;
    }

    if (currentMonth < mm) {
        displayMonth.textContent = currentMonth - mm + 12;
        currentYear = currentYear - 1;
    } else {
        displayMonth.textContent = currentMonth - mm;
    }

    displayYear.textContent = currentYear - yy;
}


// Current Date
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth() + 1;
let currentDay = currentDate.getDate();

let inputDay;
let inputMonth;
let inputYear;

function checkInput(input) {

}

form.addEventListener("input", function (e) {
    let i = e.target;
    let id = e.target.id;
    let value = e.target.value;

    switch (id) {
        case "day":
            if (value >= 1 && value <= 31) {
                isValid(i, "");
                inputDay = +value;
            } else if (!value) {
                isInvalid(i, "This Field is required");
            } else {
                isInvalid(i, "Must be a valid day");
            }
            break;

        case "month":
            if (value >= 1 && value <= 12) {
                isValid(i, "");
                inputMonth = +value;
            } else if (!value) {
                isInvalid(i, "This Field is required");
            } else {
                isInvalid(i, "Must be a valid month");
            }
            break;

        case "year":
            if (value <= currentYear) {
                isValid(i, "");
                inputYear = +value;
            } else if (!value) {
                isInvalid(i, "This Field is required");
            } else {
                isInvalid(i, "Must be a valid year");
            }
        default:
            return;
    }

})

form.addEventListener("submit", function (e) {
    let valid = true;
    let max;

    inputMonth == 2 ? max = isLeapYear(inputYear) : max = maxNumberOfDays(inputMonth);

    if (inputDay > max) {
        isInvalid(dayInput, "");
        isInvalid(monthInput, "");
        isInvalid(yearInput, "");
        emptyFieldError.textContent = "Must be a valid date";
        valid = false;
    }

    if (inputYear == currentYear) {
        if (inputMonth > currentMonth) {
            isInvalid(dayInput, "");
            isInvalid(monthInput, "");
            isInvalid(yearInput, "");
            emptyFieldError.textContent = "Must be a valid date";
            valid = false;
        } else if (inputMonth == currentMonth) {
            if (inputDay > currentDay) {
                isInvalid(dayInput, "");
                isInvalid(monthInput, "");
                isInvalid(yearInput, "");
                emptyFieldError.textContent = "Must be a valid date";
                valid = false;
            }
        }
    }

    if (valid) {
        calcAge(inputDay, inputMonth, inputYear);
    }

    e.preventDefault();
})