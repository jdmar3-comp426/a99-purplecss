const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { doc, getDoc } = require("firebase/firestore");

//const sessionStorage = window.sessionStorage;
let db;

module.exports.initFirebase = function() {
	const firebaseApp = initializeApp({
        apiKey: "AIzaSyACwKgEniONMo-zXxZoZj9ynXqvzYUonJk",
        authDomain: "final-59dd1.firebaseapp.com",
        projectId: "final-59dd1",
        storageBucket: "final-59dd1.appspot.com",
        messagingSenderId: "860029207688",
        appId: "1:860029207688:web:d62304f2970740db934b3d"
	});

	db = getFirestore();
}

module.exports.getDocument = async function(collection, docID) {
	const refID = `${collection}-${docID}`;
 	//const cache = sessionStorage.getItem(refID);
    const cache = false;

	if (cache) {
		return new Promise((resolve, reject) => {
			resolve(JSON.parse(cache));
		});
	} else {
		const docRef = doc(db, collection, docID);
		const docSnap = await getDoc(docRef);
		const data = docSnap.data();

		//sessionStorage.setItem(refID, JSON.stringify(data));

		return data;
	}
}
