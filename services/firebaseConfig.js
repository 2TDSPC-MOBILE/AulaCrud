// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection,addDoc,getDocs,doc,updateDoc,deleteDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCAYPAgkzwxfC-TobDCpvB9TkHdGKaZ7Y",
  authDomain: "lojaapp-21d9f.firebaseapp.com",
  projectId: "lojaapp-21d9f",
  storageBucket: "lojaapp-21d9f.firebasestorage.app",
  messagingSenderId: "667463287966",
  appId: "1:667463287966:web:2a14638f857db7300f678f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export{app,db,getFirestore,collection,addDoc,getDocs,doc,updateDoc,deleteDoc}