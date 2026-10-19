const cartaBotao = document.getElementById("cartaBotao");

const surpresaBotao = document.getElementById("surpresaBotao");

const surpresaMensagem = document.getElementById("surpresaMensagem");

const dataInicio = document.getElementById("dataInicio");


// ABRIR A CARTA

cartaBotao.addEventListener("click", function () {
    cartaBotao.classList.toggle("aberta");

    if (cartaBotao.classList.contains("aberta")) {
        criarCoracoes(8);
    }
});


// BOTÃO DE SURPRESA

surpresaBotao.addEventListener("click", function () {
    const mensagens = [
        "Meu lugar favorito sempre vai ser ao seu lado. ♡",

        "Se eu pudesse escolher de novo, escolheria você.",

        "Você é a minha parte favorita de todos os dias.",

        "Gosto de você mais do que consigo explicar. ♡",

        "Você é o meu milagre favorito. 👻♡"
    ];

    const indice = Math.floor(Math.random() * mensagens.length);

    surpresaMensagem.textContent = mensagens[indice];

    criarCoracoes(15);
});


// CORAÇÕES FLUTUANTES

function criarCoracoes(quantidade) {
    for (let i = 0; i < quantidade; i++) {
        const coracao = document.createElement("span");

        coracao.textContent = Math.random() > 0.5 ? "♥" : "♡";

        coracao.style.position = "fixed";

        coracao.style.left = Math.random() * 100 + "vw";

        coracao.style.top = 50 + Math.random() * 40 + "vh";

        coracao.style.color = Math.random() > 0.5
            ? "#ed9ca8"
            : "#b82d42";

        coracao.style.fontSize = 15 + Math.random() * 20 + "px";

        coracao.style.pointerEvents = "none";

        coracao.style.zIndex = "999";

        coracao.style.animation = "subir 2s ease-out forwards";

        document.body.appendChild(coracao);

        setTimeout(function () {
            coracao.remove();
        }, 2000);
    }
}


// ANIMAÇÃO DOS CORAÇÕES

const estilo = document.createElement("style");

estilo.textContent = `
    @keyframes subir {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
        }

        to {
            opacity: 0;
            transform: translateY(-150px) scale(1.5);
        }
    }
`;

document.head.appendChild(estilo);


// CONTADOR DE TEMPO DE NAMORO

function atualizarContador() {
    const valor = dataInicio.value;

    if (!valor) {
        document.getElementById("dias").textContent = "0";
        document.getElementById("horas").textContent = "0";
        document.getElementById("minutos").textContent = "0";

        return;
    }

    const inicio = new Date(valor + "T00:00:00");

    const agora = new Date();

    if (isNaN(inicio.getTime()) || inicio > agora) {
        document.getElementById("dias").textContent = "—";
        document.getElementById("horas").textContent = "—";
        document.getElementById("minutos").textContent = "—";

        return;
    }

    const diferenca = agora - inicio;

    const minutosTotais = Math.floor(diferenca / 60000);

    const dias = Math.floor(minutosTotais / 1440);

    const horas = Math.floor((minutosTotais % 1440) / 60);

    const minutos = minutosTotais % 60;

    document.getElementById("dias").textContent = dias;

    document.getElementById("horas").textContent = horas;

    document.getElementById("minutos").textContent = minutos;
}


// SALVAR A DATA ESCOLHIDA

dataInicio.addEventListener("change", function () {
    localStorage.setItem("dataNamoro", dataInicio.value);

    atualizarContador();
});


// RECUPERAR A DATA SALVA

dataInicio.value = "2025-06-12";

localStorage.setItem("dataNamoro", "2025-06-12");
atualizarContador();

setInterval(atualizarContador, 60000);
// ===== GALERIA INTERATIVA =====

const fotos = [...document.querySelectorAll(".foto-card .foto")];

const visualizador = document.getElementById("visualizador");
const imagemAmpliada = document.getElementById("imagemAmpliada");
const legendaAmpliada = document.getElementById("legendaAmpliada");

const fecharFoto = document.getElementById("fecharFoto");
const fotoAnterior = document.getElementById("fotoAnterior");
const proximaFoto = document.getElementById("proximaFoto");

let indiceAtual = 0;

function mostrarFoto(indice) {
    indiceAtual = (indice + fotos.length) % fotos.length;

    const foto = fotos[indiceAtual];
    const cartao = foto.closest(".foto-card");

    imagemAmpliada.src = foto.src;
    imagemAmpliada.alt = foto.alt;

    legendaAmpliada.textContent =
        cartao.querySelector("figcaption").textContent;

    visualizador.classList.add("aberto");
    visualizador.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
}

function fecharVisualizador() {
    visualizador.classList.remove("aberto");
    visualizador.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}

fotos.forEach((foto, indice) => {
    foto.closest(".foto-card").addEventListener("click", () => {
        mostrarFoto(indice);
    });
});

fecharFoto.addEventListener("click", fecharVisualizador);

fotoAnterior.addEventListener("click", () => {
    mostrarFoto(indiceAtual - 1);
});

proximaFoto.addEventListener("click", () => {
    mostrarFoto(indiceAtual + 1);
});

visualizador.addEventListener("click", (evento) => {
    if (evento.target === visualizador) {
        fecharVisualizador();
    }
});

document.addEventListener("keydown", (evento) => {
    if (!visualizador.classList.contains("aberto")) return;

    if (evento.key === "Escape") {
        fecharVisualizador();
    }

    if (evento.key === "ArrowRight") {
        mostrarFoto(indiceAtual + 1);
    }

    if (evento.key === "ArrowLeft") {
        mostrarFoto(indiceAtual - 1);
    }
});
