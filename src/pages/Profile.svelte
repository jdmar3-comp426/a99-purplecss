<script>
  import { getUserData, getUser, signUserIn, loggedIn } from "../users";
  if (getUser() == null) window.location.href = '/app/login'
  let thisUser = "";
  let avgWPM = "";
  let numGames = "";
  let matchHistory = [];
  getUserData().then((data) => {
    thisUser = data.email
    avgWPM = data.avgWPM
    matchHistory = data.matchHistory
    numGames = data.numGames
  })
  console.log(thisUser)
</script>
<main>
  <h1>
    Profile
  </h1>
  
  <h2>
    Username: {thisUser}
  </h2>

  <h2>
    AVG Perfect Words Per Minute: {avgWPM}
  </h2>

  <h2>
    Number of Games Played: {numGames}
  </h2>

  <h2>
    Recent Games:
    <div>
      {#each matchHistory as match}
        <div>
          <span>{match}</span>
        </div>
      {/each}
    </div>
  </h2>
</main>