// Script para interactividad adicional y temporizador
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.element');

    // Inicializar temporizador de 20 días
    initializeCountdown();

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