
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDoGRwOgc-2aPkirDUP1kmV7HJ4pum4-Kg",
  authDomain: "yugiapp-12fc1.firebaseapp.com",
  projectId: "yugiapp-12fc1",
  storageBucket: "yugiapp-12fc1.appspot.com",
  messagingSenderId: "448018234021",
  appId: "1:448018234021:web:cd5fc5f7f2b3598751ab4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(app);


export {app , firestoreDB};