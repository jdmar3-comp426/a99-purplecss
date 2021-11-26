<script>
	import router from 'page';
	import Index from './pages/Index.svelte';
	import Login from './pages/Login.svelte';
	import Signup from './pages/Signup.svelte';
	import Profile from './pages/Profile.svelte';
	import Header from './pages/Header.svelte';
	import { initFirebase, getUser, getUserData, updateUserStats } from "./users.js"

	initFirebase();

	let title;
	let page;

	router('/app/', () => { page = Index; title = "Perfect Type"; });
	router('/app/login', () => { page = Login; title = "Login"; });
	router('/app/signup', () => { page = Signup; title = "Sign Up"; });
	router('/app/profile', () => { page = Profile; title = "Profile"; });

	router.start()
	
	function clicker() {
		// updateUserStats(169).then(() => null)
	}
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Header />
<svelte:component this="{page}" />
<button on:click={clicker}></button>