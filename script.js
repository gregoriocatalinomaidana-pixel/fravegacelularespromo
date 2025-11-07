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
        // Enviar datos a Google Sheets
        const response = await fetch('https://script.google.com/macros/s/AKfycbxL2PJXmWO9VaBGJkkj1bjg-LmxJnroSm3kOUczFyjfq_wz1JWSLkszm5sOVlePBkQ0/exec', {  // Reemplaza con tu URL de Google Apps Script
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            // Redirigir a página de confirmación
            window.location.href = 'confirmation.html';
        } else {
            alert('Error al enviar datos. Inténtalo de nuevo.');
        }
    } catch (error) {
        alert('Error de conexión. Verifica tu internet.');
    }
});