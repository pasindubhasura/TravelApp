import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDb378C_DpMlucnBO_Qp7fdcGjsyJYMcKA",
    authDomain: "react-d1629.firebaseapp.com",
    projectId: "react-d1629",
    storageBucket: "react-d1629.appspot.com",
    messagingSenderId: "779821785769",
    appId: "1:779821785769:web:2f8d9f653a5cfa21ff3fb8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
