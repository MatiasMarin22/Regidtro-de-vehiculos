
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"
 
const firebaseConfig = {
    apiKey: "AIzaSyAE4jSxtflFIvvOQbe4ljhzZPBgiQpwUxI",
    authDomain: "proyecto-d65d8.firebaseapp.com",
    projectId: "proyecto-d65d8",
    storageBucket: "proyecto-d65d8.appspot.com",
    messagingSenderId: "214633731691",
    appId: "1:214633731691:web:5b452eb90b8c6add7bc32e"
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)


export const save = (auto) => {

    addDoc(collection(db, 'Autos'), auto)
}


export const getData = (callback) => {

    onSnapshot(collection(db, 'Autos'), callback)
}


export const remove = (id) => {

    deleteDoc(doc(db, 'Autos', id))
}


export const selectOne = (id) => getDoc(doc(db, 'Autos', id))

export const edit = (id, Autos) => {
    updateDoc(doc(db, 'Autos', id), Autos)  
}
