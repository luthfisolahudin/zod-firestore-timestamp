import { test, expect } from 'vitest'
import { isAdminSdkServerTimestamp } from '@luthfisolahudin/zod-firestore-timestamp'

import { FieldValue as FieldValueAdminV11_0 } from 'firebase-admin-v11-0/firestore'
import { FieldValue as FieldValueAdminV11_x } from 'firebase-admin-v11-x/firestore'
import { FieldValue as FieldValueAdminV12_0 } from 'firebase-admin-v12-0/firestore'
import { FieldValue as FieldValueAdminV12_x } from 'firebase-admin-v12-x/firestore'
import { FieldValue as FieldValueAdminV13_0 } from 'firebase-admin-v13-0/firestore'
import { FieldValue as FieldValueAdminV13_x } from 'firebase-admin-v13-x/firestore'

test.each([
  ['v11.0', FieldValueAdminV11_0],
  ['v11.x', FieldValueAdminV11_x],
  ['v12.0', FieldValueAdminV12_0],
  ['v12.x', FieldValueAdminV12_x],
  ['v13.0', FieldValueAdminV13_0],
  ['v13.x', FieldValueAdminV13_x],
] as const)('isAdminSdkServerTimestamp for firebase-admin %s returns true', (_, FieldValue) => {
  expect(isAdminSdkServerTimestamp(FieldValue.serverTimestamp())).toBe(true)
})

