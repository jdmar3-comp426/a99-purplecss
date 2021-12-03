<script>
  import { getUser, logoutUser } from "../users";


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
  font-family: 'Times New Roman', Times, serif;
  font-weight: bold;
  margin: 20px;
}

.logo {
  font-weight: bold;
  text-align: left;
  font-size: 5em;
  color: #252525 !important;
  text-decoration: none !important;
}
</style>


<div class="header">
  <a class="logo" href="/">
    perfect 
    <br> 
    type
  </a>
  <div class="header-right">
    <a href="/app/play" class="clickable">play</a>
    {#if getUser() == null}
      <a href="/app/login" class="clickable">login</a>
      <a href="/app/signup" class="clickable">signup</a>
    {:else}
      <a href="/app/profile" class="clickable">profile</a>
      <a href="/app"class="clickable"  on:click={logUserOut}>logout</a>
    {/if}
  </div>
</div>
