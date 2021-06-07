  
import admin from 'firebase-admin'
const {credential} = admin;

const serviceAccount = import("/firebase/firebase-keys.json")
try {
  admin.initializeApp(
    admin.credential.cert(serviceAccount)
  )
} catch (e) {}

