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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collectionsSnapshot) => {
  const transformedCollection = collectionsSnapshot.docs.map((docSnapshot) => {
    const { title, items } = docSnapshot.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: docSnapshot.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
