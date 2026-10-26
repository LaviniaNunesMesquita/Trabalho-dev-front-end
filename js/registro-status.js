/* CARREGAR OS DADOS DO JSON E LOCALSTORAGE */

const parametrosUrl = new URLSearchParams(window.location.search);
const chamadoUrl = parametrosUrl.get("chamado") ? parametrosUrl.get("chamado").trim() : "";

if (chamadoUrl) {
    localStorage.setItem("chamado_pesquisado", chamadoUrl);
}

const chamadoPesquisado = chamadoUrl || localStorage.getItem("chamado_pesquisado") || "";

fetch("dados.json")
    .then(function(resposta) {
        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os dados.");
        }

        return resposta.json();
    })
    .then(function(dados) {
        const idFormatado = chamadoPesquisado
            ? (chamadoPesquisado.startsWith("#") ? chamadoPesquisado : "#" + chamadoPesquisado)
            : dados.id;

        const statusSalvo = JSON.parse(localStorage.getItem(idFormatado));
        if (statusSalvo && statusSalvo.status) {
            dados.status = statusSalvo.status;
        }

        localStorage.setItem("registro_status_dados", JSON.stringify(dados));

        // Informações principais do atendimento
        document.getElementById("saudacao").textContent =
            "Olá, " + dados.cliente + "!";

        document.getElementById("mensagem-status").textContent =
            dados.mensagem;

        document.getElementById("titulo-atendimento").textContent =
            "Atendimento " + idFormatado;

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
            idFormatado;

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
        if (chamadoPesquisado) {
            const idFormatado = chamadoPesquisado.startsWith("#") ? chamadoPesquisado : "#" + chamadoPesquisado;
            document.getElementById("titulo-atendimento").textContent = "Atendimento " + idFormatado;
            document.getElementById("resumo-id").textContent = idFormatado;
        }

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
const botaoBusca = document.getElementById("botao-busca");
if (botaoBusca) {
    botaoBusca.addEventListener("click", function() {
        alert("A pesquisa será conectada em uma próxima etapa.");
    });
}

// Botão de notificações
const botaoNotificacao = document.getElementById("botao-notificacao");
if (botaoNotificacao) {
    botaoNotificacao.addEventListener("click", function() {
        alert("Você não tem novas notificações.");
    });
}
