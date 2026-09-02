// ===== 1. IMAGE SLIDESHOW =====
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;
    document.getElementById('slides').style.transform = 'translateX(' + (-currentSlide * 100) + '%)';
}

// Auto-slide every 4 seconds
setInterval(function() {
    showSlide(currentSlide + 1);
}, 4000);

// ===== 2. PRODUCT FILTERING =====
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('#productGrid .card');

filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');

        let filter = this.getAttribute('data-filter');

        cards.forEach(function(card) {
            if (filter === 'all') {
                card.classList.remove('hidden');
            } else {
                let category = card.getAttribute('data-category');
                if (category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            }
        });
    });
});

// ===== 3. FORM VALIDATION =====
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const successMsg = document.getElementById('formSuccess');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // Validate Name
    if (nameInput.value.trim() === '') {
        nameInput.classList.add('error');
        nameError.classList.add('visible');
        isValid = false;
    } else {
        nameInput.classList.remove('error');
        nameError.classList.remove('visible');
    }

    // Validate Email
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('error');
        emailError.classList.add('visible');
        isValid = false;
    } else {
        emailInput.classList.remove('error');
        emailError.classList.remove('visible');
    }

    // Validate Phone
    let phoneRegex = /^[0-9\s\-+()]{8,15}$/;
    if (!phoneRegex.test(phoneInput.value.trim())) {
        phoneInput.classList.add('error');
        phoneError.classList.add('visible');
        isValid = false;
    } else {
        phoneInput.classList.remove('error');
        phoneError.classList.remove('visible');
    }

    if (isValid) {
        successMsg.classList.add('visible');
        form.reset();
        setTimeout(function() {
            successMsg.classList.remove('visible');
        }, 4000);
    }
});