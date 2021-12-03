import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, deleteUser } from "firebase/auth";
const sessionStorage = window.sessionStorage;

let auth;

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
        sessionStorage.setItem("user", JSON.stringify(userCreds.user));
        return userCreds.user;
    } catch(e) {
        alert('User already exists!')
        return null;
    }
}

export async function deleteThisUser() {
    try {
        fetch(`http://localhost:3000/app/delete/users/${getUser().uid}`, {
            method: 'delete',
            headers: { "Content-Type": "application/json" },
        }).then(() => {
            deleteUser(auth.currentUser).then(() => {
                sessionStorage.setItem("user", "");
                window.location.href = "/"
            })
        })
    } catch(e) {
        deleteUser(auth.currentUser).then(() => {
            sessionStorage.setItem("user", "");
            window.location.href = "/"
        })
    }
}

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

export function getUser() {
    let sUser = sessionStorage.getItem("user");

    if (sUser == null) {
        return null;
    }

    if (sUser.length > 0) {
        return JSON.parse(sUser);
    }

    return null;

}


export async function logoutUser() {
    try {
        await signOut();
    } catch (e) {
    }
    sessionStorage.setItem("user", "");

    window.location.href = "/"
}

export async function getUserData() {
    try {
        let x = await fetch(`http://localhost:3000/app/get/users/${getUser().uid}`, {
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

        fetch(`http://localhost:3000/app/patch/users/${getUser().uid}`, {
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