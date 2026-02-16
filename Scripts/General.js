document.addEventListener('DOMContentLoaded', () => {
    //GESTIÓN DEL COPYRIGHT
    const fecha = new Date();
    const anno = fecha.getFullYear();
    const copy = document.getElementById("copy"); 
    if (copy) copy.innerHTML = `Adrián Durán Guillén | SrAdryX &copy; ${anno}`;

    //ELEMENTOS DEL MENÚ
    const mobileMenu = document.querySelector('#menumovil');
    const navLinks = document.querySelector('#nav-menu');
    const capsuleLinks = document.querySelectorAll('.menu-capsula li a');
    const sections = document.querySelectorAll('section, header');

    //LÓGICA DE SELECCIÓN POR SCROLL (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                capsuleLinks.forEach(link => {
                    link.classList.remove('selected');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('selected');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    //MENÚ MÓVIL (Abrir/Cerrar)
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }

    //CIERRE AUTOMÁTICO AL CLICAR
    capsuleLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.innerHTML = '☰';
            }
        });
    });

    //ANIMACIÓN DE BARRAS DE SKILLS
    const skillsSection = document.querySelector('#habilidades');
    const progressBars = document.querySelectorAll('.progress-line span');

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                progressBars.forEach(bar => {
                    bar.style.transform = "scaleX(1)";
                });
            }
        });
    }, { threshold: 0.3 });

    if (skillsSection) skillsObserver.observe(skillsSection);

    //APARICIÓN SUAVE DE TARJETAS (SOBRE MÍ)
    const bentoCards = document.querySelectorAll('.skill-card-modern');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    bentoCards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "all 0.5s ease-out";
        cardObserver.observe(card);
    });

    //CARRUSEL 3D DINÁMICO DE PROYECTOS (ILIMITADO)
    // CARRUSEL 3D - VERSIÓN DEFINITIVA
const proyects = document.querySelectorAll('.project-card-v2');
let index = 0;

console.log("Tarjetas detectadas:", proyects.length); // Esto debe decir 4 o más

function renderCarousel() {
    proyects.forEach((card, i) => {
        // Limpiamos clases antiguas de un plumazo
        card.className = 'project-card-v2'; 

        if (i === index) {
            card.classList.add('active');
        } else if (i === (index - 1 + proyects.length) % proyects.length) {
            card.classList.add('left');
        } else if (i === (index + 1) % proyects.length) {
            card.classList.add('right');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Evento de click para rotar
proyects.forEach((card, i) => {
    card.addEventListener('click', () => {
        if (index === i) return;
        index = i;
        renderCarousel();
    });
});
// Inicializar
renderCarousel();
// --- CONTADOR DE EXPERIENCIA AUTOMÁTICO ---
    const counterElement = document.getElementById("years-counter");
    
    if (counterElement) {
        const startYear = 2013;
        const currentYear = new Date().getFullYear();
        const totalYears = currentYear - startYear;

        const startCounter = () => {
            let currentCount = 0;
            const speed = 70; // Velocidad del conteo en ms

            const updateCounter = () => {
                if (currentCount < totalYears) {
                    currentCount++;
                    counterElement.innerText = currentCount;
                    setTimeout(updateCounter, speed);
                } else {
                    counterElement.innerText = totalYears;
                }
            };
            updateCounter();
        };

        // Usamos Intersection Observer para que se active al verlo
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounter();
                    counterObserver.unobserve(entry.target); // Solo se anima una vez
                }
            });
        }, { threshold: 0.5 });

        counterObserver.observe(counterElement);
    }
});