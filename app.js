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

// Execute once the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Initialize elements in the global scope
    sideNav = document.querySelector("#sideNav");
    btnNavBar = document.querySelector(".btnNavBar");

    document.querySelector(".btnNavBar").addEventListener("click", toggleNavBar);

    // Keybinds to open/close Nav Bar
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            closeNavBar();
        } else if (e.key === "1") {
            toggleNavBar();
        }
    });

    // Close the Nav Bar if there was a click outside of it (and not the Nav Bar button)
    document.addEventListener("click", function(event) {
        if (!sideNav.contains(event.target) && !btnNavBar.contains(event.target)) {
            closeNavBar();
        }
    });
});
