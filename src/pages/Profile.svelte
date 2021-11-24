<script>
  import { getUserData, getUser, signUserIn, loggedIn } from "../users";
  if (getUser() == null) window.location.href = '/app/login'
  let thisUser = "";
  let avgWPM = "";
  let matchHistory = [];
  getUserData().then((data) => {
    thisUser = data.email
    avgWPM = data.avgWPM
    matchHistory = data.matchHistory
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
    Average Words Per Minute: {avgWPM}
  </h2>

  <h2>
    Recent Games:
    <ul>
      {#each matchHistory as match}
        <li>
          <span>{match}</span>
        </li>
      {/each}
    </ul>
  </h2>
</main>