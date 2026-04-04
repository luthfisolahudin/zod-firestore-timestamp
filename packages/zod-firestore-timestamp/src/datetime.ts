import * as z from 'zod'
import { fromTimestampToDate, TimestampSchema } from './timestamp'
import { AdminServerTimestampSchema } from './admin-servertimestamp'
import { ClientServerTimestampSchema } from './client-servertimestamp'

/** Accept native JS Date, Firestore Timestamp, Firestore serverTimestamp(). */
export const DatetimeSchema = /* @__PURE__ */ z.union([
  z.date(),

  // Handle both client and server Timestamp
  TimestampSchema.transform(fromTimestampToDate),

  AdminServerTimestampSchema,
  ClientServerTimestampSchema,
])

