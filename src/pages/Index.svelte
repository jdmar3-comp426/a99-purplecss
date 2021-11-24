<script>
 import { updateUserStats } from '../users'


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
function onType() {
  if (seconds == 0) {
    seconds = new Date().getTime() / 1000;
  }
  for (let i in dataBefore) {
    if (dataBefore[i] != prompt[i]) {
      gameOver = true;
      gameResult = "Try Again"
      break;
    }
  }

  if (dataBefore == prompt) {
    console.log("HI")
    // end game GAME WIN
    gameOver = true;
    gameWin = true;
    gameResult = "Great Job! Play again."
    let timeElapsed = new Date().getTime() / 1000 - seconds;
    let words = prompt.split(" ").length;
    let wordsPerMin = words / timeElapsed * 60
    updateUserStats(wordsPerMin)
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