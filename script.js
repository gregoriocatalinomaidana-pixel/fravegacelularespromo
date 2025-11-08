document.getElementById('contactForm').addEventListener('submit', function(event) {
    // Validación básica (opcional: puedes quitar si no la necesitas)
    const nombre = document.getElementById('nombre').value;
    const celular = document.getElementById('celular').value;
    const email = document.getElementById('email').value;
    const direccion = document.getElementById('direccion').value;
    const codigoPostal = document.getElementById('codigoPostal').value;
    const localidad = document.getElementById('localidad').value;
    const provincia = document.getElementById('provincia').value;
    const pais = document.getElementById('pais').value;
    
    if (!nombre || !celular || !email || !direccion || !codigoPostal || !localidad || !provincia || !pais) {
        alert('Por favor, completa todos los campos.');
        event.preventDefault();  // Solo bloquea si falta algo
        return;
    }
    
    // No hay fetch ni redirección manual: Netlify lo maneja
    // Después del envío, Netlify redirigirá automáticamente si configuras action="/thanks" en el form
});