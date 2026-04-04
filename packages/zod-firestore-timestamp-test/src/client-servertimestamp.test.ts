import { test, expect } from 'vitest'
import { isClientSdkServerTimestamp } from '@luthfisolahudin/zod-firestore-timestamp'

import { serverTimestamp as serverTimestampV9_0 } from 'firebase-v9-0/firestore'
import { serverTimestamp as serverTimestampV9_x } from 'firebase-v9-x/firestore'
import { serverTimestamp as serverTimestampV10_0 } from 'firebase-v10-0/firestore'
import { serverTimestamp as serverTimestampV10_x } from 'firebase-v10-x/firestore'
import { serverTimestamp as serverTimestampV11_0 } from 'firebase-v11-0/firestore'
import { serverTimestamp as serverTimestampV11_x } from 'firebase-v11-x/firestore'
import { serverTimestamp as serverTimestampV12_0 } from 'firebase-v12-0/firestore'
import { serverTimestamp as serverTimestampV12_x } from 'firebase-v12-x/firestore'

test.each([
  ['v9.0', serverTimestampV9_0],
  ['v9.x', serverTimestampV9_x],
  ['v10.0', serverTimestampV10_0],
  ['v10.x', serverTimestampV10_x],
  ['v11.0', serverTimestampV11_0],
  ['v11.x', serverTimestampV11_x],
  ['v12.0', serverTimestampV12_0],
  ['v12.x', serverTimestampV12_x],
] as const)('isClientSdkServerTimestamp for firebase %s returns true', (_, serverTimestamp) => {
  expect(isClientSdkServerTimestamp(serverTimestamp() as any)).toBe(true)
})

