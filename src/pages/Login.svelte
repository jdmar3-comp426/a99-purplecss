<script>
  import { signUserIn, loggedIn } from "../users";
  import { inputType } from "../common";

  if ($loggedIn) {
    window.location.href = '/app/'
  }
  let thisUser = "";
  let thisPass = "";
  let successLog = false;
  function handleClick() {
    signUserIn(thisUser, thisPass).then((user) => { if (user != null) successLog = true})
	}
  
</script>

<main>
  <h1>login</h1>
  
  {#if successLog}
    <p>logged in!</p>
  {:else}
    <div id="form-container">
      <div class="input-container">
        <label for="email">email</label>
        <input id="email" type="email" name="email" bind:value={thisUser} on:input="{(e) => inputType(e, handleClick)}"/>
      </div>
      <div class="input-container">
        <label for="password">password</label>
        <input id="password" type="password" name="password" bind:value={thisPass} on:input="{(e) => inputType(e, handleClick)}"/>
      </div>
    </div>
    <br>
    <br>
    <button on:click={handleClick}>log in</button>
  {/if}

</main>