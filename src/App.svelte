<script>
import router from 'page';
import Index from './pages/Index.svelte';
import Login from './pages/Login.svelte';
import Signup from './pages/Signup.svelte';
import Profile from './pages/Profile.svelte';
import { initFirebase } from "./users.js"

initFirebase();

let title;
let page;

router('/app/', () => { page = Index; title = ""; });
router('/app/login', () => { page = Login; title = "Login"; });
router('/app/signup', () => { page = Signup; title = "Sign Up"; });
router('/app/profile', () => { page = Profile; title = "Profile"; });

router.start()

</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>


<svelte:component this="{page}" />