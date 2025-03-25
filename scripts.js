// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Variables
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const navLinks = document.querySelectorAll('.main-nav a');
    const contactForm = document.getElementById('contactForm');
    const quickContact = document.querySelector('.mobile-quick-contact');

    menuToggle.addEventListener('click', function () {
        sidebar.classList.toggle('active');

        // Cambiar el ícono del menú
        if (sidebar.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            // Ocultar contacto rápido cuando el sidebar está abierto
            document.querySelector('.mobile-quick-contact').style.display = 'none';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            // Mostrar contacto rápido cuando el sidebar está cerrado
            document.querySelector('.mobile-quick-contact').style.display = 'flex';
        }
    });

    // Navegación suave
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });

                navLinks.forEach(item => item.classList.remove('active'));
                this.classList.add('active');

                if (window.innerWidth < 992 && sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Manejar el envío del formulario
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            console.log('Formulario enviado:', Object.fromEntries(formData.entries()));

            alert('¡Gracias por tu mensaje! Te responderé lo antes posible.');
            contactForm.reset();
        });
    }

    // Activar enlace de navegación según la sección visible
    function setActiveNavOnScroll() {
        const sections = document.querySelectorAll('.content-section');

        window.addEventListener('scroll', function () {
            let current = '';
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.clientHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
            });
        });
    }

    setActiveNavOnScroll();
    requestAnimationFrame(() => window.dispatchEvent(new Event('scroll')));

    // Animación de aparición al hacer scroll
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .timeline-item, .skills-category, .skill-icon')
        .forEach(element => {
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
});
