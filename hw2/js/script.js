document.querySelector("button").addEventListener("click", gradeQuiz);

displayQ4Choices();
displayQ8Choices();

let attempts = localStorage.getItem("total_attempts");

if (attempts === null) {
  attempts = 0;
} else {
  attempts = Number(attempts);
}

let score = 0;

function setMarkImage(index, imageName, altText) {
  let markContainer = document.querySelector(`#markImg${index}`);
  markContainer.textContent = "";

  let img = document.createElement("img");
  img.src = `img/${imageName}`;
  img.alt = altText;
  img.style.width = "30px";
  img.style.height = "30px";
  markContainer.appendChild(img);
}

function rightAnswer(index) {
  let feedback = document.querySelector(`#q${index}Feedback`);
  feedback.textContent = "Correct!";
  feedback.className = "bg-success text-white";
  setMarkImage(index, "checkmark.png", "Checkmark");
  score += 10;
}

function wrongAnswer(index) {
  let feedback = document.querySelector(`#q${index}Feedback`);
  feedback.textContent = "Incorrect!";
  feedback.className = "bg-warning text-white";
  setMarkImage(index, "xmark.png", "X mark");
}

function isFormValid() {
  let isValid = true;
  let q1Response = document.querySelector("#q1").value;
    let q2Response = document.querySelector("#q2").value;
  let q3Selected = document.querySelector(
    "#Superior:checked, #Victoria:checked, #Tahoe:checked, #Erie:checked"
  );
  let q4Selected = document.querySelector("input[name=q4]:checked");
  let q5Response = document.querySelector("#q5").value;
  let q6Response = document.querySelector("#q6").value;
  let q7Selected = document.querySelector(
    "#California:checked, #Nevada:checked, #Oregon:checked, #Washington:checked"
  );
  let q8Selected = document.querySelector("input[name=q8]:checked");
  let q9Response = document.querySelector("#q9").value;
  let q10Response = document.querySelector("#q10").value;

  let validationFdbk = document.querySelector("#validationFdbk");

  if (q1Response === "" || q2Response === "" || q3Selected === null || q4Selected === null || q5Response === "" ||
    q6Response === "" || q7Selected === null || q8Selected === null || q9Response === "" || q10Response === ""
  ) {
    isValid = false;
    validationFdbk.textContent = "Please answer all questions.";
  }

  return isValid;
}

function gradeQuiz() {
  document.querySelector("#validationFdbk").textContent = "";

  if (!isFormValid()) {
    return;
  }

  score = 0;

  let q1Response = document.querySelector("#q1").value.toLowerCase();
  let q2Response = document.querySelector("#q2").value;
  let q5Response = document.querySelector("#q5").value.toLowerCase();
  let q6Response = document.querySelector("#q6").value;
  let q9Response = document.querySelector("#q9").value.toLowerCase();
  let q10Response = document.querySelector("#q10").value;

  // Response questions
  // Q1 + Q5 + Q9
  if (q1Response === "austin") {
    rightAnswer(1);
  } else {
    wrongAnswer(1);
  }

  if (q5Response === "florida") {
    rightAnswer(5);
  } else {
    wrongAnswer(5);
  }

  if (q9Response === "wisconsin") {
    rightAnswer(9);
  } else {
    wrongAnswer(9);
  }

  // Multiple Choice questions
  // Q2 + Q6 + Q10
  if (q2Response === "ak") {
    rightAnswer(2);
  } else {
    wrongAnswer(2);
  }

  if (q6Response === "wy") {
    rightAnswer(6);
  } else {
    wrongAnswer(6);
  }

  if (q10Response === "nj") {
    rightAnswer(10);
  } else {
    wrongAnswer(10);
  }

  // Check multiple questions
  // Q3 + Q7
  if (document.querySelector("#Superior").checked &&
    !document.querySelector("#Victoria").checked &&
    document.querySelector("#Tahoe").checked &&
    document.querySelector("#Erie").checked) {
  rightAnswer(3);
} else {
    wrongAnswer(3);
}

console.log("California:", document.querySelector("#California").checked);
console.log("Nevada:", document.querySelector("#Nevada").checked);
console.log("Oregon:", document.querySelector("#Oregon").checked);
console.log("Washington:", document.querySelector("#Washington").checked);

  if (document.querySelector("#California").checked &&
    !document.querySelector("#Nevada").checked &&
    document.querySelector("#Oregon").checked &&
    document.querySelector("#Washington").checked) {
      rightAnswer(7);
    } else {
      wrongAnswer(7);
    }

  // Radio questions
  // Q4 + Q8
    let selectedQ4 = document.querySelector("input[name=q4]:checked");

    if (selectedQ4 !== null && selectedQ4.value === "Alaska") {
    rightAnswer(4);
    } else {
    wrongAnswer(4);
    }

    let selectedQ8 = document.querySelector("input[name=q8]:checked");

    if (selectedQ8 !== null && selectedQ8.value === "Denali") {
      rightAnswer(8);
    } else {
      wrongAnswer(8);
    }
 
  document.querySelector("#totalScore").textContent = `Total Score: ${score}`;
  if (score > 80) {
    document.querySelector("#congratulation").textContent =
    "Great job!";
  } else {
    document.querySelector("#congratulation").textContent = "";
  }

  attempts++;
document.querySelector("#totalAttempts").textContent = `Total Attempts: ${attempts}`;
localStorage.setItem("total_attempts", attempts);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function displayQ4Choices() {
  let q4ChoicesArray = ["Alaska", "Hawaii", "California", "Washington"];
  shuffleArray(q4ChoicesArray);

  let choicesContainer = document.querySelector("#q4Choices");
  choicesContainer.textContent = "";

  for (let choice of q4ChoicesArray) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "q4";
    input.id = "q4" + choice;
    input.value = choice;
    input.className = "form-check-input";

    let label = document.createElement("label");
    label.htmlFor = "q4" + choice;
    label.textContent = choice;

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);
    choicesContainer.appendChild(document.createTextNode(" "));
  }

}

function displayQ8Choices() {
  let q8ChoicesArray = ["Mount Whitney", "Denali", "Mount Rainier", "Mount Elbert"];
  shuffleArray(q8ChoicesArray);

  let choicesContainer = document.querySelector("#q8Choices");
  choicesContainer.textContent = "";

  for (let choice of q8ChoicesArray) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "q8";
    input.id = choice;
    input.value = choice;
    input.className = "form-check-input";

    let label = document.createElement("label");
    label.htmlFor = choice;
    label.textContent = choice;

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);
    choicesContainer.appendChild(document.createTextNode(" "));
  }
}
