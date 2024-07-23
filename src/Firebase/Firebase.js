import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyAg5Fbz430S8cBUvmnt14MpeeSWHowbV-A",
  authDomain: "instagram-clone-32d33.firebaseapp.com",
  projectId: "instagram-clone-32d33",
  storageBucket: "instagram-clone-32d33.appspot.com",
  messagingSenderId: "319710254411",
  appId: "1:319710254411:web:870fe71d69e793781144ce",
  measurementId: "G-X43WVCT2SJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)

export {app,auth,firestore,storage} 