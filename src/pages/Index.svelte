<script>
 import { updateUserStats, getUser } from '../users'


Array.prototype.random = function() {
  return this[Math.floor((Math.random()*this.length))];
}

let promptList = [
  "test. apples. are. green.",
  //"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin risus nisl, tempor non mi a, convallis porta eros. Quisque at ligula ac dui aliquam vulputate eget in nunc. Ut felis orci, pretium sed metus in, molestie gravida mi. Praesent nec lacinia metus. In hac habitasse platea dictumst. Duis mollis lacinia eros, vel feugiat magna mattis sit amet. Sed aliquet massa ac libero dictum imperdiet. Nam eleifend, massa eu dictum sodales, sem diam lobortis nulla, ut dapibus massa quam in arcu. In pulvinar metus vel nibh luctus, quis convallis massa posuere. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam pellentesque purus est, eget hendrerit nisl elementum sed. Aenean ullamcorper finibus commodo. Nunc fermentum sed urna sit amet dapibus. "
  // "I like purple$bananas.",
  // "David is a$monkey.",
  // "The big purple fox ate the small$orange mouse.",
  // "Kappa Theta Pi stands for the love for technology",
  // "Hey diddle diddle, The cat and the fiddle, The cow jumped over the moon. The little dog laughed to see such sport, And the dish ran away with the spoon.",
  // "Hickory Dickory Dock. The mouse ran up the clock. The clock struck one. The mouse ran down. Hickory Dickory Dock",
  // "I’m a little teapot, short and stout. Here is my handle, here is my spout.",
  // "Mary had a little lamb, Little lamb, little lamb. Mary had a little lamb, Its fleece was white as snow.",
  // "Ring around the rosie, a pocket full of posies, atishoo, atishoo, we all fall down!",
  // "Rock a bye baby, on the tree top, When the wind blows the cradle will rock, When the bough breaks the cradle will fall, And down will come baby, cradle and all.",
  // "Row, row, row your boat gently down the stream, merrily, merrily, merrily, merrily, life is but a dream",
  // "Somebody once told me the world is gonna roll me, I ain't the sharpest tool in the shed. She was looking kind of dumb with her finger and her thumb, in the shape of an L on her forehead"
];

for (let i=0;i<promptList.length;i++) {
  promptList[i] = promptList[i].replaceAll(". ", ".$");
}

let prompt = promptList.random();
let oPrompt = prompt.split("$")[0] + "$" + prompt;
let dataBefore = "";
let gameOver = false;
let seconds = 0;
let gameResult = "";
let gameWin = false;
let gameWinResult = "";
let wordsPerMin;
let messageColor = "green";
let typeZIndex = 10;
let inputBox;
let promptTop = -50;
let promptLineHeight = 50;
let lineCount = 0;

function onType(e) {
  if (e.keyCode === 13) {
      if (gameOver) {
        tryAgain();
      }
  }

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

  for (let i in dataBefore) {
    if (dataBefore[i] != prompt[i]) {
      messageColor = "green";
      gameOver = true;
      gameWin = false;
      gameResult = "try again"
      gameWinResult = "u missed something &#128512;";
      typeZIndex = -1;
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
    messageColor = "red";
    gameWinResult = `great job &#128550; you typed ${wordsPerMin} words per minute.`
    gameResult = 'play again'
    typeZIndex = -1;
    if (getUser() != null) updateUserStats(wordsPerMin)
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
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    cursor: default;
  }

  main {
    padding: 0px;
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