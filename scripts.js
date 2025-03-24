// Crear archivo script.js
// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const navLinks = document.querySelectorAll('.main-nav a');
    const contactForm = document.getElementById('contactForm');
    
    // Toggle sidebar en móvil
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            
            // Cambiar el ícono del menú
            if (sidebar.classList.contains('active')) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Navegación suave
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener el destino del enlace
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Desplazamiento suave
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Activar enlace actual
                navLinks.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
                
                // Cerrar sidebar en móvil si está abierto
                if (window.innerWidth < 992 && sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Manejar el envío del formulario
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulación de envío exitoso
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            console.log('Formulario enviado:', formValues);
            
            // Mostrar mensaje de éxito
            alert('¡Gracias por tu mensaje! Te responderé lo antes posible.');
            
            // Limpiar el formulario
            contactForm.reset();
        });
    }
});
// Activar enlace de navegación según la sección visible
function setActiveNavOnScroll() {
    const sections = document.querySelectorAll('.content-section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100; // Ajustar el offset para mejor detección
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        if (current) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        } else if (window.scrollY < 100) {
            // Si estamos al inicio de la página, activar el primer enlace
            navLinks.forEach((link, index) => {
                link.classList.remove('active');
                if (index === 0) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Activar la función de navegación activa
setActiveNavOnScroll();

// Llamar a la función de scroll una vez para establecer el enlace activo inicial
setTimeout(() => {
    window.dispatchEvent(new Event('scroll'));
}, 100);

// Animación de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
        }
    });
}, observerOptions);

// Elementos a animar
const animatedElements = document.querySelectorAll('.project-card, .timeline-item, .skills-category, .skill-icon');

animatedElements.forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// Añadir estilos CSS para animaciones
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .appear {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);