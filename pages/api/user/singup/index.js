import {register, db} from '/firebase/client'

export default function (req, res) {
/*

  email
  nombre  
  apellidos 
  direccion
  experiencia
  descripcion
  horas disponibles

*/ 
  

  //res.send(db.collection("usehrs").doc("new-city-id").set({"usuaior": "sca"}))
  switch (req.method) {

    case "POST":
      const { email, password, name, surname, address, experience, desciption, avaibility} = req.body
      
        register(email,password)
        .then((user) => {
          if(user){
            console.log(user)
            user.user.updateProfile({
               displayName: name
            })}
          const {uid} = user.user
          user.user.sendEmailVerification()
          db.collection("users").doc(uid).set({
            displayName : name,
            surname : "carballar",
            address : "calle lobo"

          })
          res.json(user.user)
        }
        )
        .catch(error => {
          console.error(error)
        })
  }
}