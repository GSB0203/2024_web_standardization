function startCountdown(targetDate) {
    const countdownElement = document.getElementById('countdown');

    const updateCountdown = () => {
        const now = new Date().getTime();
        const timeRemaining = targetDate - now;

        if (timeRemaining < 0) {
            countdownElement.textContent = "00:00:00:00";
            clearInterval(interval);
            return;
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        countdownElement.textContent = `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();
}

document.addEventListener('DOMContentLoaded', () => {
    const targetDate = new Date("2024-07-12T00:00:00").getTime();
    startCountdown(targetDate);

    const slideTrack = document.querySelector('.slide-track');
    const slides = document.querySelectorAll('.image-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const totalSlides = slides.length;
    let currentIndex = 0; // Start at the first slide

    // Initialize the slider
    updateSlider();

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    function updateSlider() {
        const slideWidth = slides[0].clientWidth;
        const offset = -currentIndex * slideWidth;
        slideTrack.style.transform = `translateX(${offset}px)`;
        updateDots();
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Auto-slide interval
    let slideInterval = setInterval(nextSlide, 6000);

    // Reset interval control functions
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 6000);
    }

    function stopSlideInterval() {
        clearInterval(slideInterval);
    }

    // Pause slider when user interacts with it
    slides.forEach(slide => {
        slide.addEventListener('mouseover', stopSlideInterval);
        slide.addEventListener('mouseout', startSlideInterval);
    });

    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });

    // Add click event to navigation buttons
    document.querySelector('.prev-button').addEventListener('click', prevSlide);
    document.querySelector('.next-button').addEventListener('click', nextSlide);

    startSlideInterval(); // Start the interval initially
});
