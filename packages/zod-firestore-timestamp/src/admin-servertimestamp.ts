import type { FieldValue as AdminFieldValue } from 'firebase-admin/firestore'

const adminServerTimestampMethodName = 'FieldValue.serverTimestamp' as const

interface InternalAdminFieldValue {
  get methodName(): string | typeof adminServerTimestampMethodName
}

// #__NO_SIDE_EFFECTS__
export function isAdminSdkServerTimestamp<
  T extends AdminFieldValue,
>(
  field: T,
): field is T & InternalAdminFieldValue {
  const methodName = (field as unknown as InternalAdminFieldValue).methodName

  return methodName === adminServerTimestampMethodName
}

