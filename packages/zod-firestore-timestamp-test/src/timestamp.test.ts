import { test, expect, describe } from "vitest";
import { TimestampSchema, fromTimestampToDate } from "@luthfisolahudin/zod-firestore-timestamp";

import { Timestamp as AdminTimestampV11_0 } from "firebase-admin-v11-0/firestore";
import { Timestamp as AdminTimestampV11_x } from "firebase-admin-v11-x/firestore";
import { Timestamp as AdminTimestampV12_0 } from "firebase-admin-v12-0/firestore";
import { Timestamp as AdminTimestampV12_x } from "firebase-admin-v12-x/firestore";
import { Timestamp as AdminTimestampV13_0 } from "firebase-admin-v13-0/firestore";
import { Timestamp as AdminTimestampV13_x } from "firebase-admin-v13-x/firestore";

import { Timestamp as ClientTimesampV9_0 } from "firebase-v9-0/firestore";
import { Timestamp as ClientTimesampV9_x } from "firebase-v9-x/firestore";
import { Timestamp as ClientTimesampV10_0 } from "firebase-v10-0/firestore";
import { Timestamp as ClientTimesampV10_x } from "firebase-v10-x/firestore";
import { Timestamp as ClientTimesampV11_0 } from "firebase-v11-0/firestore";
import { Timestamp as ClientTimesampV11_x } from "firebase-v11-x/firestore";
import { Timestamp as ClientTimesampV12_0 } from "firebase-v12-0/firestore";
import { Timestamp as ClientTimesampV12_x } from "firebase-v12-x/firestore";

import { emptyValues } from "./utils";

const timestamps = [
  ["firebase-admin v11.0", new AdminTimestampV11_0(1, 500_000_000)],
  ["firebase-admin v11.x", new AdminTimestampV11_x(1, 500_000_000)],
  ["firebase-admin v12.0", new AdminTimestampV12_0(1, 500_000_000)],
  ["firebase-admin v12.x", new AdminTimestampV12_x(1, 500_000_000)],
  ["firebase-admin v13.0", new AdminTimestampV13_0(1, 500_000_000)],
  ["firebase-admin v13.x", new AdminTimestampV13_x(1, 500_000_000)],

  ["firebase v9.0", new ClientTimesampV9_0(1, 500_000_000)],
  ["firebase v9.x", new ClientTimesampV9_x(1, 500_000_000)],
  ["firebase v10.0", new ClientTimesampV10_0(1, 500_000_000)],
  ["firebase v10.x", new ClientTimesampV10_x(1, 500_000_000)],
  ["firebase v11.0", new ClientTimesampV11_0(1, 500_000_000)],
  ["firebase v11.x", new ClientTimesampV11_x(1, 500_000_000)],
  ["firebase v12.0", new ClientTimesampV12_0(1, 500_000_000)],
  ["firebase v12.x", new ClientTimesampV12_x(1, 500_000_000)],
] as const;

describe("TimestampSchema", () => {
  test.each(timestamps)("accepts %s Timestamp", (_, timestamp) => {
    const result = TimestampSchema.safeParse(timestamp);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe(timestamp);
    }
  });

  test.each(emptyValues)("rejects invalid %s value", (_, input) => {
    expect(TimestampSchema.safeParse(input).success).toBe(false);
  });
});

describe("fromTimestampToDate", () => {
  test.each(timestamps)("returns a Date for %s Timestamp", (_, timestamp) => {
    const result = fromTimestampToDate(timestamp);
    expect(result).toBeInstanceOf(Date);
    expect(result.getTime()).toBe(1500);
  });

  test.each(emptyValues)("throws for invalid %s value", (_, input) => {
    expect(() => fromTimestampToDate(input as any)).toThrow();
  });
});
