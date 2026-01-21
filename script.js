const cursor = document.querySelector('.cursor');
const links = document.querySelectorAll('a, button, .project-card, .social-icon');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Hover effects
links.forEach(link => {
    link.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    link.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Click effect (it shrinks slightly when you click)
document.addEventListener('mousedown', () => cursor.style.transform = 'translate(-50%, -50%) scale(0.7)');
document.addEventListener('mouseup', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');
const track = document.querySelector('.carousel-track');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

if (track && nextBtn && prevBtn) {
    const slides = Array.from(track.children);
    let count = 0;
    let autoPlayInterval;

    const moveSlide = () => {
        track.style.transform = `translateX(-${count * 100}%)`;
    };

    const nextSlide = () => {
        count = (count + 1) % slides.length;
        moveSlide();
    };

    const prevSlide = () => {
        count = (count - 1 + slides.length) % slides.length;
        moveSlide();
    };

    // Click Events
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer(); // Reset timer so it doesn't jump immediately after a click
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
    });

    // Autoplay Logic (Every 5 seconds)
    const startTimer = () => {
        autoPlayInterval = setInterval(nextSlide, 2000);
    };

    const resetTimer = () => {
        clearInterval(autoPlayInterval);
        startTimer();
    };

    // Pause on Hover
    track.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    track.addEventListener('mouseleave', startTimer);

    // Initial Start
    startTimer();
}

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { 
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px" 
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

