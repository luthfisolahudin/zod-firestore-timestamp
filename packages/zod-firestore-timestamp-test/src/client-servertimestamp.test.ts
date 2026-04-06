import { test, expect, describe } from "vitest";
import {
  isClientSdkServerTimestamp,
  ClientServerTimestampSchema,
} from "@luthfisolahudin/zod-firestore-timestamp";
import { clientFieldValues, emptyValues } from "./utils";

const subjects = [
  ["isClientSdkServerTimestamp", (v: unknown) => isClientSdkServerTimestamp(v)],
  ["ClientServerTimestampSchema", (v: unknown) => ClientServerTimestampSchema.safeParse(v).success],
] as const;

describe.each(subjects)("%s", (_, validate) => {
  test.each(clientFieldValues)("accepts %s .serverTimestamp()", (_, FieldValue) => {
    expect(validate(FieldValue.serverTimestamp())).toBe(true);
  });

  test.each(emptyValues)("rejects invalid %s value", (_, input) => {
    expect(validate(input)).toBe(false);
  });

  test.each(clientFieldValues)("rejects %s .deleteField()", (_, FieldValue) => {
    expect(validate(FieldValue.deleteField())).toBe(false);
  });

  test.each(clientFieldValues)("rejects %s .increment(1)", (_, FieldValue) => {
    expect(validate(FieldValue.increment(1))).toBe(false);
  });

  test.each(clientFieldValues)("rejects %s .arrayUnion()", (_, FieldValue) => {
    expect(validate(FieldValue.arrayUnion("a value"))).toBe(false);
  });

  test.each(clientFieldValues)("rejects %s .arrayRemove()", (_, FieldValue) => {
    expect(validate(FieldValue.arrayRemove("a value"))).toBe(false);
  });
});
