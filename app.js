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

// Slide the project icons into view the first time they are loaded
function slideIn() {
    const projectIcons = document.querySelector("#project-icons");

    const slideInPos = (window.scrollY + window.innerHeight) - projectIcons.offsetHeight / 4;
    if (slideInPos > projectIcons.offsetTop) {
        projectIcons.classList.add("slide-in");
        window.removeEventListener("scroll", slideIn);
    }
}

// Change the navigation bar button color based on what section it is in
function changeNavBarBtnColor() {
    const btnNavBar = document.querySelector(".btnNavBar");
    const homeSection = document.querySelector("#homePage");
    const btnNavBarBox = btnNavBar.getBoundingClientRect();
    const homeSectionBox = homeSection.getBoundingClientRect();

    if (btnNavBarBox.bottom < homeSectionBox.bottom) {
        btnNavBar.classList.remove("dark");
    } else {
        btnNavBar.classList.add("dark");
    }
}

// TODO: Add debounce function
window.addEventListener("scroll", slideIn);
window.addEventListener("scroll", changeNavBarBtnColor);

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
});
