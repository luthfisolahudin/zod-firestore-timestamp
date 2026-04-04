import type { FieldValue as ClientFieldValue } from "firebase/firestore"

const clientServerTimestampMethodName = 'serverTimestamp' as const

interface InternalClientFieldValue {
  _methodName: string | typeof clientServerTimestampMethodName
}

// #__NO_SIDE_EFFECTS__
export function isClientSdkServerTimestamp<
  T extends ClientFieldValue,
>(
  field: T,
): field is T & InternalClientFieldValue {
  const methodName = (field as unknown as InternalClientFieldValue)._methodName

  return methodName === clientServerTimestampMethodName
}

