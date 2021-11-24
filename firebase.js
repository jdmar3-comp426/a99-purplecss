const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { doc, getDoc, setDoc, deleteDoc } = require("firebase/firestore");

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
	const docRef = doc(db, collection, docID);
	const docSnap = await getDoc(docRef);
	const data = docSnap.data();

	return data;
}

module.exports.setDocument = async function(collection, docID, data) {
	const docRef = doc(db, collection, docID);
	await setDoc(docRef, data);

	return data;
}

module.exports.updateDocument = async function(collection, docID, data) {
	const docRef = doc(db, collection, docID);
	await setDoc(docRef, data, { merge: true });

	return data;
}

module.exports.deleteDocument = async function(collection, docID) {
	const docRef = doc(db, collection, docID);
	await deleteDoc(docRef);

	return { 'collection': collection, 'docID': docID, 'deleted': true };
}
