<script>
import router from 'page';
import Index from './pages/Index.svelte';
import Login from './pages/Login.svelte';
import Signup from './pages/Signup.svelte';
import Profile from './pages/Profile.svelte';

let title;
let page;

router('/', () => { page = Index; title = ""; });

router.start()

</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<svelte:component this="{page}" />