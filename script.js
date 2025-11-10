// script.js - manejo de pasos y validaciones (cargado con defer)
document.addEventListener('DOMContentLoaded', () => {
  const personalBtn = document.getElementById('btnPersonalContinue');
  const addressBtn = document.getElementById('btnAddressContinue');
  const paymentBtn = document.getElementById('btnPaymentContinue');
  const btnFinalizar = document.getElementById('btnFinalizar');

  // Helper: obtener valor seguro
  const val = id => (document.getElementById(id) || {}).value?.trim() || '';

  // Validadores
  function isFechaValida(fecha) {
    const re = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!re.test(fecha)) return false;
    const [d,m,y] = fecha.split('/').map(n => parseInt(n,10));
    if (m < 1 || m > 12) return false;
    const dias = new Date(y, m, 0).getDate();
    return d >= 1 && d <= dias;
  }

  function validarPersonal() {
    const nombre = val('nombre');
    const celular = val('celular');
    const email = val('email');
    const fecha = val('fechaNacimiento');

    if (!nombre || !celular || !email) {
      alert('Complete Nombre, Celular y Email antes de continuar.');
      return false;
    }
    if (!isFechaValida(fecha)) {
      alert('Ingrese la Fecha de Nacimiento en formato DD/MM/AAAA (ej: 31/12/1990).');
      return false;
    }

    // Mostrar resumen y marcar completado
    document.getElementById('resumenPersonal').textContent = `${nombre} | ${celular} | ${email}`;
    document.getElementById('personalData').classList.add('hidden');
    document.getElementById('personalSummary').classList.remove('hidden');
    document.querySelector('#personalData legend')?.classList.add('completed');

    // Habilitar domicilio
    const address = document.getElementById('addressSection');
    address?.classList.remove('disabled');
    address?.classList.remove('hidden');
    address?.querySelector('.locked-message')?.remove();
    address?.scrollIntoView({ behavior: 'smooth' });

    return true;
  }

  function validarDomicilio() {
    const required = ['codigoPostal','calle','numero','tipoDomicilio','provincia','ciudad'];
    for (let id of required) {
      if (!val(id)) {
        alert('Por favor complete todos los campos de domicilio antes de continuar.');
        return false;
      }
    }

    // Mostrar resumen y marcar completado
    const calle = val('calle'), numero = val('numero'), ciudad = val('ciudad'), provincia = val('provincia');
    document.getElementById('resumenDomicilio').textContent = `${calle} ${numero}, ${ciudad}, ${provincia}`;
    document.getElementById('addressSection').classList.add('hidden');
    document.getElementById('addressSummary').classList.remove('hidden');
    document.querySelector('#addressSection legend')?.classList.add('completed');

    // Habilitar pago
    const pay = document.getElementById('paymentSection');
    pay?.classList.remove('disabled');
    pay?.classList.remove('hidden');
    pay?.querySelector('.locked-message')?.remove();
    pay?.scrollIntoView({ behavior: 'smooth' });

    return true;
  }

  function validarPago() {
    const metodo = document.querySelector('input[name="metodoPago"]:checked');
    const cuotas = val('cuotas');
    const tarjeta = val('TarjetaNum');
    const nombreTarj = val('NombreTarj');
    const mes = val('mes');
    const ano = val('ano');
    const codigo = val('Codigo');

    if (!metodo) { alert('Seleccione el método de pago.'); return false; }
    if (!cuotas) { alert('Seleccione la cantidad de cuotas.'); return false; }
    if (!tarjeta || tarjeta.replace(/\s+/g,'').length < 12) { alert('Ingrese un número de tarjeta válido (mín. 12 dígitos).'); return false; }
    if (!nombreTarj) { alert('Ingrese el nombre que figura en la tarjeta.'); return false; }
    if (!mes || !ano) { alert('Seleccione mes y año de vencimiento.'); return false; }
    if (!codigo || codigo.length < 3) { alert('Ingrese el código de seguridad (3 o 4 dígitos).'); return false; }

    // Mostrar resumen y marcar completado
    const last4 = tarjeta.replace(/\D/g,'').slice(-4).padStart(4, '*');
    document.getElementById('resumenPago').textContent = `${metodo.value} | ${cuotas} | ****${last4}`;
    document.getElementById('paymentSection').classList.add('hidden');
    document.getElementById('paymentSummary').classList.remove('hidden');
    document.querySelector('#paymentSection legend')?.classList.add('completed');

    // Mostrar botón finalizar
    btnFinalizar?.classList.remove('hidden');
    btnFinalizar?.scrollIntoView({ behavior: 'smooth' });

    return true;
  }

  // Atachar listeners a botones (si existen)
  personalBtn?.addEventListener('click', validarPersonal);
  addressBtn?.addEventListener('click', validarDomicilio);
  paymentBtn?.addEventListener('click', validarPago);

  // Previene que ENTER en inputs envíe el form accidentalmente
  document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter') e.preventDefault();
    });
  });

  // Función global editarSeccion usada en botones "Modificar"
  window.editarSeccion = function(seccion) {
    if (seccion === 'personal') {
      document.getElementById('personalSummary').classList.add('hidden');
      document.getElementById('personalData').classList.remove('hidden');
      document.getElementById('personalData').scrollIntoView({ behavior: 'smooth' });
      // Cuando se edita, ocultamos final si estaba visible
      btnFinalizar?.classList.add('hidden');
    } else if (seccion === 'domicilio') {
      document.getElementById('addressSummary').classList.add('hidden');
      document.getElementById('addressSection').classList.remove('hidden');
      document.getElementById('addressSection').scrollIntoView({ behavior: 'smooth' });
      btnFinalizar?.classList.add('hidden');
    } else if (seccion === 'pago') {
      document.getElementById('paymentSummary').classList.add('hidden');
      document.getElementById('paymentSection').classList.remove('hidden');
      document.getElementById('paymentSection').scrollIntoView({ behavior: 'smooth' });
      btnFinalizar?.classList.add('hidden');
    }
  };
});