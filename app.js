const questions = [
    {
        question: "Atatürkün gözünden yaralandığı savaş?",
        answers: [
            { text: "Çanakkale", correct: false},
            { text: "Trablusgarp", correct: true},
            { text: "Dumlupınar", correct: false},
            { text: "Sakarya", correct: false},
        ]
    },
    {
        question: "Atatürkün ilk görev yeri?",
        answers: [
            { text: "Şam", correct: true},
            { text: "Sofya", correct: false},
            { text: "Mısır", correct: false},
            { text: "Selanik", correct: false},
        ]
    },
    {
        question: "Atatürkün .... kahramanı olarak bilindiği yer?",
        answers: [
            { text: "Edirne", correct: false},
            { text: "Çanakkale", correct: false},
            { text: "Manastır", correct: false},
            { text: "Anafartalar", correct: true},
        ]
    },
    {
        question: "Atatürkün kurduğu cemiyetin adı?",
        answers: [
            { text: "İttihat ve terakki", correct: false},
            { text: "Cumhuri hak", correct: false},
            { text: "Vatan ve Hürriyet", correct: true},
            { text: "Cemiyet osmanlı", correct: false},
        ]
    },
    {
        question: "Atatürke kemal adını kim vermiştir?",
        answers: [
            { text: "Enver Paşa", correct: false},
            { text: "Öğretmeni", correct: true},
            { text: "Babası", correct: false},
            { text: "Annesi", correct: false},
        ]
    },
];

const questionElemnet = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElemnet.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answers.correct){
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display= "block";
}

function showScore(){
    resetState();
    questionElemnet.innerHTML = `${questions.length} soruda skorun ${score}!`;
    nextButton.innerHTML = "Tekrar Dene";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});





startQuiz();