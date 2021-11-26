<script>
 import { updateUserStats, getUser } from '../users'


Array.prototype.random = function() {
  return this[Math.floor((Math.random()*this.length))];
}

let promptList = [
  "test. apples. are. green.",
  "I am a programmer. I am a programmer. I like food.",
  "Benny was tired. Not the normal every day tired from a hard day o work. The exhausted type of tired where you're surprised your body can even move.",
  "McDonald's is honestly underrated. And Bojangles is a scam.",
  "Early waking times for high school should be abolished. That is not healthy at all.",
  "Drinking water every day is good. However, drinking coffee every day is even better.",
  "Washing your hands after using the restroom. This is a good skill to have.",
  "Sleeping with your eyes opened is the new trend. I think. I am a little tired tbh.",
  "I like waffles. I like sausages. I also like ketchup on eggs.",
  "minecraft Is a legendary game. I. Love. Minecraft.",
  "Driving. wIth. yoUr. eyeS. closEd. IS. DANGEROUS."
];


for (let i=0;i<promptList.length;i++) {
  promptList[i] = promptList[i].replaceAll(". ", ".$");
}

let prompt = promptList.random();
const numWords = (prompt.split('.').join(' ').split(' ').join('$').split('$').filter(e => e)).length
let oPrompt = prompt.split("$")[0] + "$" + prompt;
let dataBefore = "";
let gameOver = false;
let seconds = 0;
let gameResult = "";
let gameWin = false;
let gameWinResult = "";
let messageColor = "green";
let typeZIndex = 10;
let inputBox;
let promptTop = -50;
let promptLineHeight = 50;
let lineCount = 0;
let updatedUser = false

function onType(e) {
  if (e.keyCode === 13 || e.keyCode == 32) {
      if (gameOver) {
        tryAgain();
        return;
      }
  }
  
  if (gameOver) { return; }

  if (seconds == 0) {
    seconds = new Date().getTime() / 1000;
  }

  let dollar = false;

  if (prompt[dataBefore.length] == "$") {
    prompt = prompt.substring(prompt.indexOf("$")-1).replace("$", "");
    dataBefore = dataBefore.substring(dataBefore.length-1);
    dollar = true;
    promptTop -= promptLineHeight;
    lineCount++;
  }


  if (dataBefore[dataBefore.length-1] != prompt[dataBefore.length-1]) {
    messageColor = "green";
    gameOver = true;
    gameWin = false;
    gameResult = "try again"
    gameWinResult = "u missed something lol &#128512;";
    typeZIndex = -1;
  }


  if (dataBefore == prompt) {
    // end game GAME WIN
    let timeElapsed = new Date().getTime() / 1000 - seconds;
    let wordsPerMin = numWords / timeElapsed * 60
    if (getUser() != null && seconds != null && !updatedUser) {
      updateUserStats(wordsPerMin)
      updatedUser = true;
    }
    gameOver = true;
    gameWin = true;
    messageColor = "red";
    gameWinResult = `u won !? &#128550; you typed ${wordsPerMin} words per minute.`
    gameResult = 'play again'
    typeZIndex = -1;
  }

  if (dollar) {
    prompt = prompt.substring(1);
    dataBefore = dataBefore.substring(1);
    
    let tempOprompt = "";
    for (let i=0;i<lineCount;i++) {
      tempOprompt += oPrompt.split("$")[i] + "$";
    }
    oPrompt = prompt.split("$")[0] + "$" + tempOprompt + prompt;
  } 
}

function tryAgain() {
  gameOver = false;
  gameWin = false
  gameResult = ""
  seconds = 0;
  dataBefore = "";
  prompt = promptList.random();
  oPrompt = prompt.split("$")[0] + "$" + prompt;
  typeZIndex = 10;
  inputBox.focus();
  promptTop = -50;
  lineCount = 0;
  updatedUser = false;
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
                field.onpaste = (function () { field.getAttribute("onpaste") });
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
  #occlusion {
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent, var(--main-bg-color));
    position: absolute;
    top: 0;
  }

  #prompt {
    position: relative;
    transition: top 100ms;
		top: var(--top);
		line-height: var(--line-height);
  }

  #prompt::before {
		position: absolute;
		top: calc(-1 * var(--top));
		line-height: var(--line-height);
		overflow: hidden;
		padding: 0 0;
		max-width: 100%;
	  color: #800000;
		content: attr(dataBefore);
    font-weight: bold;
    text-align: center;
	}

  #game-container {
    position: relative;
    width: 100%;
    height: 150px;
    overflow: hidden;
  }

  .typing {
    font-size: 2em;
    font-family: 'Courier New', Courier, monospace;
    width: 100%;
    height: 100%;
  }

  input { 
    margin-top: 25px;
    width: 60%;
    opacity: 0;
    position: absolute;
    width: 90%;
    height: 90%;
    top: 5%;
    left: 0;
    cursor: default;
  }

</style>

<main>
  <div class="typing">
    {#if gameOver}
      <div id="message" on:keyup={tryAgain}>
        <p id="result" style="color:{messageColor}">{@html gameWinResult}</p>
        <button on:click={tryAgain}>{gameResult}</button>
      </div>
    {:else}
      <div id="game-container">
        <div id="prompt" class="noselect" style="--line-height:{promptLineHeight}px;--top:{promptTop}px;" {dataBefore}>{@html oPrompt.replaceAll("$", "<br>")}</div>
        <div id="occlusion"></div>
      </div>
    {/if}
  </div>
</main>

<input bind:this="{inputBox}" style="z-index: {typeZIndex};" type="text" name="user-entry" placeholder="start typing here" bind:value={dataBefore} on:keyup={onType} autofocus onpaste="return false;" autocomplete="off">