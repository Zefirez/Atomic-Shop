import firebase from 'firebase/app';
import 'firebase/firestore'
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

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date()

      try {
        await userRef.set({
          displayName, 
          email,
          createdAt,
          ...additionalData
        })
      } catch(error) {
        console.log('error creating user', error.message);
      }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'})
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;