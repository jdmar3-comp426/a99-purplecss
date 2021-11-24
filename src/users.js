import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";

let auth;
let user;

export function initFirebase() {
	const firebaseApp = initializeApp({
        apiKey: "AIzaSyACwKgEniONMo-zXxZoZj9ynXqvzYUonJk",
        authDomain: "final-59dd1.firebaseapp.com",
        projectId: "final-59dd1",
        storageBucket: "final-59dd1.appspot.com",
        messagingSenderId: "860029207688",
        appId: "1:860029207688:web:d62304f2970740db934b3d"
	});

	auth = getAuth();
}

export async function createUser(email, password) {
	const userCreds = await createUserWithEmailAndPassword(auth, email, password);
    user = userCreds.user;

	return user;
}

export async function signUserIn(email, password) {
	const userCreds = await signInWithEmailAndPassword(auth, email, password);
    user = userCreds.user;

	return user;
}

export async function logoutUser() {
    user = null;
    await signOut();
}

export function getUser() {
    return user;
}


/// DEMO
// NEED TO ADD THIS LINE AT TOP OF CODE

// import { createUser, signUserIn, logoutUser, getUser } from "../users.js";


// To Create a user do:
// createUser({user}, {password}).then((user) => {
//      Do more code here
// });

// Automatically signs then in, so redirect back to the main page
// Then you need to make a doc in the 'users' collection. Name the doc to 'user.uid' and store their username / email in it. Do this inside of the { }
// Then once you made this doc you can just pull the doc data anywhere you need it.


// To sign a user in do:
// signUserIn({email}, {password}).then((user) => {
//      Do more code here
// });


// To log user out do:
// logoutUser();



/// To get the user anywhere in the code do:
// const user = getUser();
