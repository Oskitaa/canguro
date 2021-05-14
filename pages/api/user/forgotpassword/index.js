import firebase from '/firebase/client'
import 'firebase/auth'

export default function (req, res) {

  switch (req.method) {

    case "POST":
      const { email } = req.body
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          console.log("correo endiado")
        }
        )
        .catch(error => {
          console.error(error)
        })
  }
}