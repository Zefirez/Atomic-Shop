import firebase from 'firebase/app'
import 'firebase/firestore';

const firestore = firebase.firestore();
firestore.collection('users').doc('B59LtZUGbxC2jREKkbdr')
.collection('cartItems').doc('yyG3HOBas6nIq9k831dJ')
//same shit, different stink
firestore.doc('/users/B59LtZUGbxC2jREKkbd/cartItems/yyG3HOBas6nIq9k831dJ')
//getting cartItems collection
firestore.collection('/users/B59LtZUGbxC2jREKkbd/cartItems')
