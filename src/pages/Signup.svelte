<script>
  let thisUser = "";
  let thisPass = "";
  let confPass = "";
  function handleClick() {
    if (!validateEmail(thisUser)) {
      alert("Invalid email!")
    }
    if (confPass !== thisPass) {
      alert("Passwords do not match!")
    } 

    if (thisPass.length <= 8) {
      alert("Passwords too short!")
    } 
    let body = {thisUser, thisPass}
    // try to create an account



	}

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
</script>

<h1>Sign Up</h1>

<input type="email" name="email" placeholder="Email" bind:value={thisUser}/>
<input type="password" name="password" placeholder="Password" bind:value={thisPass}/>
<input type="password" name="password" placeholder="Confirm" bind:value={confPass}/>

<button on:click={handleClick}>Sign Up</button>