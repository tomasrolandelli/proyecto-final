import app from 'firebase/app'
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDjBP_jA-tJwm9wp2NL_QLZrkqlTI5qiHc",
    authDomain: "proyecto-final-a0469.firebaseapp.com",
    projectId: "proyecto-final-a0469",
    storageBucket: "proyecto-final-a0469.appspot.com",
    messagingSenderId: "990940261277",
    appId: "1:990940261277:web:e8852c4f552833221a1d74"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
