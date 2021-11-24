<script>
  import { createUser, signUserIn, logoutUser, getUser } from "../users.js";
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
    // try to create an account


    createUser(thisUser, thisPass).then((user) => {
      fetch(`http://localhost:3000/api/post/users/${user.uid}`, {
        method: 'GET',
        email: thisUser,
		  }).then((res) => console.log(res))
      // .then((res1) => {
      //   res1.json.then((res2) => {
      //     res2
      //   })
      // })
    });

	}

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


</script>

<main>
  <h1>Sign Up</h1>

  <input type="email" name="email" placeholder="Email" bind:value={thisUser}/>
  <input type="password" name="password" placeholder="Password" bind:value={thisPass}/>
  <input type="password" name="password" placeholder="Confirm" bind:value={confPass}/>

  <button on:click={handleClick}>Sign Up</button>
</main>