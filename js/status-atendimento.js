const opcoesStatus = [
    { classe: 'recebido', texto: 'Recebido' },
    { classe: 'analise', texto: 'Em análise' },
    { classe: 'manutencao', texto: 'Em manutenção' },
    { classe: 'pronto', texto: 'Pronto' }
];

// Carregamento dos atendimentos
fetch('status-atendimento.json')
    .then(res => res.json())
    .then(dados => {
        document.getElementById('lista-atendimentos').innerHTML = dados.map(a => {
            const salvo = JSON.parse(localStorage.getItem(a.id));
            if (salvo) Object.assign(a, salvo);

            return `
            <tr class="item-${a.classe}">
                <td>${a.id}</td>
                <td>${a.cliente}</td>
                <td>${a.aparelho}</td>
                <td>${a.servico}</td>
                <td><span class="etiqueta-status ${a.classe}">${a.status}</span></td>
                <td>${a.data}</td>
                <td class="celula-acoes">
                    <button type="button" class="btn-editar" onclick="alternarMenuStatus(this)">
                        <i class="bi bi-pencil-square"></i> Editar
                    </button>
                    <div class="menu-status" hidden>
                        ${opcoesStatus.map(op => `
                            <button
                                type="button"
                                class="opcao-status ${op.classe === a.classe ? 'ativo' : ''}"
                                data-classe="${op.classe}"
                                onclick="alterarStatus(this, '${op.classe}', '${op.texto}')"
                            >
                                <span class="etiqueta-status ${op.classe}">${op.texto}</span>
                            </button>
                        `).join('')}
                    </div>
                </td>
            </tr>
        `;
        }).join('');
    });

// Pesquisa por ID ou nome do cliente
const campoPesquisa = document.querySelector('.pesquisa');
if (campoPesquisa) {
    campoPesquisa.addEventListener('input', function () {
        const termo = this.value.toLowerCase().trim();
        document.querySelectorAll('.tabela tbody tr').forEach(tr => {
            const id = tr.children[0].textContent.toLowerCase();
            const cliente = tr.children[1].textContent.toLowerCase();
            tr.style.display = (id.includes(termo) || cliente.includes(termo)) ? '' : 'none';
        });
    });
}

// Alternar abertura do menu de status
function alternarMenuStatus(botao) {
    const menuAtual = botao.nextElementSibling;
    const estavaOculto = menuAtual.hasAttribute('hidden');

    document.querySelectorAll('.menu-status').forEach(menu => {
        menu.setAttribute('hidden', '');
    });

    if (estavaOculto) {
        menuAtual.removeAttribute('hidden');
    }
}

// Alterar o status do atendimento selecionado
function alterarStatus(botaoOpcao, novaClasse, novoTexto) {
    const linha = botaoOpcao.closest('tr');
    const etiqueta = linha.querySelector('td:nth-child(5) .etiqueta-status');
    const menu = botaoOpcao.closest('.menu-status');

    linha.className = `item-${novaClasse}`;
    etiqueta.className = `etiqueta-status ${novaClasse}`;
    etiqueta.textContent = novoTexto;

    localStorage.setItem(linha.children[0].textContent, JSON.stringify({ classe: novaClasse, status: novoTexto }));

    menu.querySelectorAll('.opcao-status').forEach(btn => {
        btn.classList.toggle('ativo', btn.dataset.classe === novaClasse);
    });

    menu.setAttribute('hidden', '');
}

// Fechar o menu ao clicar fora
document.addEventListener('click', function (evento) {
    if (!evento.target.closest('.celula-acoes')) {
        document.querySelectorAll('.menu-status').forEach(menu => {
            menu.setAttribute('hidden', '');
        });
    }
});
