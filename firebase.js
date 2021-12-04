// Import required functions from Firebase libaries
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { doc, getDoc, setDoc, deleteDoc } = require("firebase/firestore");

let db;

/**
 * Summary.
 * Export a function to initizalize the database and save the database reference.
 * 
 * @returns none.
 */
module.exports.initFirebase = function() {
	const firebaseApp = initializeApp({ // Init Firebase
        apiKey: "AIzaSyACwKgEniONMo-zXxZoZj9ynXqvzYUonJk", // We know this should be hidden, but thats a problem for not this class
        authDomain: "final-59dd1.firebaseapp.com",
        projectId: "final-59dd1",
        storageBucket: "final-59dd1.appspot.com",
        messagingSenderId: "860029207688",
        appId: "1:860029207688:web:d62304f2970740db934b3d"
	});

	db = getFirestore(); // Get the database instance and save its reference
}

/**
 * Summary.
 * Exports a function that sends async request to FirebaseAPI to retrieve the document from a collection
 * 
 * @param {string} collection    The collection from which to retrieve the document from
 * @param {string} docID         The id of the document to be retrieved
 * 
 * @returns {object} JavaScript object containing the information from the retrieved document
 */
module.exports.getDocument = async function(collection, docID) {
	const docRef = doc(db, collection, docID); // Get the reference to document {docID} in the collection {collection} in the database {db}
	const docSnap = await getDoc(docRef); // Send request to Firebase API to get the document snapshot from the reference {docRef}
	const data = docSnap.data(); // get the data from the document snapshot

	return data;
}

/**
 * Summary.
 * Exports a async function that creates / sets a document in the database
 * 
 * @param {string} collection    The collection from which to retrieve the document from 
 * @param {string} docID         The id of the document to be set
 * @param {object} data          The data to be saved into the document
 * 
 * @returns {object} JavaScript object containing the data saved into the document
 */
module.exports.setDocument = async function(collection, docID, data) {
	const docRef = doc(db, collection, docID);
	await setDoc(docRef, data); // send async request to create/set the document in the document reference {docRef}

	return data;
}

/**
 * Summary.
 * Exports a async function that updates a document in the database
 * 
 * @param {string} collection    The collection from which to retrieve the document from 
 * @param {string} docID         The id of the document to be updated
 * @param {object} data          The data to be update on the document
 * 
 * @returns {object} JavaScript object containing the data update in the document
 */
module.exports.updateDocument = async function(collection, docID, data) {
	const docRef = doc(db, collection, docID);
	await setDoc(docRef, data, { merge: true }); // send async request to merge new data into the document in the document reference {docRef}

	return data;
}

/**
 * Summary.
 * Exports a async function that deletes a document in the database
 * 
 * @param {string} collection    The collection from which to retrieve the document from 
 * @param {string} docID         The id of the document to be deleted
 * 
 * @returns {object} JavaScript object containing the collection and document id and also a status flag
 */
module.exports.deleteDocument = async function(collection, docID) {
	const docRef = doc(db, collection, docID);
	await deleteDoc(docRef);

	return { 'collection': collection, 'docID': docID, 'deleted': true };
}
