<script>
  import { getUser,  signUserIn, loggedIn } from "../users";
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
  <h1>Login</h1>

  {#if successLog}
    <p>Logged In!</p>
  {:else}
    <input type="email" name="email" placeholder="Email" bind:value={thisUser}/>
    <input type="password" name="password" placeholder="Password" bind:value={thisPass}/>
    <button on:click={handleClick}>Log in</button>
  {/if}

</main>