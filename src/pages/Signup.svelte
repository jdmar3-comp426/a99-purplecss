<!-- 
  Svelte component to display / handle the sign up page
 -->

<script>
  // import required methods for Firebase authentication and textboxes / delayed redirect
  import { createUser, getUser } from "../users";
  import { inputType, exitToMain } from "../common";

  // If the user is already signed in, then send them back to main page
  if (getUser() != null) {
    window.location.href = '/'
  }
  

  // Linked to svelte html
  let thisUser, thisPass, confPass = "";
  let successLog = false;

  const defaultDataInitialization = {
    'email': thisUser,
    'numGames': 0,
    'avgWPM': 0,
    'matchHistory': [],
    'matchHistoryTime': [],
  }

  /**
   * Summary.
   * handles the event of clicking the signup button
   */
  function handleClick() {
    // If invalid email tell them
    if (!validateEmail(thisUser)) {
      alert("Invalid email!")
      return
    }

    // The confirmation password does not the original password
    if (confPass !== thisPass) {
      alert("Passwords do not match!")
      return
    } 

    // The password is less the 9 characters
    if (thisPass.length <= 8) {
      alert("Passwords too short!")
      return
    }

    let method = "post";
    let endpoint = `http://localhost:3000/app/${method}/users/${user.uid}`;

    // Create the user in the Firebase authentication system and then also send data to API so can create the user entry in the database
    createUser(thisUser, thisPass).then((user) => {
      fetch(endpoint, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          {
            'data': defaultDataInitialization,
          }),
      }).then(() => {
        if (user != null) {
          successLog = true;
          exitToMain()
        }
      })
    }); 
	}

  /**
   * Summary.
   * Validates an email based on a regex
   * 
   * @param {string} email    An email address to be validated
   */
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
</script>

<!-- Only load the HTML if a user is not signed in -->
{#if getUser() == null}
<main>
  <h1>sign up</h1>

  <!-- If the user was able to sucessfully signup show this part, else show the signup stuff -->
  {#if successLog}
    <p>
      signed up and logged in! redirecting to main...
    </p>
  {:else}
    <div class="input-container">
      <label for="email">email</label>
      <input id="email" type="email" name="email" bind:value={thisUser} on:input="{(e) => inputType(e, handleClick)}"/>
    </div>
    <br>
    <br>  
    <div id="form-container">
      <div class="input-container">
        <label for="password">password</label>
        <input id="password" type="password" name="password" bind:value={thisPass} on:input="{(e) => inputType(e, handleClick)}"/>
      </div>
      <div class="input-container">
        <label for="con-password">confirm password</label>
        <input id="con-password" type="password" name="con-password" bind:value={confPass} on:input="{(e) => inputType(e, handleClick)}"/>
      </div>
    </div>
    <br>
    <br>
    <button on:click={handleClick}>sign up</button>
  {/if}

</main>
{/if}