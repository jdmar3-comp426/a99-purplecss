<script>
  import { getUserData, getUser } from "../users";

  
  if (getUser() == null) {
    window.location.href = '/'
  }


  let thisUser = "";
  let avgWPM = "";
  let numGames = "";
  let matchHistory = [];
  let matchHistoryTime = []
  getUserData().then((data) => {
    thisUser = getUser().email
    avgWPM = data.avgWPM
    matchHistory = data.matchHistory
    numGames = data.numGames
    matchHistoryTime = data.matchHistoryTime
  })
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
      {#each matchHistory as match}
        <div>
          <span>{match}</span>
        </div>
      {/each}
    </div>
    {:else} 
      no matches found.
    {/if}
  </div>

</main>

{/if}