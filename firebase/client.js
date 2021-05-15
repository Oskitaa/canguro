import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)

!firebase.apps.length  ? firebase.initializeApp(firebaseConfig) : firebase.app()

export const auth = firebase.auth()
export const db = firebase.firestore()
export const log = (email,password) => auth.signInWithEmailAndPassword(email,password)

export const singup = async (email,password,name) => {
  await firebase.auth().createUserWithEmailAndPassword(email, password)
  await auth.currentUser.updateProfile({
    displayName: name
    }
  )
  await auth.currentUser.sendEmailVerification()
}
   

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


