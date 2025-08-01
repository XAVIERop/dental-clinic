// Mobile Menu Toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Testimonial Slider
const testimonialSlider = document.getElementById('testimonial-slider');
const prevTestimonial = document.getElementById('prev-testimonial');
const nextTestimonial = document.getElementById('next-testimonial');

let currentTestimonial = 0;
const testimonialWidth = document.querySelector('.inline-block').offsetWidth;

nextTestimonial.addEventListener('click', function() {
    const testimonials = document.querySelectorAll('.inline-block');
    if (currentTestimonial < testimonials.length - 1) {
        currentTestimonial++;
        testimonialSlider.scrollTo({
            left: currentTestimonial * testimonialWidth,
            behavior: 'smooth'
        });
    }
});

prevTestimonial.addEventListener('click', function() {
    if (currentTestimonial > 0) {
        currentTestimonial--;
        testimonialSlider.scrollTo({
            left: currentTestimonial * testimonialWidth,
            behavior: 'smooth'
        });
    }
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('i');
        
        // Toggle answer visibility
        answer.classList.toggle('hidden');
        
        // Toggle icon
        if (answer.classList.contains('hidden')) {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        } else {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        }
    });
});

// Appointment Form Submission
document.getElementById('appointment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    
    // Here you would typically send this data to your backend
    // For demo, we'll just show an alert
    alert(`Thank you, ${name}! Your appointment request for ${service} has been received. We'll call you shortly at ${phone} to confirm.`);
    
    // Reset form
    this.reset();
});
