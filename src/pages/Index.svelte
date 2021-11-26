<script>
 import { updateUserStats, getUser } from '../users'


Array.prototype.random = function() {
  return this[Math.floor((Math.random()*this.length))];
}

let promptList = [
  "I like purple bananas.",
  "David is a monkey.",
  "The big purple fox ate the small orange mouse."
];

let prompt = promptList.random();
let dataBefore;
let gameOver = false;
let seconds = 0;
let gameResult = "Try Again."
let gameWin = false;
let gameWinResult = ""
let  wordsPerMin;
function onType() {
  if (seconds == 0) {
    seconds = new Date().getTime() / 1000;
  }
  for (let i in dataBefore) {
    if (dataBefore[i] != prompt[i]) {
      gameOver = true;
      gameResult = "Try Again"
      gameWinResult = ""
      break;
    }
  }

  if (dataBefore == prompt) {
    // end game GAME WIN
    let timeElapsed = new Date().getTime() / 1000 - seconds;
    let words = prompt.split(" ").length;
    wordsPerMin = words / timeElapsed * 60
    gameOver = true;
    gameWin = true;
    gameWinResult = `Great Job! You typed ${wordsPerMin} words per minute.`
    gameResult = 'Play again.'
    
    if (getUser() != null) updateUserStats(wordsPerMin)
  }
  
}

function tryAgain() {
  gameOver = false;
  gameWin = false
  gameResult = ""
  seconds = 0;
  dataBefore = "";
  prompt = promptList.random();
}
</script>

<main>
  {#if gameOver}
    <div id="failed-message">
      <p>{gameWinResult}</p>
      <button on:click={tryAgain}>{gameResult}</button>
    </div>
  {:else}
    <div id="game-container">
      <div id="prompt" {dataBefore}>{prompt}</div>
      <input type="text" name="user-entry" placeholder="Start typing here" bind:value={dataBefore} on:keyup={onType} />
    </div>
  {/if}

</main>

<style>
  #prompt::before {
		position: absolute;
		top: 0;
		left: 0;
		overflow: hidden;
		padding: 0 0;
		max-width: 100%;
	  color: green;
		content: attr(dataBefore);
	}

  #game-container {
    position: relative;
  }
</style>