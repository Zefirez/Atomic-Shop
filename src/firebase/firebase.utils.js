import firebase from 'firebase/app';
import 'firebase/firebase';
import 'firebase/auth';
const config = {
    apiKey: "AIzaSyDiZd4yCGV8mLNnCPOuvqtuJuWaY_qU1KI",
    authDomain: "atomic-shop-dcff7.firebaseapp.com",
    databaseURL: "https://atomic-shop-dcff7.firebaseio.com",
    projectId: "atomic-shop-dcff7",
    storageBucket: "atomic-shop-dcff7.appspot.com",
    messagingSenderId: "1001436016160",
    appId: "1:1001436016160:web:2d0698b71c2e5a77e75645",
    measurementId: "G-99TPK2EKEK"
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore;

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'})
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;