import * as z from 'zod'
import type { FieldValue as AdminFieldValue } from 'firebase-admin/firestore'

const adminServerTimestampMethodName = 'FieldValue.serverTimestamp' as const

interface InternalAdminFieldValue {
  get methodName(): string | typeof adminServerTimestampMethodName
}

/**
 * Is value a `serverTimestamp()`.
 *
 * @__NO_SIDE_EFFECTS__
 */
export function isAdminSdkServerTimestamp(
  field: unknown,
): field is AdminFieldValue & InternalAdminFieldValue {
  const methodName = (field as InternalAdminFieldValue).methodName

  return methodName === adminServerTimestampMethodName
}

export const AdminServerTimestampSchema = /* @__PURE__ */ z.custom<AdminFieldValue>(isAdminSdkServerTimestamp)

