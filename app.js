// Variáveis globais
let amigos = [];                  // Lista de amigos (original)
let amigosSorteados = [];         // Lista de amigos sorteados (temporária)
let sorteiosFeitos = 0;           // Contador de sorteios feitos

// Função para adicionar o nome na lista de amigos
function adicionarAmigo() {
    const inputNome = document.getElementById("amigo");
    const nome = inputNome.value.trim();

    // Verifica se o nome não está vazio e se o nome não está repetido
    if (nome && !amigos.includes(nome)) {
        amigos.push(nome);
        inputNome.value = ""; // Limpa o campo de texto

        // Só verifica se é possível sortear depois do 3º nome
        if (amigos.length >= 3) {
            // Verifica se o número de amigos é ímpar
            if (amigos.length % 2 !== 0) {
                mostrarMensagem("Adicione mais um nome para poder sortear.");
            } else {
                ocultarMensagem();
            }
        }
    } else if (amigos.includes(nome)) {
        mostrarMensagem("Este nome já está na lista.");
    }
}

// Função para mostrar ou esconder a mensagem de erro
function mostrarMensagem(mensagem) {
    const resultado = document.getElementById("resultado");
    resultado.textContent = mensagem;
    resultado.style.display = "block";
}

function ocultarMensagem() {
    const resultado = document.getElementById("resultado");
    resultado.style.display = "none";
}

// Função para sortear o amigo secreto
function sortearAmigo() {
    // Verifica se a quantidade de amigos é suficiente para realizar o sorteio
    if (amigos.length < 3 || amigos.length % 2 !== 0) {
        mostrarMensagem("Adicione mais um nome para poder sortear.");
        return;
    }

    // Se a lista de sorteios estiver vazia, embaralha a lista
    if (amigosSorteados.length === 0) {
        amigosSorteados = [...amigos]; // Cria uma cópia da lista amigos para o sorteio
        embaralharLista();
    }

    // Verifica se todos os nomes foram sorteados
    if (amigosSorteados.length === 0) {
        mostrarMensagem("Todos os nomes já foram sorteados.");
        desabilitarBotaoSortear();
        mostrarBotaoReiniciar();
        return;
    }

    // Sorteia o próximo nome da lista
    const sorteioAtual = amigosSorteados.pop(); // Pega o último nome da lista
    const resultado = document.getElementById("resultado");
    resultado.textContent = `${sorteioAtual}`; // Exibe o nome sorteado
    resultado.style.display = "block";

    // Incrementa o contador de sorteios feitos
    sorteiosFeitos++;

    // Desabilita o botão apenas após o último sorteio
    if (amigosSorteados.length === 0) {
        desabilitarBotaoSortear(); // Desabilita o botão ao final do sorteio
    }
}

// Função para embaralhar a lista de amigos
function embaralharLista() {
    for (let i = amigosSorteados.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [amigosSorteados[i], amigosSorteados[j]] = [amigosSorteados[j], amigosSorteados[i]];
    }
}

// Função para desabilitar o botão de sorteio
function desabilitarBotaoSortear() {
    const botaoSortear = document.querySelector(".button-draw");
    botaoSortear.disabled = true; // Desabilita o botão de sortear
    botaoSortear.classList.add("button-disabled"); // Adiciona a classe para deixar o botão cinza
}

// Função para mostrar o botão de reiniciar sorteio
function mostrarBotaoReiniciar() {
    const botaoContainer = document.querySelector(".button-container");
    const botaoReiniciar = document.createElement("button");
    botaoReiniciar.textContent = "Reiniciar Sorteio";
    botaoReiniciar.classList.add("button-restart");
    botaoReiniciar.onclick = reiniciarSorteio;
    botaoContainer.appendChild(botaoReiniciar);
}

// Função para reiniciar o sorteio
function reiniciarSorteio() {
    amigos = [];
    amigosSorteados = [];
    sorteiosFeitos = 0;
    const resultado = document.getElementById("resultado");
    resultado.style.display = "none";
    const botaoSortear = document.querySelector(".button-draw");
    botaoSortear.disabled = false; // Reabilita o botão de sortear
    const botaoReiniciar = document.querySelector(".button-restart");
    botaoReiniciar.remove(); // Remove o botão de reiniciar
}

// Adiciona o evento para o "Enter" tanto para adicionar quanto para sortear
document.getElementById("amigo").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        adicionarAmigo();
    }
});

document.querySelector(".button-draw").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sortearAmigo();
    }
});

// Adiciona o evento de clique ao botão de adicionar
document.querySelector(".button-add").addEventListener("click", adicionarAmigo);

// Adiciona o evento de clique ao botão de sortear
document.querySelector(".button-draw").addEventListener("click", sortearAmigo);
