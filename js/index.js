// quizArray QUESTIONS & ANSWERS
// q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
// Basic ideas from https://code-boxx.com/simple-javascript-quiz/
var quizArray = [
  {
    q: "Which is the third planet from the sun?",
    o: ["Saturn", "Earth", "Pluto", "Mars"],
    a: 1,
  },
  {
    q: "Which is the largest ocean on Earth?",
    o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    a: 3,
  },
  {
    q: "What is the capital of Australia",
    o: ["Sydney", "Canberra", "Melbourne", "Perth"],
    a: 1,
  },
];

// function to Display the quiz questions and answers from the object
const displayQuiz = () => {
  quizWrap = document.querySelector("#quizWrap");
  let quizDisplay = "";
  const myArray = quizArray.map((quizItem, index) => {
    quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
    quizWrap.innerHTML = quizDisplay;
  });
};

displayQuiz();

// Calculate the score
let finalScore = 0;
const rArray = quizArray.map((quizItem, index) => {
  for (let i = 0; i < 4; i++) {
    let r = `radio_${index}_${i}`;
    radioElement = document.querySelector("#" + r);

    // add event listener to the radio button click
    radioElement.addEventListener("click", function (e) {
      // add code to calculate the score
      if (quizItem.a == i) {
        // if the answer is correct, increment the score
        finalScore = finalScore + 1;
      }
    });
  }
});

btnSubmit = document.querySelector("#btnSubmit");
btnReset = document.querySelector("#btnReset");
score = document.querySelector("#score");
display = document.querySelector("#time");

// add EventListener to display the score on the click of submit, highlight the correct answers
btnSubmit.addEventListener("click", displayScore);
function displayScore() {
  score.innerHTML = `Your final score is ${finalScore}`;
  btnSubmit.style.display = "none";

  const rArray = quizArray.map((quizItem, index) => {
    for (let i = 0; i < 4; i++) {
      let li = `li_${index}_${i}`;
      liElement = document.querySelector("#" + li);
      if (quizItem.a == i) {
        // if the answer is correct, highlight the div
        liElement.style.backgroundColor = "#C5F5CF";
        display.textContent = "Your time is up";
      }
    }
  });
}

// reset the page with the reset button is clicked
btnReset.addEventListener("click", function (e) {
  location.reload();
});

// countdown timer
function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;
    // if the timer ends, display the score and reveal the answers
    if (display.textContent == "00:00") {
      displayScore();
      return;
    }
    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

window.onload = function () {
  var fiveMinutes = 60 * 1; // timer is set to countdown from one minute
  //display = document.querySelector("#time");
  startTimer(fiveMinutes, display);
};
