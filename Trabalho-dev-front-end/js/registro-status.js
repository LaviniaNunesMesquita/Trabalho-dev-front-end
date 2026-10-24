
/* CARREGAR OS DADOS DO JSON */

fetch("dados.json")
    .then(function(resposta) {
        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os dados.");
        }

        return resposta.json();
    })
    .then(function(dados) {

        // Informações principais do atendimento
        document.getElementById("saudacao").textContent =
            "Olá, " + dados.cliente + "!";

        document.getElementById("mensagem-status").textContent =
            dados.mensagem;

        document.getElementById("titulo-atendimento").textContent =
            "Atendimento " + dados.id;

        document.getElementById("aparelho-titulo").textContent =
            dados.aparelhoCompleto;

        document.getElementById("cliente").textContent =
            dados.cliente;

        document.getElementById("aparelho").textContent =
            dados.aparelho;

        document.getElementById("marca-aparelho").textContent =
            dados.marca;

        document.getElementById("modelo").textContent =
            dados.modelo;

        document.getElementById("problema").textContent =
            dados.problema;

        document.getElementById("servico").textContent =
            dados.servico;

        document.getElementById("data").textContent =
            dados.data;

        document.getElementById("observacoes").textContent =
            dados.observacoes;


        // Informações repetidas no resumo lateral
        document.getElementById("resumo-id").textContent =
            dados.id;

        document.getElementById("resumo-aparelho").textContent =
            dados.aparelhoCompleto;

        document.getElementById("resumo-cliente").textContent =
            dados.cliente;

        document.getElementById("resumo-data").textContent =
            dados.data;


        // Mostra o status nos dois lugares da página
        document.getElementById("status-topo").textContent =
            "◷ " + dados.status;

        document.getElementById("resumo-status").textContent =
            "◷ " + dados.status;

    })
    .catch(function(erro) {

        // Mensagem exibida se o JSON não carregar
        document.getElementById("mensagem-status").textContent =
            "Não foi possível carregar os dados. Verifique o arquivo dados.json.";

        console.log(erro);
    });


/* MENU LATERAL */

// Encontramos todos os botões do menu
const botoesMenu = document.querySelectorAll(".item-menu");

// Criamos uma ação para cada botão
botoesMenu.forEach(function(botao) {

    botao.addEventListener("click", function() {

        // Retiramos o destaque dos outros botões
        botoesMenu.forEach(function(item) {
            item.classList.remove("ativo");
        });

        // Destacamos o botão clicado
        botao.classList.add("ativo");
    });

});


/* BOTÕES DO CABEÇALHO */

// Botão de pesquisa
document.getElementById("botao-busca").addEventListener("click", function() {
    alert("A pesquisa será conectada em uma próxima etapa.");
});

// Botão de notificações
document.getElementById("botao-notificacao").addEventListener("click", function() {
    alert("Você não tem novas notificações.");
});
