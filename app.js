// Variáveis globais
let amigos = [];                  
let amigosSorteados = new Set();  

// Função para adicionar o nome na lista de amigos
function adicionarAmigo() {
    const inputNome = document.getElementById("amigo");
    const nome = inputNome.value.trim();

    if (nome && !amigos.includes(nome)) {
        amigos.push(nome);
        inputNome.value = "";
        verificarEstadoBotoes();
    } else if (amigos.includes(nome)) {
        mostrarMensagem("Este nome já está na lista.");
    }
}

// Mostrar mensagem de erro
function mostrarMensagem(mensagem) {
    const resultado = document.getElementById("resultado");
    resultado.textContent = mensagem;
    resultado.style.display = "block";
}

// Ocultar mensagens
function ocultarMensagem() {
    const resultado = document.getElementById("resultado");
    resultado.style.display = "none";
}

// Verificar estado dos botões
function verificarEstadoBotoes() {
    const botaoSortear = document.querySelector(".button-draw");

    if (amigos.length >= 3 && amigos.length % 2 === 0) {
        botaoSortear.disabled = false;
        ocultarMensagem();
    } else {
        botaoSortear.disabled = true;
        if (amigos.length < 3) {
            mostrarMensagem("Adicione mais nomes para começar o sorteio.");
        } else if (amigos.length % 2 !== 0) {
            mostrarMensagem("Adicione mais um nome para o sorteio.");
        }
    }

    if (amigos.length > 0) {
        mostrarBotaoReiniciar();
    }
}

// Função para sortear o amigo secreto
function sortearAmigo() {
    const naoSorteados = amigos.filter((nome) => !amigosSorteados.has(nome));

    if (naoSorteados.length === 0) {
        mostrarMensagem("Todos os nomes já foram sorteados.");
        return;
    }

    const indice = Math.floor(Math.random() * naoSorteados.length);
    const sorteado = naoSorteados[indice];
    amigosSorteados.add(sorteado);

    const resultado = document.getElementById("resultado");
    resultado.textContent = `🎉 ${sorteado} foi sorteado!`;
    resultado.style.display = "block";

    if (amigosSorteados.size === amigos.length) {
        const botaoSortear = document.querySelector(".button-draw");
        botaoSortear.disabled = true;
    }
}

// Mostrar botão de reiniciar
function mostrarBotaoReiniciar() {
    const botaoContainer = document.querySelector(".button-container");
    if (document.querySelector(".button-restart")) return;

    const botaoReiniciar = document.createElement("button");
    botaoReiniciar.textContent = "Reiniciar sorteio";
    botaoReiniciar.classList.add("button-restart");
    botaoReiniciar.onclick = reiniciarSorteio;

    botaoContainer.appendChild(botaoReiniciar);
}

// Função para reiniciar o sorteio
function reiniciarSorteio() {
    amigos = [];
    amigosSorteados = new Set();
    ocultarMensagem();

    const botaoSortear = document.querySelector(".button-draw");
    botaoSortear.disabled = true;

    const resultado = document.getElementById("resultado");
    resultado.textContent = "";
    resultado.style.display = "none";

    const botaoReiniciar = document.querySelector(".button-restart");
    if (botaoReiniciar) botaoReiniciar.remove();
}

// Eventos de teclado
document.getElementById("amigo").addEventListener("keydown", (e) => {
    if (e.key === "Enter") adicionarAmigo();
});

document.querySelector(".button-draw").addEventListener("keydown", (e) => {
    if (e.key === "Enter") sortearAmigo();
});
