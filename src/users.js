/**
 * Summary.
 * Handles user authentication and user database information
 * 
 * Description.
 * Handles all user interactions with the authentication (creation/signin/logout). Also updates / retrieves the user information stored in our database
 * 
 * @see /docs/.md
 */

// Import required authentication firebase libraries
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, deleteUser } from "firebase/auth";

// Get access the browser local session storage
const sessionStorage = window.sessionStorage;

const API_END_POINT = "http://localhost:3000/app";
const CONTENT_DATA_TYPE = "application/json";

let auth;

export function initFirebase() {
	const firebaseApp = initializeApp({
        apiKey: "AIzaSyACwKgEniONMo-zXxZoZj9ynXqvzYUonJk", // Should be hidden but like thats for later
        authDomain: "final-59dd1.firebaseapp.com",
        projectId: "final-59dd1",
        storageBucket: "final-59dd1.appspot.com",
        messagingSenderId: "860029207688",
        appId: "1:860029207688:web:d62304f2970740db934b3d"
	});

    // Save the user authentication reference
	auth = getAuth();
}

/**
 * Summary.
 * Exports a async function that creates user from a email and password in the Firebase authentication system
 * 
 * @param {string} email     The email that user is registaring with
 * @param {string} password  The password which the user is registaring with
 * 
 * @returns {object} Javascript object containing information about the current user. Will return null if the user already has an account.
 */
export async function createUser(email, password) {
    try {
	    const userCreds = await createUserWithEmailAndPassword(auth, email, password); // creates a user in the Firebase authentication system
        sessionStorage.setItem("user", JSON.stringify(userCreds.user)); // Stores basic user information into local session storage
        return userCreds.user;
    } catch(e) {
        alert('User already exists!')
        return null;
    }
}

/**
 * Summary.
 * Sends a delete request to our API to remove the user information from the database and also removes the user from the
 *  Firebase authentication system
 */
export async function deleteThisUser() {
    const method = "delete";

    try {
        const endpoint = `${API_END_POINT}/${method}/users/${getUser().uid}`;

        fetch(endpoint, {
            method: method,
            headers: { "Content-Type": CONTENT_DATA_TYPE },
        }).then(() => {
            // Remove the user from the Firebase authentication system
            deleteUser(auth.currentUser).then(() => {
                // Remove user from local storage and redirect back to home page
                sessionStorage.setItem("user", "");
                window.location.href = "/"
            })
        })
    } catch(e) {
        // Remove the user from the Firebase authentication system even if the 
        // database document delete fails (meaning document didnt exisit to begin with)
        deleteUser(auth.currentUser).then(() => {
            sessionStorage.setItem("user", "");
            window.location.href = "/"
        })
    }
}

/**
 * Summary.
 * Exports a function that signs the user into their account
 * 
 * @param {string} email     The email the user is trying to sign in with
 * @param {string} password  The password the user is signing with
 * 
 * @returns {object} Javascript object containing information about the current user. Will return null if sign in is wrong
 */
export async function signUserIn(email, password) {
    try {
        const userCreds = await signInWithEmailAndPassword(auth, email, password);
        sessionStorage.setItem("user", JSON.stringify(userCreds.user));
        return userCreds.user;
    } catch(e) {
        alert('Invalid login')
        return null
    }
}

/**
 * Summary.
 * Gets the user object out of local storage
 * 
 * @returns {object} The user information stored in local storage. Null if there is no user saved.
 */
export function getUser() {
    const sUser = sessionStorage.getItem("user");

    if (sUser == null) {
        return null;
    }

    if (sUser.length > 0) {
        return JSON.parse(sUser);
    }

    return null;

}

/**
 * Summary.
 * Logs out the current signed in user, from both the Firebase authentication and also the local storage.
 */
export async function logoutUser() {
    try {
        await signOut();
    } catch (e) {
    }

    // clear user and redirect to main page
    sessionStorage.setItem("user", "");
    window.location.href = "/"
}

/**
 * Summary.
 * Get the user data from the database
 * 
 * @returns {object} the data from the current user's document in the database
 */
export async function getUserData() {
    const method = "get";
    const endpoint = `${API_END_POINT}/${method}/users/${getUser().uid}`;

    try {
        const x = await fetch(endpoint, {
            method: method,
            headers: { "Content-Type": CONTENT_DATA_TYPE },
        });

        const data = await x.json();
        return data;
    } catch (e) {
        // INITIALIZE A NEW OBJECT (THIS IS WHAT WE STORE FOR EVERY USER UID IN)
        return {thisUser: "", avgWPM: "", matchHistory: [], numGames: 0, matchHistoryTime: [] };
    }

}

/**
 * Summary.
 * Updates a users document in the database to have the new wpm from the past game and the new average
 * 
 * @param {int} newWPM     The new word per minute count that needs to be added to the users information
 */
export async function updateUserStats(newWPM) {
    getUserData().then((data) => {
        // Get all the users current information from the database
        const thisUser = data.email
        let avgWPM = data.avgWPM
        let matchHistory = data.matchHistory
        let matchHistoryTime = data.matchHistoryTime
        const numGames = data.numGames

        // Get the legnth of th
        const time = new Date();
        if (matchHistory.length < 10) {
            matchHistory.splice(0, 0, newWPM)
            matchHistoryTime.splice(0, 0, time.toLocaleString())
        } else {
            matchHistory.splice(0, 0, newWPM)
            matchHistory.pop()
            matchHistoryTime.splice(0, 0, time.toLocaleString())
            matchHistoryTime.pop()
        }

        // The new average word count
        let sum = 0;
        for (const wpm of matchHistory) {
            sum += wpm
        }
        avgWPM = sum / matchHistory.length

        const method = "patch";
        const endpoint = `${API_END_POINT}/${method}/users/${getUser().uid}`;

        // Send request to API to update the user information
        fetch(endpoint, {
            method: "PATCH",
            headers: { "Content-Type": CONTENT_DATA_TYPE },
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