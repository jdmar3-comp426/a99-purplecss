<!-- 
  Svelte component for the profile page
 -->
<script>
  // Import the needed Firebase things
  import { getUserData, getUser, deleteThisUser } from "../users";

  // If there is no user then send the back to main page
  if (getUser() == null) {
    window.location.href = '/'
  }


  let thisUser = "";
  let avgWPM = "";
  let numGames = "";
  let matchHistory = [];
  let matchHistoryTime = [];

  // get in the user data from the API / database
  getUserData().then((data) => {
    thisUser = getUser().email
    avgWPM = data.avgWPM
    matchHistory = data.matchHistory
    numGames = data.numGames
    matchHistoryTime = data.matchHistoryTime
  })

  /**
   * Summary.
   * Delete an account
   */
  function deleteAccount() {
    const result = prompt("perfectly type 'yes' if you really want to delete: ")
    if (result == "yes") {
      deleteThisUser((getUser()));
    } 
  }

</script>

<style>
  .profile {
    font-weight: bold;
    color: #252525;
    text-decoration: underline;
  }
  .centering {
    display:inline-block;
    color: #252525;
  }
  .match-hist {
    float: left;
    padding: 20px
  }
  .list {
    font-weight: normal;
    color: #252525;
  }
</style>

<!-- Only load the page if a user is logged in -->
{#if getUser() != null}
<main>
  <h1 class = "profile">
    profile
  </h1>
  
  <h2 class = "list">
    username: {thisUser}
    
  </h2>

  <h2 class = "list">
    average perfect wpm: {avgWPM}
  </h2>

  <h2 class = "list">
    number of games: {numGames}
  </h2>

  <h2 class = "list">
    recent games:
  </h2>
  <div class="centering">
    <!-- Only show if there actualy is a match history -->
    {#if matchHistory.length != 0}
    <div class="match-hist">
      time:
      {#each matchHistoryTime as time}
        <div>
          <span>{time}</span>
        </div>
      {/each}
    </div>
    <div class="match-hist">
      wpm:
      {#each matchHistory as match} <!-- For each match in matchHistory -->
        <div>
          <span>{match}</span>
        </div>
      {/each}
    </div>
    {:else} 
      no matches found.
    {/if}
  </div>


  <div>
    <br>
    <button on:click={deleteAccount}> 
      delete account 
    </button>
  </div>

</main>

{/if}