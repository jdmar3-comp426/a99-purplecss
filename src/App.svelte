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

<style>
	:global(:root) {
		--main-bg-color: #F4F1E2;
	}

	:global(main) {
		overflow:scroll;
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
		width: 100%;
		text-align: center;
		overflow: hidden;
		max-width: 2000px;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
	}

	:global(body) {
		font-family: 'Times New Roman', Times, serif;
		padding: 0px;
		background-color: var(--main-bg-color);
	}

	:global(input) {
		width: 250px;
		background: transparent;
		border: none;
		border-bottom: solid black 2px;
		outline: none;
	}

	:global(.noselect) {
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Safari */
		-khtml-user-select: none; /* Konqueror HTML */
		-moz-user-select: none; /* Old versions of Firefox */
		-ms-user-select: none; /* Internet Explorer/Edge */
		user-select: none; /* Non-prefixed version, currently
									supported by Chrome, Edge, Opera and Firefox */
	}

</style>

<svelte:head>
	<title>{title}</title>
	<meta charset="utf-8">
</svelte:head>

<Header />
<svelte:component this="{page}" />