import firebase from '/firebase/client'
import 'firebase/auth'

export default function (req, res) {

  switch (req.method) {

    case "POST":
      const { email, password } = req.body
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          userCredential.user.sendEmailVerification()
          res.json(userCredential.user)
        }
        )
        .catch(error => {
          console.error(error)
        })
  }
}