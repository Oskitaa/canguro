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

export const singUp = async (user) => {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password);
  const { uid } = auth.currentUser;
  const photoURL = await uploadImage(user.file, uid);
  await db.collection("users").doc(uid).set({
    uid,
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
  await auth.currentUser.updateProfile({
    displayName: user.displayName,
    photoURL: photoURL,
  });
  await auth.currentUser.sendEmailVerification();
};

export const crearOferta = async (uid_ofertante,uid_demandante,data) =>{
  return db.collection("ofertas").add({
    uid_ofertante,
    uid_demandante,
    ...data
  })
} 
export const obtenerPersona = async (uid) =>{
  return await db.collection("users").doc(uid).get()
}

export const obtenerOfertaDemandante = async (uid) =>{
  return await db.collection("ofertas").where("uid_demandante", "==", uid).get()
}

export const obtenerOfertaOfertante = async (uid) =>{
  return await  db.collection("ofertas").where("uid_ofertante", "==", uid).where("estado" ,"==", "enviado").get()
}

export const cambiarEstado = (id,estado) => {
  return db.collection("ofertas").doc(id).update({estado})
}

export const uploadImage = async (file, uid) => {
  const ref = firebase.storage().ref(`images/${uid}/${file.name}`);
  return await ref
    .put(file)
    .then((snapshot) => {
      return snapshot.ref.getDownloadURL();
    })
    .then((downloadURL) => {
      return downloadURL;
    });
};
