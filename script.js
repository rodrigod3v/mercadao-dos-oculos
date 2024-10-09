const questions = [
    {
        question: "Seu filho(a) reclama de dores de cabeça após estudar ou ler por muito tempo?",
        options: {
            A: "Frequentemente.",
            B: "Às vezes.",
            C: "Raramente.",
            D: "Nunca."
        }
    },
    {
        question: "Você percebe que seu filho(a) aproxima muito o rosto dos livros, cadernos ou tela de celular/computador?",
        options: {
            A: "Sim, sempre faz isso.",
            B: "Faz isso com frequência.",
            C: "Só faz às vezes.",
            D: "Não faz isso."
        }
    },
    {
        question: "Seu filho(a) pisca ou esfrega muito os olhos enquanto assiste TV ou faz atividades escolares?",
        options: {
            A: "Sim, frequentemente.",
            B: "Sim, algumas vezes.",
            C: "Raramente.",
            D: "Não, nunca faz isso."
        }
    },
    {
        question: "Seu filho(a) relata ter dificuldade para enxergar o que está escrito no quadro na escola?",
        options: {
            A: "Sim, já reclamou várias vezes.",
            B: "Reclama de vez em quando.",
            C: "Só aconteceu uma vez.",
            D: "Nunca reclamou."
        }
    },
    {
        question: "Você percebe seu filho(a) desviando o olhar ou fechando um dos olhos ao tentar focar em algo distante ou próximo?",
        options: {
            A: "Sim, faz isso bastante.",
            B: "Já percebi algumas vezes.",
            C: "Quase nunca.",
            D: "Não, nunca."
        }
    }
];

const results = {
    A: "<strong>Possível problema:</strong> <span style='color: red;'>Miopia</span>. Seu filho(a) pode estar tendo dificuldades para enxergar objetos distantes, como o quadro na sala de aula. Isso é um sinal de miopia e deve ser investigado. Mande uma mensagem para nossa ótica no WhatsApp e saiba como podemos ajudar com exames de vista e soluções personalizadas.",
    B: "<strong>Possível problema:</strong> <span style='color: red;'>Astigmatismo</span>. Dores de cabeça e esfregar os olhos podem ser sinais de astigmatismo, que afeta a nitidez da visão. Seu filho(a) pode precisar de lentes corretivas. Mande uma mensagem para nossa ótica no WhatsApp e saiba como podemos ajudar com exames de vista e soluções personalizadas.",
    C: "<strong>Possível problema:</strong><span style='color: red;'>Hipermetropia</span>. Se o seu filho(a) força os olhos para ler de perto, pode estar com hipermetropia, uma condição que afeta a visão próxima. É hora de agir! Mande uma mensagem para nossa ótica no WhatsApp e saiba como podemos ajudar com exames de vista e soluções personalizadas.",
    D: "<strong>Possível problema:</strong> <span style='color: red;'>Visão saudável</span>. Os sintomas não parecem indicar problemas visuais graves. No entanto, a saúde ocular é sempre uma prioridade! Converse com a gente pelo WhatsApp e receba orientação sobre medidas preventivas para garantir que tudo se mantenha bem com a visão do seu filho(a)."
};

let currentQuestionIndex = 0;
let answers = [];

// Função para carregar a pergunta atual
function loadQuestion() {
    const questionTitle = document.getElementById("question-title");
    const optionsList = document.getElementById("options-list");

    const currentQuestion = questions[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.question;
    optionsList.innerHTML = "";

    Object.keys(currentQuestion.options).forEach((key) => {
        const li = document.createElement("li");
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.value = key;

        // Verifica se a pergunta já foi respondida e seleciona a opção correta
        if (answers[currentQuestionIndex] === key) {
            input.checked = true;
        }

        label.appendChild(input);
        label.appendChild(document.createTextNode(currentQuestion.options[key]));
        li.appendChild(label);
        optionsList.appendChild(li);
    });

    // Oculta o botão "Voltar" na primeira pergunta ou ao mostrar o resultado
    document.getElementById("back-btn").style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
}

// Função para ir para a próxima pergunta
function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert("Por favor, selecione uma resposta.");
        return;
    }

    // Armazena a resposta
    answers[currentQuestionIndex] = selectedOption.value;

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResults();
    }
}

// Função para ir para a pergunta anterior
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

// Função para exibir os resultados
function showResults() {
    const resultContainer = document.getElementById("result-container");
    const questionContainer = document.getElementById("question-container");
    const resultText = document.getElementById("result-text");
    const subtitle = document.querySelector("h3"); // Seleciona o subtítulo

    questionContainer.style.display = "none"; // Esconde o questionário
    resultContainer.style.display = "block"; // Mostra o resultado

    // Esconde o botão "Voltar" no final
    document.getElementById("back-btn").style.display = "none";
    document.getElementById("next-btn").style.display = "none";

    // Lógica para calcular o resultado com base nas respostas
    const answerCounts = {
        A: 0,
        B: 0,
        C: 0,
        D: 0
    };

    answers.forEach((answer) => {
        answerCounts[answer]++;
    });

    let highestCount = 0;
    let finalResult = "";

    Object.keys(answerCounts).forEach((key) => {
        if (answerCounts[key] > highestCount) {
            highestCount = answerCounts[key];
            finalResult = results[key];
        }
    });

    resultText.innerHTML = finalResult; // Use innerHTML para exibir HTML / Exibir Cores
    
    // Exibe o botão do WhatsApp ao final
    document.querySelector(".whatsapp-container").style.display = "block";

    // Troca a logo ao final
    const logo = document.getElementById("logo");
    logo.src = "logo3.png"; 
}

// Função para reiniciar o quiz
function resetQuiz() {
    currentQuestionIndex = 0;
    answers = [];
    document.getElementById("result-container").style.display = "none";
    document.getElementById("question-container").style.display = "block";
    document.getElementById("next-btn").style.display = "inline-block";
    document.querySelector(".whatsapp-container").style.display = "none"; // Esconde o botão novamente
    loadQuestion();

    // Restaura a logo original
    const logo = document.getElementById("logo");
    logo.src = "logo.png"; // Altere para o caminho da logo original
}

// Carrega a primeira pergunta ao iniciar o quiz
loadQuestion();
