const perguntas = [
  {
    tipo: "multiplaEscolha",
    pergunta: "Se o preço de um produto aumenta, o que acontece com a quantidade comprada?",
    opcoes: [
      { texto: "Aumenta", correta: false },
      { texto: "Diminui", correta: true },
      { texto: "Permanece igual", correta: false },
      { texto: "Não é possível saber", correta: false }
    ],
    explicacoes: [
      "Letra A: Errado. Se o preço aumenta, normalmente compramos menos.",
      "Letra B: Correto. Relação inversamente proporcional.",
      "Letra C: Errado. O comportamento muda com o preço.",
      "Letra D: Errado. Podemos sim prever essa relação."
    ],
    boneco: "Boneco1.png"
  },
  {
    tipo: "verdadeiroFalso",
    pergunta: "Se duas grandezas forem diretamente proporcionais, o gráfico entre elas será uma reta crescente.",
    opcoes: [
      { texto: "Verdadeiro", correta: true },
      { texto: "Falso", correta: false }
    ],
    explicacoes: [
      "Verdadeiro: Correto. A proporcionalidade direta gera uma reta crescente.",
      "Falso: Errado. Isso ocorre em proporcionalidade direta."
    ],
    boneco: "Boneco2.png"
  },
  {
    tipo: "multiplaMarcacao",
    pergunta: "Quais das opções abaixo representam grandezas diretamente proporcionais?",
    opcoes: [
      { texto: "Tempo de trabalho e salário mensal", correta: true },
      { texto: "Número de trabalhadores e tempo para concluir uma tarefa", correta: false },
      { texto: "Quantidade de combustível e distância percorrida", correta: true },
      { texto: "Velocidade e tempo para percorrer uma distância fixa", correta: false }
    ],
    explicacoes: [
      "A: Correto. Mais tempo trabalhado, maior salário.",
      "B: Errado. Essa é inversamente proporcional.",
      "C: Correto. Mais combustível, mais distância.",
      "D: Errado. Mais velocidade, menos tempo: relação inversa."
    ],
    boneco: "Boneco3.png"
  },
  {
    tipo: "multiplaEscolha",
    pergunta: "Qual gráfico representa uma relação inversamente proporcional entre duas grandezas?",
    opcoes: [
      { texto: "<img src='graficoA.png' width='150'>", correta: false },
      { texto: "<img src='graficoB.png' width='150'>", correta: true },
      { texto: "<img src='graficoC.png' width='150'>", correta: false },
      { texto: "<img src='graficoD.png' width='150'>", correta: false }
    ],
    explicacoes: [
      "Letra A: Errado. Representa uma reta crescente, relação direta.",
      "Letra B: Correto. Curva descendente indica relação inversa.",
      "Letra C: Errado. Representa uma constante.",
      "Letra D: Errado. Não demonstra relação proporcional."
    ],
    boneco: "Boneco4.png"
  },
  {
    tipo: "multiplaEscolha",
    pergunta: "<img src='perguntaGrafico.png' width='300'><br><br>Qual a melhor interpretação do gráfico acima?",
    opcoes: [
      { texto: "A quantidade cresce linearmente com o tempo.", correta: true },
      { texto: "A quantidade diminui com o tempo.", correta: false },
      { texto: "A quantidade se mantém constante.", correta: false },
      { texto: "Não é possível identificar uma tendência.", correta: false }
    ],
    explicacoes: [
      "Letra A: Correto. O gráfico mostra crescimento linear.",
      "Letra B: Errado. O gráfico mostra crescimento, não queda.",
      "Letra C: Errado. Há aumento visível.",
      "Letra D: Errado. A tendência é clara."
    ],
    boneco: "Boneco1.png"
  }
];

let indiceAtual = 0;
let acertos = 0;

function iniciarQuiz() {
  document.getElementById("telaInicial").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  indiceAtual = 0;
  acertos = 0;
  mostrarPergunta();
}

function mostrarPergunta() {
  const p = perguntas[indiceAtual];
  const perguntaEl = document.getElementById("pergunta");
  const opcoesEl = document.getElementById("opcoes");
  const feedbackEl = document.getElementById("feedback");
  const bonecoEl = document.getElementById("boneco");

  perguntaEl.innerHTML = `<h3>${p.pergunta}</h3>`;
  opcoesEl.innerHTML = "";
  feedbackEl.innerHTML = "";
  bonecoEl.style.display = "none";

  const indices = [...Array(p.opcoes.length).keys()].sort(() => Math.random() - 0.5);

  indices.forEach(i => {
    const opcao = document.createElement("label");
    const input = document.createElement("input");
    input.type = p.tipo === "multiplaMarcacao" ? "checkbox" : "radio";
    input.name = "opcao";
    input.value = i;
    opcao.appendChild(input);
    opcao.innerHTML += p.opcoes[i].texto;
    opcoesEl.appendChild(opcao);
    opcoesEl.appendChild(document.createElement("br"));
  });

  document.getElementById("btnResponder").style.display = "block";
  document.getElementById("btnProxima").style.display = "none";
}

function verificarResposta() {
  const p = perguntas[indiceAtual];
  const opcoesInputs = document.querySelectorAll("#opcoes input");
  const selecionados = [];

  opcoesInputs.forEach((input, idx) => {
    if (input.checked) {
      const indexOriginal = parseInt(input.value);
      selecionados.push(indexOriginal);
    }
  });

  const correta = p.opcoes.map(o => o.correta);
  const selecionadasCorretas = selecionados.every(i => p.opcoes[i].correta);
  const semExcesso = p.opcoes.filter(o => o.correta).length === selecionados.length;
  const tudoCerto = selecionadasCorretas && semExcesso;

  const feedback = document.getElementById("feedback");
  const bonecoEl = document.getElementById("boneco");
  feedback.innerHTML = "";

  if (tudoCerto) {
    acertos++;
    feedback.innerHTML = `<div class='balao'>Parabéns! Resposta correta.</div>`;
  } else {
    selecionados.forEach(i => {
      const balao = document.createElement("div");
      balao.className = "balao";
      balao.innerText = p.explicacoes[i];
      feedback.appendChild(balao);
    });
  }

  bonecoEl.src = p.boneco;
  bonecoEl.style.display = "block";
  document.getElementById("btnResponder").style.display = "none";
  document.getElementById("btnProxima").style.display = "inline-block";
}

function proximaPergunta() {
  indiceAtual++;
  if (indiceAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("telaFinal").style.display = "block";
    document.getElementById("pontuacaoFinal").innerText = `Você acertou ${acertos} de ${perguntas.length} perguntas.`;
  }
}

function reiniciarQuiz() {
  document.getElementById("telaFinal").style.display = "none";
  document.getElementById("telaInicial").style.display = "block";
}
