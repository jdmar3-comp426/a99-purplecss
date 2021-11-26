<script>
  import { getUser, logoutUser, loggedIn } from "../users";


  function logUserOut() {
    logoutUser().then((user) => false)
	}
</script>

<style>
.header {
  --padding: 50px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  padding: 0 var(--padding);
  position: absolute;
  width: calc(100% - (var(--padding) * 2));
  z-index: 200;
}

.clickable {
  float: left;
  text-align: center;
  text-decoration: none;
  font-size: 1.7em;
  color: black;
  font-family: 'Times New Roman', Times, serif;
  font-weight: bold;
  margin: 20px;
}

.logo {
  font-weight: bold;
  text-align: left;
  font-size: 7em;
  color: black !important;
  text-decoration: none !important;
}

.logo:hover {

  text-decoration: none !important;
}

.clickable:hover {
  color: grey;
  transition: color 100ms;
}

</style>


<div class="header">
  <a class="logo" href="/app">
    perfect 
    <br> 
    type
  </a>
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
</div>
