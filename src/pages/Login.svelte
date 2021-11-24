<script>
  let thisUser = "";
  let thisPass = "";
  function handleClick() {
    let body = {thisUser, thisPass}
    // Check if this is a valid user

	}
</script>


<main>
  <h1>Login</h1>


  <input type="email" name="email" placeholder="Email" bind:value={thisUser}/>
  <input type="password" name="password" placeholder="Password" bind:value={thisPass}/>
  
  <button on:click={handleClick}>Login</button>

</main>