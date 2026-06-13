# Zod Firestore Timestamp schema

> Current state: work in progress

Targets:

- [ ] Convert Firestore Timestamp to native JS Date using Zod
- [ ] Allow to pass Firestore `serverTimestamp()`

Example use case:

```typescript
import * as z from 'zod'
import { serverTimestamp } from 'firebase/firestore'
import { DatetimeSchema } from '@luthfisolahudin/zod-firestore-timestamp'
import { TZDateMini } from '@date-fns/tz'

const DocSchema = z.object({
  createdAt: DatetimeSchema,
})

// ## For creating document:
// Allow pass `serverTimestamp()`
DocSchema.parse({
  createdAt: serverTimestamp(),
})
// or pass native JS Date
DocSchema.parse({
  createdAt: new Date(2026, 3, 1, 0, 0, 0)
  // ^ 2026 April 01 00:00:00
})
// or pass date object from library that extends native JS Date, like `@date-fns/tz`
DocSchema.parse({
  createdAt: new TZDateMini(2026, 3, 1, 0, 0, 0, 'Asia/Jakarta')
  // ^ 2026 April 01 00:00:00 at Asia/Jakarta or UTC+07:00 timezone
})

// ## For retrieving document:
// > Assume you have initialize Firestore `db`
import { doc, getDoc } from 'firebase/firestore'

const docSnap = await getDoc(doc(db, 'users', '<user-id>'))
const doc = DocSchema.parse(docSnap.data())
//    ^ { createdAt: Date }
// Auto convert from Firestore Timestamp to native JS Date using the same Zod schema
```
