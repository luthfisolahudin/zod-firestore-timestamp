import { serverTimestamp } from "firebase/firestore"
import { FieldValue } from 'firebase-admin/firestore'

console.dir({
  clientSDK: serverTimestamp(),
  adminSDK: FieldValue.serverTimestamp(),
})
