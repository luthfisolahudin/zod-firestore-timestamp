import { test, expect, describe } from "vitest";
import {
  isAdminSdkServerTimestamp,
  AdminServerTimestampSchema,
} from "@luthfisolahudin/zod-firestore-timestamp";
import { adminFieldValues, emptyValues } from "./utils";

const subjects = [
  ["isAdminSdkServerTimestamp", (v: unknown) => isAdminSdkServerTimestamp(v)],
  ["AdminServerTimestampSchema", (v: unknown) => AdminServerTimestampSchema.safeParse(v).success],
] as const;

describe.each(subjects)("%s", (_, validate) => {
  test.each(adminFieldValues)("accepts %s .serverTimestamp()", (_, FieldValue) => {
    expect(validate(FieldValue.serverTimestamp())).toBe(true);
  });

  test.each(emptyValues)("rejects invalid %s value", (_, input) => {
    expect(validate(input)).toBe(false);
  });

  test.each(adminFieldValues)("rejects %s .delete()", (_, FieldValue) => {
    expect(validate(FieldValue.delete())).toBe(false);
  });

  test.each(adminFieldValues)(
    "rejects %s .increment(1)",
    (_, FieldValue) => {
      expect(validate(FieldValue.increment(1))).toBe(false);
    },
  );

  test.each(adminFieldValues)(
    "rejects %s .arrayUnion()",
    (_, FieldValue) => {
      expect(validate(FieldValue.arrayUnion("a value"))).toBe(false);
    },
  );

  test.each(adminFieldValues)(
    "rejects firebase-admin %s .arrayRemove()",
    (_, FieldValue) => {
      expect(validate(FieldValue.arrayRemove("a value"))).toBe(false);
    },
  );
});
