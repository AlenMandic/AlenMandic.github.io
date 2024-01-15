// larger devices gallery design
const images = document.querySelectorAll(".images");

images.forEach(container => {
    let active_image = "";
    let other_images = [];
    
        container.addEventListener("mouseover", () => {
            container.style.zIndex = "1";
            active_image = container;
    
            images.forEach(image => {
                image.classList.add("blur");
                if(image === active_image) {
                    active_image.classList.remove("blur")
                }
            })
        })
    
        container.addEventListener("mouseout", () => {
            container.style.zIndex = "auto";
            images.forEach(image => {
                image.classList.remove("blur")
            })
    
            active_image = "";
            other_images = [];
        })
})

// mobile breakpoints turn image gallery into a horizontal scrollbar. Handling mobile touch scrolling below.
const scrollContainer = document.querySelector(".grid-container");

// activate and use touch scrolling for our horizontal scroll gallery, if it exists.
let touchStartX = 0;
let touchMoveX = 0;

const scrollSpeedFactor = 0.1;

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
}

function handleTouchMove(e) {
    e.preventDefault();
    touchMoveX = e.touches[0].clientX;
    const scrollAmount = (touchStartX - touchMoveX) * scrollSpeedFactor; // slow down scrolling a bit
    scrollContainer.scrollLeft += scrollAmount;
}

function handleTouchEnd() {
    touchStartX = 0;
    touchMoveX = 0;
}

// mobile touches/scrolling for when our horizontal scroll gallery exists. Disable otherwise as it breaks scrolling through the gallery.
if(window.innerWidth < 800) {
    scrollContainer.addEventListener("touchstart", handleTouchStart)
    scrollContainer.addEventListener("touchmove", handleTouchMove)
    scrollContainer.addEventListener("touchend", handleTouchEnd)
} else {
    scrollContainer.removeEventListener("touchstart", handleTouchStart)
    scrollContainer.removeEventListener("touchmove", handleTouchMove)
    scrollContainer.removeEventListener("touchend", handleTouchEnd)
}

window.addEventListener("resize", () => {
    if(window.innerWidth < 800) {
    scrollContainer.addEventListener("touchstart", handleTouchStart)
    scrollContainer.addEventListener("touchmove", handleTouchMove)
    scrollContainer.addEventListener("touchend", handleTouchEnd)
    } else {
    scrollContainer.removeEventListener("touchstart", handleTouchStart)
    scrollContainer.removeEventListener("touchmove", handleTouchMove)
    scrollContainer.removeEventListener("touchend", handleTouchEnd)
    }
})

// Detect when the "about" section comes into view using intersection observer -> (if about.isIntersecting) { do animation }
const aboutSection = document.querySelector("#about");

const observer_about = new IntersectionObserver(entries => {
    // counts everything currently in view and constantly updates
    entries.forEach(entry => {

        // when whatever we observe appears in visible view:
        if(entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer_about.unobserve(entry.target);  // when it appears in view once, we stop observing for it.
        }
    })
})

// same thing for our contact form
const form = document.querySelector("#detect-form");

const observer_form = new IntersectionObserver(entries => {
    // counts everything currently in view and constantly updates
    entries.forEach(entry => {

        // when whatever we observe appears in visible view:
        if(entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer_form.unobserve(entry.target);  // when it appears in view once, we stop observing for it.
        }
    })
})

observer_about.observe(aboutSection);
observer_form.observe(form);