<script>
  import { getUserData, getUser, signUserIn, loggedIn } from "../users";
  if (getUser() == null) window.location.href = '/app/login'
  let thisUser = "";
  let avgWPM = "";
  let numGames = "";
  let matchHistory = [];
  let matchHistoryTime = []
  getUserData().then((data) => {
    thisUser = data.email
    avgWPM = data.avgWPM
    matchHistory = data.matchHistory
    numGames = data.numGames
    matchHistoryTime = data.matchHistoryTime
  })
</script>

<style>
  .centering {
    display:inline-block;
    font-weight: bold;
  }
  .match-hist {
    float: left;
    padding: 20px
    
  }
</style>
<main>
  <h1>
    profile
  </h1>
  
  <h2>
    username: {thisUser}
  </h2>

  <h2>
    average perfect wpm: {avgWPM}
  </h2>

  <h2>
    number of games: {numGames}
  </h2>

  

  <h2>
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