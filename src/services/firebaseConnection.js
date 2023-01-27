import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'

let firebaseConfig = {
    apiKey: "AIzaSyAdjVI_4fP9xJGaZkjqvvp882A0e51RP84",
    authDomain: "tarefas-cd92e.firebaseapp.com",
    projectId: "tarefas-cd92e",
    storageBucket: "tarefas-cd92e.appspot.com",
    messagingSenderId: "523165877111",
    appId: "1:523165877111:web:0aad870b2f9aa3bc0d9772"
  };

  if( !firebase.apps.length ){
    firebase.initializeApp(firebaseConfig)
  }

  export default firebase;