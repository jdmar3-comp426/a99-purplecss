<script>
	import router from 'page';
	import Index from './pages/Index.svelte';
	import Login from './pages/Login.svelte';
	import Signup from './pages/Signup.svelte';
	import Profile from './pages/Profile.svelte';
	import Header from './pages/Header.svelte';
	import { initFirebase } from "./users"

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
		max-width: 2000px;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
		overflow: hidden;
	}

	:global(body) {
		font-family: 'Times New Roman', Times, serif;
		padding: 0px;
		background-color: var(--main-bg-color);
		overflow: hidden;
	}

	:global(#form-container) {
		display: flex;
		justify-content: space-between;
		width: 100%;
		max-width: 650px;
		margin: auto;
	}

	:global(.input-container) {
		position: relative;
	}

	:global(input) {
		width: 300px;
		background: transparent;
		border: none;
		border-bottom: solid black 2px;
		outline: none;
		font-size: 1.5em;
		text-align: center;
	}

	:global(label) {
		color: gray;
		font-size: 1.5em;
		text-align: center;
		position: absolute;
		top: 10px;
		width: 100%;
		text-align: center;
		transition: font-size 100ms, top 100ms;
	}

	:global(.noselect) {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	:global(button) {
		background-color: transparent;
		border: 2px solid #472100;
		display: inline-block;
		cursor: pointer;
		color: gray;
		font-size: 1.2em;
		padding: 16px 32px;
		text-decoration: none;
		transition: color 200ms, background-color 200ms;
	}

	:global(button:hover) {
		background-color: #472100;
		color: var(--main-bg-color);
	}

</style>

<svelte:head>
	<title>{title}</title>
	<meta charset="utf-8">
</svelte:head>

<Header />
<svelte:component this="{page}" />