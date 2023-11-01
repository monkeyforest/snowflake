// JavaScript to toggle the menu bar on scroll
window.addEventListener("scroll", function () {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {  // Adjust the scroll threshold as needed
        navbar.classList.add('hidden-menu');
    } else {
        navbar.classList.remove('hidden-menu');
    }
});

// JavaScript for your hamburger menu (already included in your HTML)
document.querySelector('.hamburger-menu').addEventListener('click', function () {
    this.classList.toggle('open');
    document.getElementById('menu-content').classList.toggle('hidden');
});