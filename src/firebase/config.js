import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBLBt9JppZjfTMR1ju74EpzbjixAkXpKPk",
  authDomain: "ninja-music-5ba2e.firebaseapp.com",
  projectId: "ninja-music-5ba2e",
  storageBucket: "ninja-music-5ba2e.appspot.com",
  messagingSenderId: "915216962705",
  appId: "1:915216962705:web:71096ea5854841c2939b30"
};


// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, timestamp, projectStorage }