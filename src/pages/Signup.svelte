<script>
  import { createUser, loggedIn } from "../users";
  import { inputType } from "../common";
  
  if ($loggedIn) {
    window.location.href = '/app/'
  }

  let thisUser = "";
  let thisPass = "";
  let confPass = "";
  let successLog = false;
  function handleClick() {

    if (!validateEmail(thisUser)) {
      alert("Invalid email!")
      return
    }
    if (confPass !== thisPass) {
      alert("Passwords do not match!")
      return
    } 

    if (thisPass.length <= 8) {
      alert("Passwords too short!")
      return
    } 

    createUser(thisUser, thisPass).then((user) => {
      fetch(`http://localhost:3000/api/post/users/${user.uid}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          {
            'data': 
            {
              'email': thisUser,
              'numGames': 0,
              'avgWPM': 0,
              'matchHistory': [],
              'matchHistoryTime': [],
            }
          }),
      }).then((res) => {if (user != null) successLog = true})
    });
    
    
	}

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
</script>

<main>
  <h1>sign up</h1>

  {#if successLog}
    <p>signed up and logged in!</p>
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