import { FieldValue as AdminFieldValueV11_0 } from "firebase-admin-v11-0/firestore";
import { FieldValue as AdminFieldValueV11_x } from "firebase-admin-v11-x/firestore";
import { FieldValue as AdminFieldValueV12_0 } from "firebase-admin-v12-0/firestore";
import { FieldValue as AdminFieldValueV12_x } from "firebase-admin-v12-x/firestore";
import { FieldValue as AdminFieldValueV13_0 } from "firebase-admin-v13-0/firestore";
import { FieldValue as AdminFieldValueV13_x } from "firebase-admin-v13-x/firestore";

import * as ClientFieldValueV9_0 from "firebase-v9-0/firestore";
import * as ClientFieldValueV9_x from "firebase-v9-x/firestore";
import * as ClientFieldValueV10_0 from "firebase-v10-0/firestore";
import * as ClientFieldValueV10_x from "firebase-v10-x/firestore";
import * as ClientFieldValueV11_0 from "firebase-v11-0/firestore";
import * as ClientFieldValueV11_x from "firebase-v11-x/firestore";
import * as ClientFieldValueV12_0 from "firebase-v12-0/firestore";
import * as ClientFieldValueV12_x from "firebase-v12-x/firestore";

export const adminFieldValues = [
  ["firebase-admin v11.0", AdminFieldValueV11_0],
  ["firebase-admin v11.x", AdminFieldValueV11_x],
  ["firebase-admin v12.0", AdminFieldValueV12_0],
  ["firebase-admin v12.x", AdminFieldValueV12_x],
  ["firebase-admin v13.0", AdminFieldValueV13_0],
  ["firebase-admin v13.x", AdminFieldValueV13_x],
] as const;

export const clientFieldValues = [
  ["firebase v9.0", ClientFieldValueV9_0],
  ["firebase v9.x", ClientFieldValueV9_x],
  ["firebase v10.0", ClientFieldValueV10_0],
  ["firebase v10.x", ClientFieldValueV10_x],
  ["firebase v11.0", ClientFieldValueV11_0],
  ["firebase v11.x", ClientFieldValueV11_x],
  ["firebase v12.0", ClientFieldValueV12_0],
  ["firebase v12.x", ClientFieldValueV12_x],
] as const;

export const emptyValues = [
  ["null", null],
  ["undefined", undefined],
  ["empty object", {}],
] as const;
