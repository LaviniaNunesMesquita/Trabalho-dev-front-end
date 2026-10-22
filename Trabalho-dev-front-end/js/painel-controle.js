
// ========================================
// 1. DADOS INICIAIS
// ========================================

let atendimentos = [
    { id: 1, cliente: "Mariana", aparelho: "Notebook Dell", status: "recebido", prazo: "2026-10-21" },
    { id: 5, cliente: "João", aparelho: "iPhone 13", status: "recebido", prazo: "2026-10-22" },
    { id: 8, cliente: "Carlos", aparelho: "PC Gamer", status: "recebido", prazo: "2026-10-23" },

    { id: 2, cliente: "Ana", aparelho: "Galaxy A52", status: "analise", prazo: "2026-10-21" },
    { id: 6, cliente: "Pedro", aparelho: "Notebook Lenovo", status: "analise", prazo: "2026-10-22" },
    { id: 10, cliente: "Larissa", aparelho: "iPhone 12", status: "analise", prazo: "2026-10-23" },

    { id: 3, cliente: "Gabriel", aparelho: "MacBook Air", status: "manutencao", prazo: "2026-10-21" },
    { id: 7, cliente: "Beatriz", aparelho: "iPhone 11", status: "manutencao", prazo: "2026-10-22" },
    { id: 11, cliente: "Felipe", aparelho: "PC Escritório", status: "manutencao", prazo: "2026-10-23" },
    { id: 13, cliente: "Rafael", aparelho: "Tablet Samsung", status: "manutencao", prazo: "2026-10-25" },

    { id: 4, cliente: "Júlia", aparelho: "Samsung S21", status: "pronto", prazo: "2026-10-21" },
    { id: 9, cliente: "Matheus", aparelho: "Notebook Asus", status: "pronto", prazo: "2026-10-22" },
    { id: 12, cliente: "Camila", aparelho: "iPad", status: "pronto", prazo: "2026-10-23" }
];

let proximoId = Math.max(...atendimentos.map(a => a.id)) + 1;


// ========================================
// 2. ELEMENTOS DO HTML
// ========================================

const pesquisa = document.getElementById("pesquisarAtendimento");
const filtro = document.getElementById("filtrarStatus");
const modal = document.getElementById("modalAtendimento");
const formulario = document.getElementById("formAtendimento");
const mensagem = document.getElementById("mensagemPainel");

const nomesStatus = {
    recebido: "Recebido",
    analise: "Em análise",
    manutencao: "Em manutenção",
    pronto: "Pronto"
};

const colunas = {
    recebido: {
        lista: "listaRecebido",
        quantidade: "quantidadeRecebido"
    },
    analise: {
        lista: "listaAnalise",
        quantidade: "quantidadeAnalise"
    },
    manutencao: {
        lista: "listaManutencao",
        quantidade: "quantidadeManutencao"
    },
    pronto: {
        lista: "listaPronto",
        quantidade: "quantidadePronto"
    }
};


// ========================================
// 3. FUNÇÕES AUXILIARES
// ========================================

function escaparHTML(valor) {
    return String(valor).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}

