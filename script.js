/ script.js — reemplazar todo el archivo por este contenido
document.addEventListener('DOMContentLoaded', () => {
  // IDs / campos que usa el formulario (asegurate que existan)
  const personalContinue = document.getElementById('btnPersonalContinue');
  const addressContinue = document.getElementById('btnAddressContinue');
  const paymentContinue = document.getElementById('btnPaymentContinue');
  const btnFinalizar = document.getElementById('btnFinalizar');

  // Validadores por sección
  function validarPersonal() {
    const nombre = (document.getElementById('nombre') || {}).value?.trim() || '';
    const celular = (document.getElementById('celular') || {}).value?.trim() || '';
    const email = (document.getElementById('email') || {}).value?.trim() || '';
    const fecha = (document.getElementById('fechaNacimiento') || {}).value?.trim() || '';

    const regexFecha = /^\d{2}\/\d{2}\/\d{4}$/; // DD/MM/AAAA

    if (!nombre || !celular || !email || !regexFecha.test(fecha)) {
      alert('Por favor, complete todos los datos personales con una fecha válida (DD/MM/AAAA).');
      return false;
    }

    // Mostrar resumen, ocultar sección y habilitar siguiente
    document.getElementById('personalData').classList.add('hidden');
    document.getElementById('personalSummary').classList.remove('hidden');
    document.querySelector('#personalData legend')?.classList.add('completed');
    document.getElementById('resumenPersonal').textContent = `${nombre} | ${celular} | ${email}`;

    const addressSection = document.getElementById('addressSection');
    if (addressSection) {
      addressSection.classList.remove('disabled');
      addressSection.classList.remove('hidden');
      addressSection.querySelector('.locked-message')?.remove();
      addressSection.scrollIntoView({ behavior: 'smooth' });
    }
    return true;
  }

  function validarDomicilio() {
    const campos = ['codigoPostal','calle','numero','tipoDomicilio','provincia','ciudad'];
    for (let id of campos) {
      const el = document.getElementById(id);
      if (!el || !el.value || !el.value.toString().trim()) {
        alert('Por favor, complete todos los campos del domicilio.');
        return false;
      }
    }

    const calle = document.getElementById('calle').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const ciudad = document.getElementById('ciudad').value.trim();
    const provincia = document.getElementById('provincia').value.trim();

    document.getElementById('addressSection').classList.add('hidden');
    document.getElementById('addressSummary').classList.remove('hidden');
    document.querySelector('#addressSection legend')?.classList.add('completed');
    document.getElementById('resumenDomicilio').textContent = `${calle} ${numero}, ${ciudad}, ${provincia}`;

    const paymentSection = document.getElementById('paymentSection');
    if (paymentSection) {
      paymentSection.classList.remove('disabled');
      paymentSection.classList.remove('hidden');
      paymentSection.querySelector('.locked-message')?.remove();
      paymentSection.scrollIntoView({ behavior: 'smooth' });
    }
    return true;
  }

  function validarPago() {
    const metodo = document.querySelector('input[name="metodoPago"]:checked');
    const cuotas = (document.getElementById('cuotas') || {}).value || '';
    const tarjeta = (document.getElementById('TarjetaNum') || {}).value?.trim() || '';
    const nombreTarj = (document.getElementById('NombreTarj') || {}).value?.trim() || '';
    const mes = (document.getElementById('mes') || {}).value || '';
    const ano = (document.getElementById('ano') || {}).value || '';
    const codigo = (document.getElementById('Codigo') || {}).value?.trim() || '';

    // Validaciones básicas
    if (!metodo) { alert('Por favor seleccione el método de pago.'); return false; }
    if (!cuotas) { alert('Por favor seleccione las cuotas.'); return false; }
    if (!tarjeta || tarjeta.length < 12) { alert('Ingrese un número de tarjeta válido.'); return false; }
    if (!nombreTarj) { alert('Ingrese el nombre que figura en la tarjeta.'); return false; }
    if (!mes || !ano) { alert('Seleccione mes y año de vencimiento.'); return false; }
    if (!codigo || codigo.length < 3) { alert('Ingrese el código de seguridad (3 o 4 dígitos).'); return false; }

    document.getElementById('paymentSection').classList.add('hidden');
    document.getElementById('paymentSummary').classList.remove('hidden');
    document.querySelector('#paymentSection legend')?.classList.add('completed');

    // Mostrar resumen con 4 últimos dígitos
    const last4 = tarjeta.slice(-4).padStart(4, '*');
    document.getElementById('resumenPago').textContent = `${metodo.value} | ${cuotas} | ****${last4}`;

    // Mostrar botón finalizar
    if (btnFinalizar) btnFinalizar.classList.remove('hidden');
    btnFinalizar?.scrollIntoView({ behavior: 'smooth' });

    return true;
  }

  // Conectar botones (si existen)
  personalContinue?.addEventListener('click', () => validarPersonal());
  addressContinue?.addEventListener('click', () => validarDomicilio());
  paymentContinue?.addEventListener('click', () => validarPago());

  // Si preferís teclas Enter en campos para "Continuar" (opcional):
  // Evitar envío accidental del form por ENTER en inputs de texto:
  document.querySelectorAll('input').forEach(i => {
    i.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        // prevenir submit del form estándar:
        e.preventDefault();
        // Si estás en el último campo de una sección, podrías disparar el continue automáticamente.
      }
    });
  });

  // Función para "Modificar" (mantener compatibilidad con editarSeccion en HTML)
  window.editarSeccion = function(seccion) {
    if (seccion === 'personal') {
      document.getElementById('personalSummary').classList.add('hidden');
      document.getElementById('personalData').classList.remove('hidden');
      document.getElementById('personalData').scrollIntoView({ behavior: 'smooth' });
    } else if (seccion === 'domicilio') {
      document.getElementById('addressSummary').classList.add('hidden');
      document.getElementById('addressSection').classList.remove('hidden');
      document.getElementById('addressSection').scrollIntoView({ behavior: 'smooth' });
      if (btnFinalizar) btnFinalizar.classList.add('hidden');
    } else if (seccion === 'pago') {
      document.getElementById('paymentSummary').classList.add('hidden');
      document.getElementById('paymentSection').classList.remove('hidden');
      document.getElementById('paymentSection').scrollIntoView({ behavior: 'smooth' });
      if (btnFinalizar) btnFinalizar.classList.add('hidden');
    }
  };

});