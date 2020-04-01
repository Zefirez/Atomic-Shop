import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

//firebase config/key file for our application (firebase provides it)
const config = {
  apiKey: "AIzaSyDiZd4yCGV8mLNnCPOuvqtuJuWaY_qU1KI",
  authDomain: "atomic-shop-dcff7.firebaseapp.com",
  databaseURL: "https://atomic-shop-dcff7.firebaseio.com",
  projectId: "atomic-shop-dcff7",
  storageBucket: "atomic-shop-dcff7.appspot.com",
  messagingSenderId: "1001436016160",
  appId: "1:1001436016160:web:2d0698b71c2e5a77e75645",
  measurementId: "G-99TPK2EKEK"
};

//add a user into users collection using auth object and custom data
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

//adds or accesses a collection in firebase and populates it with documents from objectsToAdd
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  await batch.commit();
};

//converts collections data from firestore into format our app needs
export const convertCollectionSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve,reject)=>{
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  });
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
