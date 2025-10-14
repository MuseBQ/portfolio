const sections = document.querySelectorAll("main > section");
const navLinks = document.querySelectorAll("nav a");
const header = document.querySelector("header");

function onScroll() {
    const scrollPosition = window.scrollY + header.offsetHeight + 10;
    sections.forEach((section, index) => {
        if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
            navLinks.forEach(link => link.classList.remove("active"));
            navLinks[index].classList.add("active");
        }
    });
}
window.addEventListener("scroll", onScroll);

navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        window.scrollTo({
            top: targetSection.offsetTop - header.offsetHeight,
            behavior: "smooth"
        });
    });
});