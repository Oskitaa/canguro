import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBpxHAjtJLc_bH1b--e_Zqy3vVoWIhEU5Y",
    authDomain: "proyectocangurofct.firebaseapp.com",
    databaseURL: "https://proyectocangurofct-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "proyectocangurofct",
    storageBucket: "proyectocangurofct.appspot.com",
    messagingSenderId: "465640686040",
    appId: "1:465640686040:web:0695bb2dbeadd816da72ad",
    measurementId: "G-XBS0XMHC9L"
}
!firebase.apps.length  ? firebase.initializeApp(firebaseConfig) : firebase.app()
export const auth = firebase.auth()
export const db = firebase.firestore()
export const log = (email,password) => auth.signInWithEmailAndPassword(email,password)

export const singup = (email,password,name) => firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(result) {
      result.user.updateProfile({
        displayName: name
        }
      )
    }
  )
  .then(
      ()=>{
        console.log(auth.currentUser)

        console.log(auth.currentUser.displayName)
        auth.currentUser.sendEmailVerification()}
  )

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    onChange(user)
  })
}
       /* .then((userCredential) => {
          const { uid } = userCredential.user
          db.collection("users")
            .doc(uid).get()
            .then(e =>{
         
              console.log({ uid, data: e.data() })})
           }
        )
        .catch(error => {
          console.error(error)
        })*/


