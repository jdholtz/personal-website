function toggleNavBar() {
    const sideSav = document.querySelector(".sideNav");

    if (sideNav.classList.contains("visible")) {
        sideNav.style.width = "0px";
    } else {
        sideNav.style.width = "250px";
    }

    sideNav.classList.toggle("visible");
    this.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function() {
    // Execute once the DOM is loaded
    document.querySelector(".btnNavBar").addEventListener("click", toggleNavBar);
});
