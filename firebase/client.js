import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const auth = firebase.auth();

export const db = firebase.firestore();

export const log = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);
  
export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    onChange(user);
  });
};

export const forgotPasswordd = async email => {
  return  auth.sendPasswordResetEmail(email)
  .catch(err => {return err})
}

export const singUp = async (user) => {
   await firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password);
  const { uid } =  auth.currentUser;
  const photoURL =  await uploadImage(user.file, uid);
   await db.collection("users").doc(uid).set({
    uid,
    email : user.email,
    nombre: user.displayName,
    apellido: user.surname,
    fecha_nacimiento: user.fecha_nacimiento,
    tipo: user.tipo,
    horario: user.horario,
    precio: user.precio,
    experiencia: user.experiencia,
    descripcion: user.descripcion,
    domicilio: user.domicilio,
    provincia: user.provincia,
    terminos: user.terminos,
    photoURL: photoURL,
  });
   auth.currentUser.updateProfile({
    displayName: user.displayName,
    photoURL: photoURL,
  });
   auth.currentUser.sendEmailVerification();
};

export const updatePerfil = async (user) =>{
  const { uid } = auth.currentUser;
  const photoURL = user.file ? await uploadImage(user.file, uid) : auth.currentUser.photoURL;
  const email = user.email ? user.email : auth.currentUser.email
   await db.collection("users").doc(uid).update({
    uid,
    email,
    nombre: user.displayName,
    apellido: user.surname,
    fecha_nacimiento: user.fecha_nacimiento,
    tipo: user.tipo,
    horario: user.horario,
    precio: user.precio,
    experiencia: user.experiencia,
    descripcion: user.descripcion,
    domicilio: user.domicilio,
    provincia: user.provincia,
    terminos: user.terminos,
    photoURL: photoURL,
  });
   auth.currentUser.updateProfile({
    email,
    displayName: user.displayName,
    photoURL: photoURL,
  });
}

export const crearOferta = async (uid_ofertante,uid_demandante,data) =>{
  return db.collection("ofertas").add({
    uid_ofertante,
    uid_demandante,
    ...data
  })
} 
export const obtenerPersona = async (uid) =>{
  return  db.collection("users").doc(uid).get()
}

export const cambiarEstado = (id,estado) => {
  return db.collection("ofertas").doc(id).update({estado})
}

export const uploadImage = async (file, uid) => {
  const ref = firebase.storage().ref(`images/${uid}/${file.name}`);
  return  ref
    .put(file)
    .then((snapshot) => {
      return snapshot.ref.getDownloadURL();
    })
    .then((downloadURL) => {
      return downloadURL;
    });
};

export const getAllOffers = async () => {
  return  db.collection("ofertas").get()
}

export const getAllUsers = async () => {
  return  db.collection("users").get()
}

export const deleteDoc = async (doc) => {
  await db.collection("ofertas").doc(doc).delete()
  return await getAllOffers()
}