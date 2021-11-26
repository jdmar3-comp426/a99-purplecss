import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { writable } from 'svelte/store';
export const loggedIn = writable(false);

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
    try {
	    const userCreds = await createUserWithEmailAndPassword(auth, email, password);
        user = userCreds.user;
        loggedIn.update(() => true)
    } catch(e) {
        user = null
        loggedIn.update(() => false)
        alert('User already exists!')
        return null;
    }
	return user;
}

export async function signUserIn(email, password) {
    try {
        const userCreds = await signInWithEmailAndPassword(auth, email, password);
        user = userCreds.user;
        loggedIn.update(() => true)
    } catch(e) {
        user = null
        loggedIn.update(() => false)
        alert('Invalid login')
        return null
    }
	return user;
}

export function getUser() {
    return user
}


export async function logoutUser() {
    try {
        await signOut();
    } catch (e) {
    }
    user = null;
    loggedIn.update(() => false)
    return user
}

export async function getUserData() {
    try {
        let x = await fetch(`http://localhost:3000/api/get/users/${user.uid}`, {
            method: 'get',
            headers: { "Content-Type": "application/json" },
        });
        let data = await x.json();
        return data;
    } catch (e) {
        // INITIALIZE A NEW OBJECT (THIS IS WHAT WE STORE FOR EVERY USER UID IN)
        return {thisUser: "", avgWPM: "", matchHistory: [], numGames: 0, matchHistoryTime: [] };
    }

}

export async function updateUserStats(newWPM) {
    let thisUser = "";
    let avgWPM = "";
    let matchHistory = "";
    let numGames = "";
    let matchHistoryTime = "";
    getUserData().then((data) => {
        thisUser = data.email
        avgWPM = data.avgWPM
        matchHistory = data.matchHistory
        matchHistoryTime = data.matchHistoryTime
        numGames = data.numGames
        var time = new Date();
        if (matchHistory.length < 10) {
            matchHistory.splice(0, 0, newWPM)
            matchHistoryTime.splice(0, 0, time.toLocaleString())
        } else {
            matchHistory.splice(0, 0, newWPM)
            matchHistory.pop()
            matchHistoryTime.splice(0, 0, time.toLocaleString())
            matchHistoryTime.pop()
        }

        let sum = 0;
        for (const wpm of matchHistory) {
            sum += wpm
        }
        avgWPM = sum / matchHistory.length

        fetch(`http://localhost:3000/api/patch/users/${user.uid}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
            {'data': 
                {
                    'email': thisUser,
                    'numGames': numGames + 1,
                    'avgWPM': avgWPM,
                    'matchHistory': matchHistory,
                    'matchHistoryTime': matchHistoryTime,
                }
            }),
        })
    })
}

/// DEMO
// NEED TO ADD THIS LINE AT TOP OF CODE

// import { createUser, signUserIn, logoutUser, getUser, getUserData } from "../users.js";


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
