<!-- 
  Svelte componet for the Login page
 -->
<script>
  // Import things for the Firebase authentication and the textboxes/redirect
  import { signUserIn, getUser } from "../users";
  import { inputType, exitToMain } from "../common";


  // If user is already logged in then send them to home page
  if (getUser() != null) {
    window.location.href = '/'
  }

  let thisUser, thisPass = "";
  let successLog = false;

  /**
   * Summary.
   * Handles clicks for the login button
   */
  function handleClick() {
    // Sign the user in
    signUserIn(thisUser, thisPass).then((user) => {
      if (user != null) { // If the login worked
        successLog = true;
        exitToMain();
      }
    });
	}
  
</script>

<!-- Only show the page if the user isnt logged in -->
{#if getUser() == null}
<main>
  <h1>login</h1>
  
  <!-- If user is logged in then show this otherwise show the login things -->
  {#if successLog}
    <p>logged in! redirecting to main...</p>
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
{/if}