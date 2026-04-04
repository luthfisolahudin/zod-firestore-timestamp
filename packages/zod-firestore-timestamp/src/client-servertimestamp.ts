import * as z from 'zod'
import type { FieldValue as ClientFieldValue } from "firebase/firestore"

const clientServerTimestampMethodName = 'serverTimestamp' as const

interface InternalClientFieldValue {
  _methodName: string | typeof clientServerTimestampMethodName
}

/**
 * Is value a `serverTimestamp()`.
 *
 * @__NO_SIDE_EFFECTS__
 */
export function isClientSdkServerTimestamp(
  field: unknown,
): field is ClientFieldValue & InternalClientFieldValue {
  const methodName = (field as InternalClientFieldValue)._methodName

  return methodName === clientServerTimestampMethodName
}

export const ClientServerTimestampSchema = /* @__PURE__ */ z.custom<ClientFieldValue>(isClientSdkServerTimestamp)

