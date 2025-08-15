/**
 * CONSTANT DATA
 */

const menu = `
=================================================================================
COMMANDS
=================================================================================
  help          List of all the command available
  start         Start Decrytping
  levels        Set game difficulty
  rounds        Set game rounds
  exit          Close the terminal
=================================================================================
USAGE
=================================================================================

HELP)
usage: help

START)
usage: start

usage: start arg1 (arg1 is the subject matter eg "html")

LEVELS)
Valid levels [1,2,3,4]
usage: levels = arg1 (where arg1 is the level)

ROUNDS)
Valid levels [1,2,3,4]
usage: levels = arg1 (where arg1 is the level)

EXIT)
usage: exit
`;

const LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "MIXED"];

/**
 * command function processes the input from the user
 */

async function command(cmd) {
  let result = `Error: Invalid command ${cmd} type 'help' for menu`;
  let parsed = parseCommand(cmd);

  switch (parsed.command) {
    case "help":
      result = menu;
      break;

    case "start":
      let topic = parsed.args[0] || "HTML, CSS, JS & PYTHON";

      let url = `${window.location.href}/load?topic=${topic}&difficulty=${gameState.difficulty}&rounds=${gameState.rounds}`;

      try {
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) {
          return `Error: Network response was not ok. Status: ${response.status}`;
        }

        const data = await response.json();
        if (data && data.length > 0) {
      
          gameState.questions = data;
          gameState.currentLevel = 0;
          gameState.active = true; 
          
          displayCurrentQuestion(); 

          result = "Initializing decryption sequence...";
        } else {
          result = "Error: Could not load valid mission data.";
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        result = "Error: Failed to connect to mission server.";
      }
      break;

    case "levels":
      if (parsed.args.length === 0) {
        result = levels();
      } else {
        const level = parseInt(parsed.args[0]);
        if (level > 0 && level <= LEVELS.length) {
          gameState.difficulty = level;
          const levelIndex = level - 1;
          result = `Difficulty set to: ${LEVELS[levelIndex]}`;
        } else {
          result = `Error: Invalid level. Please choose a number between 1 and ${LEVELS.length}.`;
        }
      }
      break;
    case "rounds":
      if(parsed.args.length===0){
        result = rounds();
      }else{
        const rounds = parseInt(parsed.args[0]);
        if(rounds > 0 && rounds <=100){
          gameState.rounds=rounds;
          result = `Rounds set to ${gameState.rounds}`;
        }else{
          result =`Error: Invalid rounds. Please choose a number between 1 and 100.`;
        }
      }
      break;

    case "exit":
      exit();
      break;
  }
  return result;
}

/**
 * Utility functions used in command processing
 */
function parseCommand(cmd) {
  const lowerCmd = cmd.toLowerCase().trim();

  if (lowerCmd.includes("=")) {
    const parts = lowerCmd.split("=");
    return {
      command: parts[0].trim(),
      args: [parts[1].trim()],
    };
  }

  const parts = lowerCmd.split(" ");
  return {
    command: parts[0],
    args: parts.slice(1),
  };
}

async function levels() {
  return `
  usage: levels = 1 
  Valid values = 1,2,3,4`;
}

async function rounds(){
  return `
  Usage: rounds = 1
  Defualt rounds = 10 
  Valid values = any number from 1 to 100`
  
}

function exit() {
  window.open("/", "_self");
}
