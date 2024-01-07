// import {
//   GoogleAuthProvider,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInWithPopup,
// } from "firebase/auth";
// import {auth} from "./firebase";

// export class FirebaseAuthService {
//   //register
//   registerWithEmail(email: string, password: string) {
//     return createUserWithEmailAndPassword(auth, email, password);
//   }

//   //login
//   loginWithEmail(email: string, password: string) {
//     return signInWithEmailAndPassword(auth, email, password);
//   }

//   //logout
//   async logout() {
//     await auth.signOut();
//   }

//   //login with google
//   loginWithGoogle() {
//     const provider = new GoogleAuthProvider();
//     return signInWithPopup(auth, provider);
//   }
// }

// const firebaseAuthService = new FirebaseAuthService();
// export default firebaseAuthService;
