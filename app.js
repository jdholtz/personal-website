const FORMSPREE_URL = "https://formspree.io/f/xvonvzjn";

let sideNav;
let btnNavBar;

function toggleNavBar() {
    sideNav.classList.toggle("visible");
    btnNavBar.classList.toggle("open");
}

function closeNavBar() {
    sideNav.classList.remove("visible");
    btnNavBar.classList.remove("open");
}

// Add a delay to calling functions with event listeners. Prevents them
// from being called 10+ times every scroll
function debounce(method, delay) {
    clearTimeout(method._tId);
    method._tId = setTimeout(function() {
        method();
    }, delay);
}

// This function is here to uniquely identify the event listener
function debounceSlideIn() {
    debounce(slideIn, 20);
}

// Slide the elements into view the first time they are loaded
function slideIn() {
    let shouldRemoveListener = true;

    const scrollPos = window.scrollY + window.innerHeight;
    const animationPages = document.querySelectorAll(".shouldAnimate");
    animationPages.forEach((page) => {
        const animatePos = scrollPos - page.offsetHeight / 3;
        if (animatePos > page.offsetTop) {
            page.classList.add("animate");
        } else {
            shouldRemoveListener = false;
        }
    });

    if (shouldRemoveListener) window.removeEventListener("scroll", debounceSlideIn);
}

// Change the navigation bar button color based on what section it is in
function changeNavBarBtnColor() {
    const btnNavBar = document.querySelector(".btnNavBar");
    const aboutSection = document.querySelector("#about");
    const btnNavBarBox = btnNavBar.getBoundingClientRect();
    const aboutSectionBox = aboutSection.getBoundingClientRect();

    const contactSection = document.querySelector("#contact");
    const contactSectionBox = contactSection.getBoundingClientRect();

    // Dark if it is in the about or project section
    if (btnNavBarBox.bottom > aboutSectionBox.top &&
        btnNavBarBox.bottom < contactSectionBox.top) {
        btnNavBar.classList.add("dark");
    } else {
        btnNavBar.classList.remove("dark");
    }
}

function showFormMessage(message) {
    const displayMessage = document.querySelector(message);
    displayMessage.classList.add("visible");
}

function sendEmail() {
    const form = document.querySelector(".contactForm");

    // Only submit the form once
    if (form.classList.contains("submitted")) return;

    // Create a JSON object from the form data
    const data = new FormData(form);
    formData = JSON.stringify(Object.fromEntries(data));

    const options = {method: "POST", body: formData, headers: {'Content-Type': 'application/json'}};

    fetch(FORMSPREE_URL, options)
    .catch(e => {
        console.log("Error submitting form");
        console.log(e);
        showFormMessage(".failMessage");
    })
    .then(r => r.json())
    .then(response => {
        console.log(response);

        if (response.ok) {
            console.log("Successfully sent the form");
            showFormMessage(".successMessage");
        }
        else {
            console.log("Response was not successful");
            showFormMessage(".failMessage");
        }
    });

    form.classList.add("submitted");
}

window.addEventListener("scroll", debounceSlideIn);

window.addEventListener("scroll", function() {
    debounce(changeNavBarBtnColor, 20);
});

// Execute once the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Initialize elements in the global scope
    sideNav = document.querySelector("#sideNav");
    btnNavBar = document.querySelector(".btnNavBar");

    btnNavBar.addEventListener("click", toggleNavBar);

    // Keybinds to open/close Nav Bar
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            closeNavBar();
        } else if (e.key === "1") {
            toggleNavBar();
        }
    });

    // Close the Nav Bar if there was a click outside of it (and is not the Nav Bar button)
    document.addEventListener("click", function(event) {
        if (!sideNav.contains(event.target) && !btnNavBar.contains(event.target)) {
            closeNavBar();
        }
    });

    document.querySelector(".contactForm").addEventListener("submit", e => {
        // Prevent a redirect
        e.preventDefault();

        sendEmail();
    });

});
