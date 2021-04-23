
import { QaA } from '/Questions.js';

const MainPage = document.querySelector('.welcome-page');
const StartBtn = document.querySelector('.startbtn');
const Quiz = document.querySelector('.Quiz-Page');

let QuestionNumber = 0; //first Question

//<--Setting the timer-->
const time = document.getElementById('value');
let counting = setInterval(countDown,1000);

let value = 18;

time.textContent = value;
function countDown() {
    function normal(item) {
        if(value < 10) {
            return item = `0${item}`;
        }else {
            return item;
        }
    }

    value--;
    time.textContent = normal(value);

    if(value === 0) { 
        // <--skip the Question in the end of the counter-->
        QuestionNumber++;
        showQ();
        ShowChoices(QaA[QuestionNumber]);
        //<------------------------------------------------>

        repeatCounter(); //when the counter end it starts over!
    }

    if(value === 1) {
        var audio = new Audio('sounds-effects/ding.mp3');
        audio.play();
    }
}countDown(counting);
// <-------------------->

function repeatCounter() {
    return value = 16;
}

StartBtn.addEventListener('click',function() {
    MainPage.classList.add('hide-page');
    Quiz.classList.add('show-page');
})

const AnswerBtn = document.querySelectorAll('.AnswerBtn');

// <--Show the Questions-->
function showQ() {
    let question = QaA[QuestionNumber].get("question");
    const Content = document.querySelector('.question');
    Content.innerHTML = question;
}showQ();
// <---------------------->

//<-- Show the choices -->
function ShowChoices(map) {
    for (const [key,value] of map) {
        if(Number(key)) {
            AnswerBtn[key-1].innerHTML = value;
        }
    }
}ShowChoices(QaA[QuestionNumber]);
//<----------------------->

let points = 0;

// <--Controling the choices buttons-->
AnswerBtn.forEach((item) => {
    item.addEventListener('click',verification);
    function verification() { 
        if(QaA[QuestionNumber].get("correct") === +item.value) {
            item.style.backgroundColor = "rgb(24, 200, 24)";
            points += 5;
            rate();
        }else {
            item.style.backgroundColor = "rgb(238, 93, 93)";
            points += 0;
        }
    };
});
//<----------------------------------->

const submitBtn = document.querySelector('.submit');

//<--DOM traveling (change content)-->
const nextBtn = document.querySelector('.next-Q');
let clickCounter = 0;
nextBtn.addEventListener('click',() => {
    QuestionNumber++;
    showQ();
    ShowChoices(QaA[QuestionNumber]);

    AnswerBtn.forEach((btn) => {
        btn.style.backgroundColor = "white";
    });

    clickCounter++;

    if(clickCounter === 4 || clickCounter === 3) {
        submitBtn.style.opacity = "1";
        clearInterval(counting);
    }

    repeatCounter();//repeat the counter
});
// <--------------------------------->

submitBtn.addEventListener('click',() => {
    Points();
    rate();
})

//<--Show the results-->
submitBtn.addEventListener('click',function() {
    const result = document.querySelector('.result-page');

    Quiz.classList.add('hide-page');
    result.style.opacity = "1";
});
//<-------------------->

const mark = document.getElementById('percentage');

function rate() {
        if(points === 20) {
            mark.innerHTML = 100 + `% ` + `Excellent!!`;
        }else if(points === 15) {
            mark.innerHTML = 75 + `% ` + `Great!`;
        }else if(points === 10) {
            mark.innerHTML = 50 + `% ` + `Well Done!`;
        }else if(points === 5) {
            mark.innerHTML = 25 + `% ` + `Not Bad!`;
        }else 
            mark.innerHTML = 0 + `% ` + `Try Again!`;
}