const container = document.querySelector(".container-11");
container.addEventListener("click", (e) => {
  e.target.style.color = "blue";
  console.log(e.target);
});
const testParagraph = [
  // `"The quick brown fox jumps over the lazy dog.`,
  `This sentence is a pangram, which means it contains all the letters of the alphabet.`,
  // `Typing pangrams can be a great way to improve your typing skills as they require you to quickly and accurately type each letter`,
  // `Practice makes perfect, so keep typing and aim for both speed and accuracy. Happy typing!"`,
];
const userTestInput = document.querySelector("#user-test-input");
const testParagraphEl = document.querySelector("[data-test-paragraph]");

let currLine = 0,
  activeLetter = 0;
topParagraph();
//logic for typing
userTestInput.addEventListener("keydown", (e) => {
  let lastChild = testParagraph[currLine].length;
  activeLetter += e.key == testParagraph[currLine][activeLetter] ? 1 : 0;

  // console.log(e.key == testParagraph[currLine][activeLetter]);
  // console.log(testParagraph);
  if (lastChild == activeLetter) {
    currLine += 1;
    activeLetter = 0;
    if (currLine + 1 > testParagraph.length) {
        if (confirm("You finished the test. Would you like to try again?")) {
            // If the user clicks "OK" in the confirmation dialog
            alert("Test reset.");
             window.location.reload();
        } else {

            // If the user clicks "Cancel" in the confirmation dialog
            alert("Thanks for taking the test!");
            window.location.href = "https://github.com/your-username";
        }
        
    }
  }

  console.log(activeLetter);
});

userTestInput.addEventListener("keyup", (e) => {
  //render
  //input
  if (userTestInput.value.length !== activeLetter) {
    console.log(userTestInput.value.length);
    userTestInput.value =
      [...testParagraph].splice(0, currLine) +
      testParagraph[currLine].split("").splice(0, activeLetter).join("");
  }
  // top parag
  topParagraph();
});

function topParagraph() {
  testParagraphEl.innerHTML = testParagraph.map((parag, i1) => {
    return parag
      .split("")
      .map((letter, i2) => {
        if (i2 === activeLetter && i1 == currLine) {
          return `<span class="active-letter">${letter}</span>`;
        } else {
          return letter;
        }
      })
      .join("");
  }).join`<br>`;
}