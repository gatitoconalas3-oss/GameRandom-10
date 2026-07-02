// Script para interactividad adicional y temporizador
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.element');
    const hamburger = document.getElementById('hamburger');
    const sideMenu = document.getElementById('sideMenu');
    const closeMenu = document.getElementById('closeMenu');
    const menuLinks = document.querySelectorAll('.menu-link');

    // Inicializar temporizador de 20 días
    initializeCountdown();

    // Menú hamburguesa
    hamburger.addEventListener('click', function() {
        sideMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    closeMenu.addEventListener('click', function() {
        sideMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });

    // Links del menú
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            navigateToSection(section);
            sideMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Efecto de movimiento del mouse en los elementos
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        elements.forEach((element, index) => {
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // Agregar un poco de aleatoriedad a las velocidades de animación
    elements.forEach((element) => {
        const randomDuration = 5 + Math.random() * 4;
        element.style.animationDuration = randomDuration + 's';
    });

    // Función para navegar entre secciones
    function navigateToSection(sectionName) {
        const heroSection = document.getElementById('heroSection');
        const gamesSection = document.getElementById('gamesSection');
        const moviesSection = document.getElementById('moviesSection');
        const comingSoonSection = document.getElementById('comingSoonSection');
        const mainTitle = document.getElementById('mainTitle');

        // Ocultar todas las secciones
        heroSection.classList.add('hidden');
        gamesSection.classList.add('hidden');
        moviesSection.classList.add('hidden');
        comingSoonSection.classList.add('hidden');

        // Mostrar la sección seleccionada
        switch(sectionName) {
            case 'games':
                mainTitle.textContent = 'GAME RANDOM 5';
                gamesSection.classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'movies':
                moviesSection.classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'hero':
            default:
                heroSection.classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
        }
    }

    // Función para inicializar el temporizador
    function initializeCountdown() {
        // Establecer la fecha de lanzamiento a 20 días desde ahora
        const launchDate = new Date();
        launchDate.setDate(launchDate.getDate() + 20);

        // Actualizar el temporizador cada segundo
        updateCountdown();
        setInterval(updateCountdown, 1000);

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = launchDate.getTime() - now;

            if (distance <= 0) {
                // El tiempo ha terminado
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
                document.querySelector('.countdown-label').textContent = '¡Lanzado!';
                return;
            }

            // Calcular días, horas, minutos y segundos
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Actualizar los valores en la página
            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }
    }
});