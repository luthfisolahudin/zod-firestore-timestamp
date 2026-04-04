import { FieldValue as ClientFieldValue, serverTimestamp } from "firebase/firestore"
import { FieldValue as AdminFieldValue } from 'firebase-admin/firestore'

interface InternalClientFieldValue {
  _methodName: string | 'serverTimestamp'
}

const clientServerTimestamp = serverTimestamp()

export function isClientSdkServerTimestamp<T extends ClientFieldValue>(field: T): field is T & InternalClientFieldValue {
  const methodName = (field as unknown as InternalClientFieldValue)._methodName

  return methodName === 'serverTimestamp'
}

const isClientSdkServerTimestampResult = isClientSdkServerTimestamp(clientServerTimestamp)

interface InternalAdminFieldValue {
  get methodName(): string | 'FieldValue.serverTimestamp'
}

const adminFieldValue = AdminFieldValue.serverTimestamp()

export function isAdminSdkServerTimestamp<T extends AdminFieldValue>(field: T): field is T & InternalAdminFieldValue {
  const methodName = (field as unknown as InternalAdminFieldValue).methodName

  return methodName === 'FieldValue.serverTimestamp'
}

const isAdminSdkServerTimestampResult = isAdminSdkServerTimestamp(adminFieldValue)

console.dir({
  clientServerTimestamp,
  clientSdkMethod: (clientServerTimestamp as any)._methodName,
  isClientSdkServerTimestampResult,

  adminFieldValue,
  adminSdkMethod: (adminFieldValue as any).methodName,
  isAdminSdkServerTimestampResult,
})

