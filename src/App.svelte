<!--
	Main svelte app component for front end
-->

<script>
	// Import firebase authentication init function
	import { initFirebase } from "./users"
	import router from 'page'; // Routing system
	
	// Import the nav header component
	import Header from './pages/Header.svelte';
	
	// The other pages on the website
	import LandingPage from './pages/LandingPage.svelte';
	import Index from './pages/Index.svelte';
	import Login from './pages/Login.svelte';
	import Signup from './pages/Signup.svelte';
	import Profile from './pages/Profile.svelte';
	import Rules from './pages/Rules.svelte';

	initFirebase(); // Init the Firebase authentication system

	let title;
	let page;

	let loadedNotPlay = false;

	// Route definitions for the frontend. The backend handles most of this, but svelte also needs to know the path conencts to each component
	router('/', () => { page = LandingPage; title = "Perfect Type"; loadedNotPlay = true; });
	router('/app', () => { page = LandingPage; title = "Perfect Type"; loadedNotPlay = true; });
	router('/app/play', () => {
		page = Index; title = "Perfect Type - Play";

		// For some reason the game doesnt work if you start on the play page, so this just forces someone to load the landing page 
		if (!loadedNotPlay) {
			window.location.href = "/";
		}
	});
	router('/app/login', () => { page = Login; title = "Perfect Type - Login"; });
	router('/app/signup', () => { page = Signup; title = "Perfect Type - Sign Up"; });
	router('/app/profile', () => { page = Profile; title = "Perfect Type - Profile"; });
	router('/app/rules', () => { page = Rules; title = "Perfect Type - Rules"; });

	router.start();
</script>

<style>
	/**
		Global CSS definitions that applies to all components
	*/
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
		color: gray;
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

	:global(a) {
		color: gray !important;
    	text-decoration: underline;
		transition: color 200ms;
	}

	:global(a:hover) {
		color: black !important;
	}

	/**
		END global css definitions
	*/

	#rules {
		position: absolute;
		bottom: 20px;
		color: gray !important;
		font-size: 1.5em;
		left: 50%;
		transform: translateX(-50%);
		z-index: 200;
	}
</style>

<!-- 
	Define the HTML head values such as the title and charset
	svelte:head indicates to svelte to modify the actual document head and not just the component head
-->
<svelte:head>
	<title>{title}</title>
	<meta charset="utf-8">
</svelte:head>

<!-- insert the header (i.e. navbar) -->
<Header />

<!-- insert the contents of whatever page is being loaded from the route -->
<svelte:component this="{page}" />

<!-- If the page is index or the landing page show the rules -->
{#if page == Index || page == LandingPage}
	<div id="rules">
		see the rules and how to play <a href="/app/rules">here</a>
	</div>
{/if}