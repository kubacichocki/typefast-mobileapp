import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRpkDG1rX2N3AQlDt_OaSMVf6rfPcy1SU",
  authDomain: "typefast-f5f3f.firebaseapp.com",
  projectId: "typefast-f5f3f",
  storageBucket: "typefast-f5f3f.appspot.com",
  messagingSenderId: "593854120952",
  appId: "1:593854120952:web:769fa3774240c0aa20cc0d"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore }