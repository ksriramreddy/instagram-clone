import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
// const firebaseConfig = {
//   apiKey: "AIzaSyAg5Fbz430S8cBUvmnt14MpeeSWHowbV-A",
//   authDomain: "instagram-clone-32d33.firebaseapp.com",
//   projectId: "instagram-clone-32d33",
//   storageBucket: "instagram-clone-32d33.appspot.com",
//   messagingSenderId: "319710254411",
//   appId: "1:319710254411:web:870fe71d69e793781144ce",
//   measurementId: "G-X43WVCT2SJ"
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID ,
  storageBucket:import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ,
  messagingSenderId:import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId:import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)

export {app,auth,firestore,storage} 