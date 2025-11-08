document.getElementById('contactForm').addEventListener('submit', function(event) {
    // Validación básica (opcional)
    const nombre = document.getElementById('nombre').value;
    if (!nombre) {
        alert('Por favor, ingresa tu nombre.');
        event.preventDefault();
        return;
    }
    // Netlify se encarga del envío; no necesitas fetch
    // La página redirigirá automáticamente si configuras action
});
