import app from 'firebase/app'
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyChLkhQtdFChTvOqvVTMm5i5drAQ6asvNM",
    authDomain: "proyecto-final-2-e3857.firebaseapp.com",
    projectId: "proyecto-final-2-e3857",
    storageBucket: "proyecto-final-2-e3857.appspot.com",
    messagingSenderId: "801293866018",
    appId: "1:801293866018:web:ef4ed5787970617c11a67b"
  };
app.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
