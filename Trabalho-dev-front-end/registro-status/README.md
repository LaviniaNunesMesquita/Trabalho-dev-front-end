
# ServiceTech — Acompanhamento do Atendimento

## 1. Sobre o projeto

Esta página faz parte do projeto acadêmico ServiceTech, um sistema para assistência técnica de equipamentos eletrônicos.

A tela permite visualizar os dados de um atendimento, incluindo cliente, aparelho, problema relatado, serviço solicitado e status atual.

## 2. Arquivos do projeto

- `index.html`: estrutura da página.
- `style.css`: cores, caixas, posicionamento e efeitos visuais.
- `script.js`: carrega os dados JSON e controla as interações.
- `dados.json`: guarda as informações fictícias do atendimento.

## 3. Tecnologias utilizadas

**HTML:** organiza os elementos da página.

**CSS:** define a aparência visual, incluindo cores, dimensões, bordas e alinhamento.

**JavaScript:** carrega os dados e adiciona interações aos botões.

**JSON:** organiza as informações do atendimento em propriedades e valores.

## 4. Cores oficiais

- Roxo principal: `#543295`
- Roxo escuro: `#3d296a`
- Amarelo: `#f4c24c`
- Amarelo claro: `#f3d492`
- Verde claro: `#aff0c6`
- Verde: `#12bc59`
- Lilás: `#d6c0fd`
- Pêssego: `#fdc49b`

## 5. Como executar

1. Abra a pasta do projeto no Visual Studio Code.
2. Instale a extensão Live Server, caso ainda não tenha.
3. Clique com o botão direito em `index.html`.
4. Selecione "Open with Live Server".
5. Verifique se os dados aparecem corretamente.

O Live Server é necessário porque o JavaScript usa `fetch()` para carregar o arquivo JSON.

## 6. Como funciona

O HTML cria os elementos da tela. O CSS organiza o layout e define a aparência. O JavaScript lê o arquivo JSON e coloca os valores nos elementos identificados por seus IDs.

Os botões do menu permitem mudar o destaque visual da opção selecionada. A busca e as notificações são demonstrativas e ainda não estão integradas a um serviço real.

## 7. Limitações atuais

- Os dados do atendimento são fictícios.
- A página não está conectada a uma API ou banco de dados.
- A navegação para outras telas ainda precisa ser integrada.
- Os contatos de WhatsApp e e-mail são exemplos e devem ser substituídos pelos canais oficiais antes de uma publicação real.
