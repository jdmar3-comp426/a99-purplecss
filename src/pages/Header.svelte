<script>
  import { getUser, logoutUser, loggedIn } from "../users";


  function logUserOut() {
    logoutUser().then((user) => false)
	}
</script>

<style>
	/* Style the header with a grey background and some padding */
.header {
  overflow: hidden;
  padding: 20px 10px;
  background-color: var(--main-bg-color);
}

/* Style the header links */
.header a {
  float: left;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-size: 1.7em;
  color: black;
  font-family: 'Times New Roman', Times, serif;
  font-weight: bold;
  padding: 30px;
}

/* Style the logo link (notice that we set the same value of line-height and font-size to prevent the header to increase when the font gets bigger */
.header a.logo {
  font-size: 100px;
  font-weight: bold;
  text-align: left;
}

/* Change the background color on mouse-over */
.header .clickable:hover {
  color: grey;
}


/* Float the link section to the right */
.header-right {
  float: right;
}

</style>


<div class="header">
  <div class="header-right">
    <a href="/app" class="clickable">play</a>
    {#if !$loggedIn}
    <a href="/app/login" class="clickable">login</a>
    <a href="/app/signup" class="clickable">signup</a>
    {:else}
    <a href="/app/profile" class="clickable">profile</a>
    <a href="/app" on:click={logUserOut}>logout</a>
    {/if}
  </div>
  <a class="logo" href="/app">
    perfect 
    <br> 
    type
  </a>
</div>
