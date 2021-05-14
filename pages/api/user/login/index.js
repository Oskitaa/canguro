import { db, log } from '/firebase/client'

export default function Login(req, res) {
  switch (req.method) {
    case "POST":
      const { email, password } = req.body
      log(email, password)
        .then((user) => {
          const { uid } = user.user
          db.collection("users")
            .doc(uid).get()
            .then(e => {
              res.json({ uid, data: e.data() })
            })
        }
        )
        .catch(error => {
          console.error(error)
        })
  }
}