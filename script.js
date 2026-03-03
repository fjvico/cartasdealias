// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Cerrar menú móvil si está abierto
            if (window.innerWidth <= 768) {
                const nav = document.querySelector('nav');
                const menuToggle = document.querySelector('.menu-toggle');
                const overlay = document.querySelector('.menu-overlay');
                
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    if (menuToggle) menuToggle.classList.remove('active');
                    if (overlay) overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        }
    });
});

// Menú móvil
document.addEventListener('DOMContentLoaded', function() {
    // Solo aplicar lógica móvil si estamos en móvil
    if (window.innerWidth <= 768) {
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');
        const overlay = document.querySelector('.menu-overlay');
        
        if (menuToggle && nav && overlay) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                nav.classList.toggle('active');
                menuToggle.classList.toggle('active');
                overlay.classList.toggle('active');
                
                if (nav.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            overlay.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    }
});

// Form submission handler
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = this;
    const messageDiv = document.getElementById('form-message');
    
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        messageDiv.textContent = '¡Mensaje enviado con éxito! Te contactaremos pronto.';
        messageDiv.className = 'form-message success';
        form.reset();
        
    } catch (error) {
        messageDiv.textContent = 'Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.';
        messageDiv.className = 'form-message error';
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'form-message';
        }, 6000);
    }
});

// Header background on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(5px)';
    } else {
        header.style.backgroundColor = 'white';
        header.style.backdropFilter = 'none';
    }
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.hero-text, .book-details, .author-content, .podcast-content, .preorder-content, .contact-content');
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    const headerHeight = document.querySelector('header').offsetHeight;
    document.querySelectorAll('section[id]').forEach(section => {
        section.style.scrollMarginTop = headerHeight + 'px';
    });
});