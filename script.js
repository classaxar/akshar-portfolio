// 1. Navigation Sticky Effect & Background Darkening
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.add('scrolled');
        navbar.classList.remove('scrolled');
    }
});

// 2. Typing Automation in Hero Section
const phrases = [
    "Machine Learning Engineer",
    "Data Scientist",
    "Backend Architect",
    "AI Systems Enthusiast"
];

let i = 0;
let j = 0;
let currentPhrase = [];
let isDeleting = false;
let isEnd = false;

const typingElement = document.getElementById('typing-text');

function typeAnimation() {
    isEnd = false;
    typingElement.innerHTML = currentPhrase.join('');

    if (i < phrases.length) {

        if (!isDeleting && j <= phrases[i].length) {
            currentPhrase.push(phrases[i][j]);
            j++;
            typingElement.innerHTML = currentPhrase.join('');
        }

        if (isDeleting && j <= phrases[i].length) {
            currentPhrase.pop(phrases[i][j]);
            j--;
            typingElement.innerHTML = currentPhrase.join('');
        }

        if (j == phrases[i].length) {
            isEnd = true;
            isDeleting = true;
        }

        if (isDeleting && j === 0) {
            currentPhrase = [];
            isDeleting = false;
            i++;
            if (i == phrases.length) {
                i = 0;
            }
        }
    }

    const speedUp = Math.random() * (80 - 50) + 50;
    const normalSpeed = Math.random() * (200 - 100) + 100;
    const time = isEnd ? 2000 : isDeleting ? speedUp : normalSpeed;

    setTimeout(typeAnimation, time);
}

// Start typing animation on load
document.addEventListener("DOMContentLoaded", () => {
    if (typingElement) {
        typeAnimation();
    }
});


// 3. Scroll Reveal Animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        // Add animation class
        entry.target.classList.add("show-anim");
        // Stop observing once appeared
        observer.unobserve(entry.target);
    });
}, observerOptions);

// Apply hidden class to all cards and major sections on load
document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll('.glass-card, .section-title');

    fadeElements.forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });
});

// 4. Image Modal Logic
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const modalDownload = document.getElementById("modal-download");
const closeBtn = document.querySelector(".modal-close");
const certImages = document.querySelectorAll(".cert-img-wrapper img");

if (modal && modalImg && certImages) {
    certImages.forEach(img => {
        img.style.cursor = "pointer";
        img.addEventListener("click", function () {
            modal.style.display = "block";
            setTimeout(() => modal.classList.add("show-modal"), 10);

            modalImg.src = this.src;
            modalDownload.href = this.src;
        });
    });

    closeBtn.addEventListener("click", closeModal);

    // Close modal when clicking outside the image
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    modal.classList.remove("show-modal");
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}