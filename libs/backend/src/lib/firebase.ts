// Import the functions you need from the SDKs you need
import { FirebaseError, initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBVILgEmyUdQlzusXn70N3-5ozroQxpME8',
  authDomain: 'inline-hiring.firebaseapp.com',
  projectId: 'inline-hiring',
  storageBucket: 'inline-hiring.appspot.com',
  messagingSenderId: '563031307463',
  appId: '1:563031307463:web:e1c03df6b57f51ec6bfae2',
  measurementId: 'G-YE517GJ93L',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();

export function getFirebaseError(
  error: FirebaseError,
  defaultMessage: string
): string {
  let message = defaultMessage ?? 'Something went wrong';
  switch (error.code) {
    case 'auth/email-already-in-use':
      message = 'Email already registered';
      break;
    case 'auth/wrong-password':
      message = 'Wrong password';
      break;
    case 'auth/user-not-found':
      message = 'User not found';
      break;
    case 'auth/invalid-credential':
      message = 'Invalid credential';
      break;
    case 'auth/user-disabled':
      message = 'Your account has been disabled,contact support';
      break;
    default:
      break;
  }
  return message;
}
