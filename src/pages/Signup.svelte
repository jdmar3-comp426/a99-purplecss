<script>
  import { createUser, getUser, loggedIn } from "../users.js";
  
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
  <h1>Sign Up</h1>

  {#if successLog}
    <p>Signed Up and Logged In!</p>

  {:else}
    <input type="email" name="email" placeholder="Email" bind:value={thisUser}/>
    <input type="password" name="password" placeholder="Password" bind:value={thisPass}/>
    <input type="password" name="password" placeholder="Confirm" bind:value={confPass}/>
    <button on:click={handleClick}>Sign Up</button>
  {/if}

</main>