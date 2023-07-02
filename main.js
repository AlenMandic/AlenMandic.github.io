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

// mobile breakpoints turn image gallery into a horizontal scrollbar. Handling scroll and mobile touch scrolling below.
const scrollContainer = document.querySelector(".grid-container");

function handleHorizontalScroll(e) {
    e.preventDefault();
    scrollContainer.scrollLeft += e.deltaY;
}

// making sure horizontal scrolling is only enabled on mobile breakpoints.
if(window.innerWidth > 550) {
    scrollContainer.removeEventListener("wheel", handleHorizontalScroll);
}

// do the same thing but on every window resize detection
window.addEventListener("resize", () => {
    if(window.innerWidth > 550) {
        scrollContainer.removeEventListener("wheel", handleHorizontalScroll);
    } else {
        scrollContainer.addEventListener("wheel", handleHorizontalScroll)
    }
})

// activate and use touch scrolling for our horizontal scroll gallery, if it exists.
let touchStartX = 0;
let touchMoveX = 0;

const scrollSpeedFactor = 0.2;

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

const observer = new IntersectionObserver(entries => {
    // counts everything currently in view and constantly updates
    entries.forEach(entry => {

        // when whatever we observe appears in visible view:
        if(entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);  // when it appears in view once, we stop observing for it.
        }
    })
})

observer.observe(aboutSection);  // set our "about-section" as my entry.target