function formatarData(data) {
    if (!data) return "Sem prazo";

    const [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}/${ano}`;
}

let temporizadorMensagem;

function mostrarMensagem(texto) {
    mensagem.textContent = texto;
    mensagem.classList.add("visivel");

    clearTimeout(temporizadorMensagem);

    temporizadorMensagem = setTimeout(() => {
        mensagem.classList.remove("visivel");
    }, 2500);
}


// ========================================
// 4. ESCOLHER UM ÍCONE PARA O APARELHO
// ========================================

function identificarIcone(aparelho) {
    const nome = aparelho.toLowerCase();

    if (
        nome.includes("iphone") ||
        nome.includes("celular") ||
        nome.includes("galaxy") ||
        nome.includes("samsung")
    ) {
        return "smartphone";
    }

    if (
        nome.includes("tablet") ||
        nome.includes("ipad")
    ) {
        return "tablet";
    }

    if (
        nome.includes("pc") ||
        nome.includes("computador") ||
        nome.includes("desktop")
    ) {
        return "monitor";
    }

    return "laptop";
}


// ========================================
// 5. CRIAR UM CARTÃO DE ATENDIMENTO
// ========================================

function criarCartao(atendimento) {
    const icone = identificarIcone(atendimento.aparelho);

    return `
        <article class="cartao-atendimento">

            <div class="informacoes-atendimento">

                <span class="icone icone-aparelho"
                      data-icone="${icone}"
                      aria-hidden="true">
                    [ícone]
                </span>

                <div>
                    <strong class="numero-atendimento">
                        #${String(atendimento.id).padStart(3, "0")}
                    </strong>

                    <p class="nome-aparelho">
                        ${escaparHTML(atendimento.aparelho)}
                    </p>

                    <p class="nome-cliente">
                        ${escaparHTML(atendimento.cliente)}
                    </p>
                </div>

            </div>

            <div class="rodape-atendimento">

                <span class="data-atendimento">
                    ${formatarData(atendimento.prazo)}
                </span>

                <span class="etiqueta-status ${atendimento.status}">
                    ${nomesStatus[atendimento.status]}
                </span>

            </div>

        </article>
    `;
}


// ========================================
// 6. PESQUISAR E FILTRAR ATENDIMENTOS
// ========================================

function obterAtendimentosFiltrados() {
    const termo = pesquisa.value
        .trim()
        .toLocaleLowerCase("pt-BR");

    const statusSelecionado = filtro.value;

    return atendimentos.filter(atendimento => {
        const texto = [
            atendimento.id,
            atendimento.cliente,
            atendimento.aparelho
        ].join(" ").toLocaleLowerCase("pt-BR");

        const correspondePesquisa = texto.includes(termo);

        const correspondeStatus =
            statusSelecionado === "todos" ||
            atendimento.status === statusSelecionado;

        return correspondePesquisa && correspondeStatus;
    });
}


// ========================================
// 7. RENDERIZAR AS QUATRO COLUNAS
// ========================================

function renderizarAtendimentos() {
    const filtrados = obterAtendimentosFiltrados();

    Object.keys(colunas).forEach(status => {
        const configuracao = colunas[status];

        const lista = document.getElementById(configuracao.lista);
        const quantidade = document.getElementById(configuracao.quantidade);

        const itens = filtrados.filter(
            atendimento => atendimento.status === status
        );

        if (itens.length > 0) {
            lista.innerHTML = itens.map(criarCartao).join("");
        } else {
            lista.innerHTML = `
                <p class="mensagem-vazia">
                    Nenhum atendimento encontrado.
                </p>
            `;
        }

        quantidade.textContent =
            `${itens.length} ${
                itens.length === 1
                    ? "atendimento"
                    : "atendimentos"
            }`;
    });

    atualizarIndicadores();
    renderizarPrazos();
}


// ========================================
// 8. ATUALIZAR OS INDICADORES
// ========================================

function atualizarIndicadores() {
    document.getElementById("totalAtendimentos").textContent =
        atendimentos.length;

    document.getElementById("totalAnalise").textContent =
        atendimentos.filter(a => a.status === "analise").length;

    document.getElementById("totalManutencao").textContent =
        atendimentos.filter(a => a.status === "manutencao").length;

    document.getElementById("totalProntos").textContent =
        atendimentos.filter(a => a.status === "pronto").length;
}


// ========================================
// 9. LISTAR OS PRÓXIMOS PRAZOS
// ========================================

function renderizarPrazos() {
    const lista = document.getElementById("listaPrazos");

    const pendentes = atendimentos
        .filter(a => a.status !== "pronto" && a.prazo)
        .sort((a, b) => a.prazo.localeCompare(b.prazo))
        .slice(0, 3);

    if (pendentes.length === 0) {
        lista.innerHTML = `
            <p class="mensagem-vazia">
                Nenhum prazo pendente.
            </p>
        `;
        return;
    }

    lista.innerHTML = pendentes.map(atendimento => `
        <div class="item-prazo">

            <span class="icone" aria-hidden="true">[ícone]</span>

            <div>
                <strong>
                    ${escaparHTML(atendimento.aparelho)}
                </strong>

                <span>
                    ${formatarData(atendimento.prazo)}
                </span>
            </div>

        </div>
    `).join("");
}


// ========================================
// 10. ABRIR E FECHAR O MODAL
// ========================================

document.getElementById("novoAtendimento")
    .addEventListener("click", () => {

        formulario.reset();          

        const agora = new Date();
        const dataLocal = new Date(
            agora.getTime() -
            agora.getTimezoneOffset() * 60000
        ).toISOString().slice(0, 10);

        formulario.elements.prazo.value = dataLocal;

        modal.showModal();
    });

function fecharModal() {
    modal.close();
}

document.getElementById("fecharModal")
    .addEventListener("click", fecharModal);

document.getElementById("cancelarModal")
    .addEventListener("click", fecharModal);


// ========================================
// 11. CADASTRAR UM ATENDIMENTO
// ========================================

formulario.addEventListener("submit", event => {
    event.preventDefault();

    const dados = new FormData(formulario);

    const cliente = String(dados.get("cliente") || "").trim();
    const aparelho = String(dados.get("aparelho") || "").trim();
    const prazo = String(dados.get("prazo") || "");
    const status = String(dados.get("status") || "");
    const observacoes = String(
        dados.get("observacoes") || ""
    ).trim();

    if (!cliente || !aparelho || !prazo) {
        mostrarMensagem("Preencha os campos obrigatórios.");
        return;
    }

    if (!Object.hasOwn(nomesStatus, status)) {
        mostrarMensagem("Selecione um status válido.");
        return;
    }

    const novoAtendimento = {
        id: proximoId++,
        cliente,
        aparelho,
        prazo,
        status,
        observacoes
    };

    atendimentos.push(novoAtendimento);

    formulario.reset();
    fecharModal();

    // Limpa a pesquisa para exibir o novo atendimento.
    pesquisa.value = "";
    filtro.value = "todos";

    renderizarAtendimentos();

    mostrarMensagem("Atendimento cadastrado com sucesso!");
});


// ========================================
// 12. EVENTOS DE PESQUISA E FILTRO
// ========================================

pesquisa.addEventListener("input", renderizarAtendimentos);

filtro.addEventListener("change", renderizarAtendimentos);


// ========================================
// 13. INICIALIZAÇÃO DO PAINEL
// ========================================

renderizarAtendimentos();