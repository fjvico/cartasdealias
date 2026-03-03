// Menú hamburguesa mejorado
function createMobileMenu() {
    // Verificar si ya existe el menú
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
    
    // Insertar botón antes del nav
    header.appendChild(menuToggle);
    
    // Toggle menú
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Prevenir scroll del body cuando el menú está abierto
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
    
    // Cerrar menú al hacer click en un enlace
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Crear menú móvil si es necesario
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }
    
    // Recrear menú al redimensionar
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const existingMenu = document.querySelector('.menu-toggle');
            const existingOverlay = document.querySelector('.menu-overlay');
            
            if (window.innerWidth <= 768 && !existingMenu) {
                createMobileMenu();
            } else if (window.innerWidth > 768 && existingMenu) {
                existingMenu.remove();
                if (existingOverlay) existingOverlay.remove();
                document.querySelector('nav').classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 250);
    });
    
    // Resto del código existente...
    const elementsToAnimate = document.querySelectorAll('.hero-text, .book-details, .author-content, .podcast-content, .preorder-content, .contact-content');
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    // Ajustar scroll margin
    const headerHeight = document.querySelector('header').offsetHeight;
    document.querySelectorAll('section[id]').forEach(section => {
        section.style.scrollMarginTop = headerHeight + 'px';
    });
});