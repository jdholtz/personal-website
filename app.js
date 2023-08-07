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

// Make an element dark if it is between the top page and bottom page
function changeElementColor(element, topPageBox, bottomPageBox) {
    const elementBox = element.getBoundingClientRect();
    if (elementBox.bottom > topPageBox.top && elementBox.top < bottomPageBox.top) {
        element.classList.add("dark");
    } else {
        element.classList.remove("dark");
    }
}

// Change the various fixed elements based on the background color of the page
function changeFixedElementColors() {
    const aboutPage = document.querySelector("#about");
    const aboutPageBox = aboutPage.getBoundingClientRect();

    const contactPage = document.querySelector("#contact");
    const contactPageBox = contactPage.getBoundingClientRect();

    const btnNavBar = document.querySelector(".btnNavBar");
    changeElementColor(btnNavBar, aboutPageBox, contactPageBox);

    // Mobile doesn't support querying for changing all icons in the bar
    // to dark, so this is a little less accurate but still works
    const bottomBar = document.querySelector(".bottomBar");
    changeElementColor(bottomBar, aboutPageBox, contactPageBox);
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

// Ensures animations trigger if a user starts zoomed out, loads the page, and
// zooms back in
window.addEventListener("resize", debounceSlideIn);
window.addEventListener("resize", function() {
    debounce(changeFixedElementColors, 20);
});

window.addEventListener("scroll", debounceSlideIn);
window.addEventListener("scroll", function() {
    debounce(changeFixedElementColors, 20);
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
