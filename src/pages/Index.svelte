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

// Register onpaste on inputs and textareas in browsers that don't
// natively support it.
(function () {
    var onload = window.onload;

    window.onload = function () {
        if (typeof onload == "function") {
            onload.apply(this, arguments);
        }

        var fields = [];
        var inputs = document.getElementsByTagName("input");
        var textareas = document.getElementsByTagName("textarea");

        for (var i = 0; i < inputs.length; i++) {
            fields.push(inputs[i]);
        }

        for (var i = 0; i < textareas.length; i++) {
            fields.push(textareas[i]);
        }

        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];

            if (typeof field.onpaste != "function" && !!field.getAttribute("onpaste")) {
                field.onpaste = eval("(function () { " + field.getAttribute("onpaste") + " })");
            }

            if (typeof field.onpaste == "function") {
                var oninput = field.oninput;

                field.oninput = function () {
                    if (typeof oninput == "function") {
                        oninput.apply(this, arguments);
                    }

                    if (typeof this.previousValue == "undefined") {
                        this.previousValue = this.value;
                    }

                    var pasted = (Math.abs(this.previousValue.length - this.value.length) > 1 && this.value != "");

                    if (pasted && !this.onpaste.apply(this, arguments)) {
                        this.value = this.previousValue;
                    }

                    this.previousValue = this.value;
                };

                if (field.addEventListener) {
                    field.addEventListener("input", field.oninput, false);
                } else if (field.attachEvent) {
                    field.attachEvent("oninput", field.oninput);
                }
            }
        }
    }
})();
</script>

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
  .typing {
    font-size: 2em;
    font-family: 'Courier New', Courier, monospace;
  }

  input { 
    margin-top: 25px;
    width: 60%;
  }
  main {
    padding: 0px;
  }
</style>

<main>
  <div class="typing">
    {#if gameOver}
      <div id="failed-message">
        <p>{gameWinResult}</p>
        <button on:click={tryAgain}>{gameResult}</button>
      </div>
    {:else}
      <div id="game-container">
        <div id="prompt" {dataBefore}>{prompt}</div>
        <input type="text" name="user-entry" placeholder="start typing here" bind:value={dataBefore} on:keyup={onType} onpaste="return false;" autocomplete="off">
      </div>
    {/if}
  </div>
</main>
