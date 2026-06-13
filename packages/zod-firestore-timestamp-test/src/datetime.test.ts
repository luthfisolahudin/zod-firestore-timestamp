import { test, expect, describe } from "vitest";
import { DatetimeSchema } from "@luthfisolahudin/zod-firestore-timestamp";

import { Timestamp as AdminTimestampV11_x } from "firebase-admin-v11-x/firestore";
import {
  Timestamp as AdminTimestampV13_x,
  FieldValue as AdminFieldValueV13_x,
} from "firebase-admin-v13-x/firestore";
import { Timestamp as ClientTimesampV9_x } from "firebase-v9-x/firestore";
import {
  Timestamp as ClientTimesampV12_x,
  serverTimestamp as serverTimestampV12_x,
  deleteField as deleteFieldV12_x,
} from "firebase-v12-x/firestore";
import { FieldValue as AdminFieldValueV11_x } from "firebase-admin-v11-x/firestore";
import { serverTimestamp as serverTimestampV9_x } from "firebase-v9-x/firestore";

import { TZDate } from "@date-fns/tz";
import { UTCDate } from "@date-fns/utc";

describe("DatetimeSchema — z.date() branch", () => {
  test("accepts a native JS Date and returns it unchanged", () => {
    const input = new Date("2024-01-01T00:00:00Z");
    const result = DatetimeSchema.safeParse(input);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeInstanceOf(Date);
      expect(result.data.getTime()).toBe(input.getTime());
    }
  });

  test("accepts new Date(0)", () => {
    const result = DatetimeSchema.safeParse(new Date(0));
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.getTime()).toBe(0);
    }
  });

  test("accepts TZDate from @date-fns/tz", () => {
    const input = new TZDate(2024, 0, 1, "America/New_York");
    const result = DatetimeSchema.safeParse(input);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeInstanceOf(Date);
    }
  });

  test("accepts UTCDate from @date-fns/utc", () => {
    const input = new UTCDate(2024, 0, 1);
    const result = DatetimeSchema.safeParse(input);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeInstanceOf(Date);
    }
  });

  test("accepts Date from parseISO (date-fns)", () => {
    const input = parseISO("2024-01-01T00:00:00Z");
    const result = DatetimeSchema.safeParse(input);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeInstanceOf(Date);
    }
  });

  test("rejects Invalid Date", () => {
    expect(DatetimeSchema.safeParse(new Date("invalid")).success).toBe(false);
  });
});

describe("DatetimeSchema — Timestamp branch (transforms to Date)", () => {
  test.each([
    ["firebase-admin v11.x Timestamp", new AdminTimestampV11_x(1000, 0)],
    ["firebase-admin v13.x Timestamp", new AdminTimestampV13_x(1000, 0)],
    ["firebase v9.x Timestamp", new ClientTimesampV9_x(1000, 0)],
    ["firebase v12.x Timestamp", new ClientTimesampV12_x(1000, 0)],
  ] as const)("accepts %s and transforms to Date", (_, input) => {
    const result = DatetimeSchema.safeParse(input);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeInstanceOf(Date);
      expect(result.data.getTime()).toBe(1000 * 1000);
    }
  });

  test("Timestamp with known seconds transforms to correct Date", () => {
    const ts = new AdminTimestampV13_x(1000, 0);
    const result = DatetimeSchema.safeParse(ts);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.getTime()).toBe(1000 * 1000);
    }
  });

  test("Timestamp result is a plain Date, not the original Timestamp", () => {
    const ts = new AdminTimestampV13_x(1000, 0);
    const result = DatetimeSchema.safeParse(ts);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).not.toBe(ts);
    }
  });
});

describe("DatetimeSchema — AdminServerTimestamp branch (passthrough)", () => {
  test.each([
    ["v11.x", AdminFieldValueV11_x],
    ["v13.x", AdminFieldValueV13_x],
  ] as const)(
    "accepts firebase-admin %s serverTimestamp() and returns it as-is",
    (_, FieldValue) => {
      const input = FieldValue.serverTimestamp();
      const result = DatetimeSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(input);
      }
    },
  );
});

describe("DatetimeSchema — ClientServerTimestamp branch (passthrough)", () => {
  test.each([
    ["v9.x", serverTimestampV9_x],
    ["v12.x", serverTimestampV12_x],
  ] as const)(
    "accepts firebase %s serverTimestamp() and returns it as-is",
    (_, serverTimestamp) => {
      const input = serverTimestamp();
      const result = DatetimeSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(input);
      }
    },
  );
});

describe("DatetimeSchema — invalid inputs", () => {
  test.each([
    ["null", null],
    ["undefined", undefined],
    ["empty object", {}],
    ["a number", 42],
    ["a string ISO date", "2024-01-01T00:00:00Z"],
    ["a boolean", true],
    ["an array", [1, 2, 3]],
    ["a function", () => {}],
    ["object with wrong methodName", { methodName: "deleteField" }],
    ["object with wrong _methodName", { _methodName: "deleteField" }],
  ] as const)("rejects %s", (_, input) => {
    expect(DatetimeSchema.safeParse(input).success).toBe(false);
  });

  test("rejects admin FieldValue.delete()", () => {
    expect(DatetimeSchema.safeParse(AdminFieldValueV13_x.delete()).success).toBe(false);
  });

  test("rejects client deleteField()", () => {
    expect(DatetimeSchema.safeParse(deleteFieldV12_x()).success).toBe(false);
  });

  test("rejects admin FieldValue.increment()", () => {
    expect(DatetimeSchema.safeParse(AdminFieldValueV13_x.increment(1)).success).toBe(false);
  });
});
