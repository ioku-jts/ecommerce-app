import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: 'AIzaSyAFE4i-wzhzo8QxeGQpNQGWKJtqlBtddPk',
  authDomain: 'ecommerce-shop-14a2b.firebaseapp.com',
  projectId: 'ecommerce-shop-14a2b',
  storageBucket: 'ecommerce-shop-14a2b.appspot.com',
  messagingSenderId: '634236181804',
  appId: '1:634236181804:web:e4b860aea5c2eeaee22089',
  measurementId: 'G-LJ330MTB49',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

