// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
//import { addDoc, collection, getDocs } from "firebase/firestore";
//import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId:  import.meta.env.VITE_APPID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

/*export const docRef = async(entity, model) => {return addDoc(collection(db, entity), model);}
export const collectionRef = async(entity) => {return collection(db, entity);}
docRef = await addDoc(collection(db,'users'), model);
export const collection = this.collection
export const addDoc = addDoc;
export const getDocs = getDocs;*/



