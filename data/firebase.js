// Import the functions you need from the SDKs you need
import firebase from 'firebase'
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC4JcxWwsDVXSo9YAB4T4GyKBSO0EmBBgE",
    authDomain: "mohi-29a57.firebaseapp.com",
    projectId: "mohi-29a57",
    storageBucket: "mohi-29a57.appspot.com",
    messagingSenderId: "458593423566",
    appId: "1:458593423566:web:67041b6d42cd76d66e409f",
    measurementId: "G-9HWFTLY4L7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

//Services
const db = firebase.firestore()
const storage = firebase.storage()
const auth = firebase.auth()
const firestore = firebase.firestore

export default {
    db,
    storage,
    auth,
    firestore
}
