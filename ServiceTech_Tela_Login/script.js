// Buscamos os dados do arquivo dados.json.
fetch("dados.json")
    .then(function(resposta) {
        return resposta.json();
    })
    .then(function(dadosTela) {
        // Colocamos os textos do JSON nos elementos da página.
        document.getElementById("subtitulo-marca").textContent = dadosTela.subtitulo;
        document.getElementById("titulo-login").textContent = dadosTela.titulo;
        document.getElementById("texto-login").textContent = dadosTela.descricao;
        document.getElementById("texto-botao").textContent = dadosTela.textoBotao;

        // Criamos uma caixa para cada benefício que está no JSON.
        const caixaBeneficios = document.getElementById("beneficios");

        dadosTela.beneficios.forEach(function(beneficio) {
            const caixa = document.createElement("div");
            caixa.className = "beneficio";

            const simbolo = document.createElement("span");
            simbolo.className = "simbolo";
            simbolo.textContent = beneficio.simbolo;

            const texto = document.createElement("p");
            texto.textContent = beneficio.texto;

            caixa.appendChild(simbolo);
            caixa.appendChild(texto);
            caixaBeneficios.appendChild(caixa);
        });
    })
    .catch(function() {
        alert("Não foi possível carregar os dados. Abra o projeto usando o Live Server.");
    });

// Mostra ou esconde a senha quando o botão do olho é clicado.
const botaoMostrarSenha = document.getElementById("mostrar-senha");
const campoSenha = document.getElementById("senha");

botaoMostrarSenha.addEventListener("click", function() {
    if (campoSenha.type === "password") {
        campoSenha.type = "text";
        botaoMostrarSenha.textContent = "⊘";
    } else {
        campoSenha.type = "password";
        botaoMostrarSenha.textContent = "◉";
    }
});

// Fazemos uma demonstração de envio do formulário.
const formulario = document.getElementById("form-login");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const emailDigitado = document.getElementById("email").value.trim();
    const senhaDigitada = campoSenha.value;

    if (emailDigitado !== "" && senhaDigitada !== "") {
        // Guardamos apenas o e-mail no navegador, nunca a senha.
        localStorage.setItem("servicetech_ultimo_email", emailDigitado);

        mensagem.textContent = "Campos preenchidos! A validação real precisa ser feita pelo sistema.";
        mensagem.className = "mensagem sucesso";
    } else {
        mensagem.textContent = "Preencha o e-mail e a senha.";
        mensagem.className = "mensagem erro";
    }
});

// Recupera o último e-mail usado neste navegador.
const emailSalvo = localStorage.getItem("servicetech_ultimo_email");

if (emailSalvo) {
    document.getElementById("email").value = emailSalvo;
}
