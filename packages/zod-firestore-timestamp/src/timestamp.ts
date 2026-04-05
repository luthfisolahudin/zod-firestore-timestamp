import * as z from 'zod'
import type { Timestamp as AdminTimestamp } from 'firebase-admin/firestore'
import type { Timestamp as ClientTimestamp } from 'firebase/firestore'
import type { Timestamp as ClientLiteTimestamp } from 'firebase/firestore/lite'

type Timestamp = (
  | AdminTimestamp
  | ClientTimestamp
  | ClientLiteTimestamp
)

/**
 * Convert Firestore Timestamp to native JS Date.
 *
 * @__NO_SIDE_EFFECTS__
 */
export function fromTimestampToDate(value: Timestamp): Date {
  return value.toDate()
}

/** Is `value` a Firestore Timestamp without direct dependencies to either Firestore SDK. */
export const TimestampSchema = /* @__PURE__ */ z.custom<Timestamp>((value: any): boolean => {
  if (!value) return false

  const s = value.seconds
  const ns = value.nanoseconds
  const toDate = value.toDate

  if (typeof toDate !== 'function') return false

  return Number.isFinite(s) && Number.isFinite(ns)
})

