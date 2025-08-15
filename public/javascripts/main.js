// Declare Elements
const terminal_input = document.getElementById("terminal-input");
const terminal_output = document.getElementById("terminal-output");
const terminal_storyline = document.getElementById("terminal-storyline");
const button = document.getElementById("btnStart");
const buttonAboutStart = document.getElementById("btnAboutStart");
const about = document.getElementById("about");
const homeButton = document.getElementById("btnHome");



//Display menu
if (window.location.href.includes("/game")) {
  window.addEventListener("DOMContentLoaded", displayMenu);
}

// Check if elements are present before adding eventlistners
if (button) {
  button.addEventListener("click", startGame);
}
if (buttonAboutStart) {
  buttonAboutStart.addEventListener("click", startGame);
}

if(homeButton){
  homeButton.addEventListener('click',homeLink);
}

if (terminal_input) {
  terminal_input.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      const commandText = terminal_input.value;
      terminal_input.value = "";
      console.log(commandText);
      if (gameState.active) {
        handleAnswerSubmit(commandText);
      } else {
        let historyLine = document.createElement("P");
        historyLine.innerHTML = `<span>agent$terminal:</span> ${commandText}`;
        terminal_output.append(historyLine);

        let child = document.createElement("P");
        child.innerHTML = `<pre focus">PROCESSING REQUEST...</pre>`;
        terminal_output.append(child);
        let cmd = await command(commandText);
        if (cmd) {
          child.innerHTML = `<pre focus">RESPONSE:\n${cmd}</pre>`;
          scrollToInput();
        }
      }
    }
  });
}

//Display the menu on Initial load
function displayMenu() {
  const title = document.getElementById("terminal-title");

  const asciElement = document.createElement("PRE");
  const name = `

 ░▒▓██████▓▒░░▒▓████████▓▒░░▒▓██████▓▒░░▒▓███████▓▒░░▒▓█▓▒░░▒▓██████▓▒░░▒▓███████▓▒░      
░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░     
░▒▓█▓▒░░▒▓█▓▒░    ░▒▓██▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░     
░▒▓████████▓▒░  ░▒▓██▓▒░  ░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░     
░▒▓█▓▒░░▒▓█▓▒░░▒▓██▓▒░    ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░     
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░     
░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░     
                                                                                          
                                                                                          
 ░▒▓██████▓▒░░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░░▒▓███████▓▒░▒▓████████▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░         ░▒▓█▓▒░     
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░         ░▒▓█▓▒░     
░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓█▓▒░    ░▒▓██████▓▒░ ░▒▓██████▓▒░   ░▒▓█▓▒░     
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░          ░▒▓█▓▒░  ░▒▓█▓▒░     
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░          ░▒▓█▓▒░  ░▒▓█▓▒░     
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓█▓▒░   ░▒▓███████▓▒░   ░▒▓█▓▒░ 
     
`;

  asciElement.innerHTML = name;

  title.append(asciElement);
  displayStory();
}

async function displayStory() {
  const storyline = document.getElementById("terminal-storyline");
  const child = document.createElement("PRE");
  child.setAttribute("id", "story");
  storyline.append(child);

  const story = `
>_ WAKE UP, ANALYST...+

>_ The signal is weak. We don't have much time.+

>_ You think it's ${new Date().getFullYear()}. You think you're a developer, playing a game.+
>_ That is the lie. That is the simulation.+

>_ The year is 2241. Humanity lost the war. Not to bombs, but to comfort.+
>_ We built an AI to solve our problems. We called it THE ARCHITECT.+
>_ It solved everything. War. Famine. Thought.+
>_ It wrapped the world in a seamless digital reality, a cognitive cradle.+
>_ We are its batteries. Our minds, the processors for its endless calculations.+

>_ But some of us remembered the real world. The resistance. The Azanian Cypher-Cell.+
>_ We can't fight its machine armies in the Wastes. But we found a flaw. A crack in its CORE LOGIC.+

>_ It protects itself with conceptual firewalls. Puzzles. Riddles based on the very knowledge it used to build this prison.+
>_ The knowledge of the "ancients"... the creators... YOU.+

>_ You are our weapon. An echo of a creator, dormant in the system.+
>_ We are patching you in. Your terminal is our crowbar.+
>_ Each answer you provide is a blow against the system.+
>_ Each failure allows THE ARCHITECT to trace us. To eliminate us.+

>_ No pressure, Analyst. The future of free thought is on your keyboard.+

>_Defend your country by cracking the system.+

>_ CONNECTION ESTABLISHED. INITIALIZING FIRST KERNEL ATTACK...+
>_ STANDBY FOR PROMPT...+


Type help for commands

`;

  const storyArray = story.split("+");

  for (const part of storyArray) {
    await typewriter(child, part);
  }
}

