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
  <h1>login</h1>

  {#if successLog}
    <p>logged in!</p>
  {:else}
    <input type="email" name="email" placeholder="email" bind:value={thisUser}/>
    <input type="password" name="password" placeholder="password" bind:value={thisPass}/>
    <button on:click={handleClick}>log in</button>
  {/if}

</main>