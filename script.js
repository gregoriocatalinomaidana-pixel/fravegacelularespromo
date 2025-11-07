document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    // Recopilar datos del formulario
    const data = {
        nombre: document.getElementById('nombre').value,
        celular: document.getElementById('celular').value,
        email: document.getElementById('email').value,
        direccion: document.getElementById('direccion').value,
        codigoPostal: document.getElementById('codigoPostal').value,
        localidad: document.getElementById('localidad').value,
        provincia: document.getElementById('provincia').value,
        pais: document.getElementById('pais').value
    };
    
    try {
        // Enviar datos a Formspree
        const response = await fetch('https://formspree.io/f/xanawnor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data)
        });
        
        if (response.ok) {
            // Redirigir a página de confirmación
            window.location.href = 'confirmation.html';
        } else {
            alert('Error al enviar. Inténtalo de nuevo.');
        }
    } catch (error) {
        alert('Error de conexión. No se que puta ocurre.');
    }
});
