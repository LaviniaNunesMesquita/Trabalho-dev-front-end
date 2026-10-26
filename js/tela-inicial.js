//CAMPO DE BUSCA CHAMADOS POR ID
const btnAcompanhar = document.getElementById('btn-acompanhar');
const formBuscaChamado = document.getElementById('form-busca-chamado');
const inputNumeroChamado = document.getElementById('numero-chamado');


//ESCONDE O FORMULARIO
btnAcompanhar.addEventListener('click', function () {
    const estaOculto = formBuscaChamado.hasAttribute('hidden');
    if (estaOculto) {
        formBuscaChamado.removeAttribute('hidden');
        inputNumeroChamado.focus();
    } else {
        formBuscaChamado.setAttribute('hidden', '');
    }
});
