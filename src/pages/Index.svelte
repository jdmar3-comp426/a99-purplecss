<script>
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

function onType() {
  for (let i in dataBefore) {
    if (dataBefore[i] != prompt[i]) {
      gameOver = true;
      dataBefore = "";
      prompt = promptList.random();
      break;
    }
  }
}

function tryAgain() {
  gameOver = false;
}
</script>

<main>
  {#if gameOver}
    <div id="failed-message">
      <button on:click={tryAgain}>Try again</button>
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
		padding: 8px 8px;
		max-width: 100%;
	  color: green;
		content: attr(dataBefore);
	}
</style>