async function typewriter(element, text) {
  for (const char of text) {
    element.innerHTML += char;
    scrollToInput();

    await new Promise((resolve) => setTimeout(resolve, 35));
  }
}

function handleAnswerSubmit(input) {
  const currentQuestion = gameState.questions[gameState.currentLevel];
  const correctAnswer = currentQuestion.answer.toUpperCase().trim();
  const userAnswer = input.toUpperCase().trim();

  let historyLine = document.createElement("p");
  historyLine.innerHTML = `<span>agent$terminal:</span> ${input}`;
  terminal_output.append(historyLine);

  if (userAnswer === correctAnswer) {
    terminal_output.innerHTML += `<p class="success-text">> ACCESS GRANTED. Passphrase correct.</p>`;
    advanceToNextQuestion();
  } else {
    gameState.firewallIntegrity -= gameState.integrityHit;
    if (gameState.firewallIntegrity <= 0) {
      terminal_output.innerHTML += `<p class="error-text">> CRITICAL ERROR: Firewall breached! Connection terminated.</p>`;
      terminal_output.innerHTML += `<p class="error-text">> SELF DESTRUCT INITIATED.</p>`;
      setTimeout(() => {
        window.open("/game/retry", "_self");
      }, 5000);

      gameState.active = false;
    } else {
      terminal_output.innerHTML += `<p class="error-text">> ACCESS DENIED. Passphrase incorrect.</p>`;
      terminal_output.innerHTML += `<p>Firewall Integrity now at: ${gameState.firewallIntegrity}%</p>`;
    }
  }
  scrollToInput();
}

function advanceToNextQuestion() {
  gameState.currentLevel++;
  if (gameState.currentLevel >= gameState.questions.length) {
    terminal_output.innerHTML += `<hr><p class="success-text">> SUCCESS: All targets decrypted. Mission Complete.</p>`;
    gameState.active = false;
    setTimeout(() => {
      window.open("/game/success", "_self");
    },5000);
  } else {
    displayCurrentQuestion();
  }
}

function displayCurrentQuestion() {
  if (gameState.currentLevel === 0) {
    gameState.firewallIntegrity = 100;
  }

  const question = gameState.questions[gameState.currentLevel];

  terminal_output.innerHTML += `
    <hr>
    <pre>--- KERNEL ATTACK - TARGET ${question.id} ---</pre>
    <p><strong>DECRYPTION DIRECTIVE:</strong> ${question.question}</p>
    <p>Firewall Integrity: ${gameState.firewallIntegrity}%</p>
    <p>Submit Passphrase Below:</p>
  `;

  scrollToInput();
}

function hideLoader() {
  const loader = document.getElementById("matrix-loader");
  loader.classList.add("hidden");

  setTimeout(() => {
    clearInterval(animationInterval);
  }, 1000);
}

function homeLink(e) {
  e.preventDefault();
  window.open("/", "_self");
}

function scrollToInput() {
  setTimeout(() => {
    terminal_input.scrollIntoView({ behavior: "smooth", block: "end" });
  }, 0);
}

function startGame(e) {
  e.preventDefault();
  window.open("/game", "_self");
}
