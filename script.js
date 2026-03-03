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
            
            // Cerrar menú móvil si está abierto (solo en móvil)
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

// Crear menú móvil SOLO cuando sea necesario
function initMobileMenu() {
    // Solo ejecutar en móvil
    if (window.innerWidth > 768) return;
    
    // Verificar si ya existe
    if (document.querySelector('.menu-toggle')) return;
    
    const header = document.querySelector('.header-content');
    const nav = document.querySelector('nav');
    
    // Crear botón hamburguesa
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    // Insertar botón en el header
    header.appendChild(menuToggle);
    
    // Toggle menú
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Prevenir scroll del body
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Cerrar menú al hacer click en overlay
    overlay.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Eliminar menú móvil cuando no es necesario
function removeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const overlay = document.querySelector('.menu-overlay');
    const nav = document.querySelector('nav');
    
    if (menuToggle) menuToggle.remove();
    if (overlay) overlay.remove();
    if (nav) nav.classList.remove('active');
    document.body.style.overflow = '';
}

// Manejar cambios de tamaño de pantalla
function handleResize() {
    if (window.innerWidth <= 768) {
        initMobileMenu();
    } else {
        removeMobileMenu();
    }
}

// Form submission handler
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = this;
    const messageDiv = document.getElementById('form-message');
    
    // Mostrar estado de carga
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Obtener datos del formulario
    const formData = new FormData();
    formData.append('name', form.querySelector('[name="name"]').value);
    formData.append('email', form.querySelector('[name="email"]').value);
    formData.append('subject', form.querySelector('[name="subject"]').value);
    formData.append('message', form.querySelector('[name="message"]').value);
    
    // URL de Google Apps Script
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzbZZIQlGwaOjRWs0tYPSCazXIgdGrtnExTmVjvVqdpuTpxGk8DM8_uM8r2NU8K6lI/exec';
    
    try {
        // Simular éxito para pruebas (comentar en producción)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Éxito
        messageDiv.textContent = '¡Mensaje enviado con éxito! Te contactaremos pronto.';
        messageDiv.className = 'form-message success';
        form.reset();
        
    } catch (error) {
        // Error
        messageDiv.textContent = 'Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.';
        messageDiv.className = 'form-message error';
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Limpiar mensaje después de 6 segundos
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

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar menú según tamaño de pantalla
    handleResize();
    
    // Escuchar cambios de tamaño
    window.addEventListener('resize', function() {
        clearTimeout(window.resizedFinished);
        window.resizedFinished = setTimeout(handleResize, 250);
    });
    
    // Observar elementos para animación
    const elementsToAnimate = document.querySelectorAll('.hero-text, .book-details, .author-content, .podcast-content, .preorder-content, .contact-content');
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    // Ajustar scroll margin para header fijo
    const headerHeight = document.querySelector('header').offsetHeight;
    document.querySelectorAll('section[id]').forEach(section => {
        section.style.scrollMarginTop = headerHeight + 'px';
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .hero-text, .book-details, .author-content, .podcast-content, .preorder-content, .contact-content {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);