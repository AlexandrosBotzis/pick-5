import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCHJgK48py8LzQ-qpjH7wSUBI1Q2souzXE',
  authDomain: 'bet5-lottery.firebaseapp.com',
  projectId: 'bet5-lottery',
  storageBucket: 'bet5-lottery.appspot.com',
  messagingSenderId: '562260325224',
  appId: '1:562260325224:web:419bc64664feb088e01cdd',
  measurementId: 'G-0RQ97B266W',
};

firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection('users');
const historyCollection = db.collection('history');

export {
  db,
  auth,
  usersCollection,
  historyCollection,
};
