import { ValidationError } from "class-validator";
import { ValueTransformer } from "typeorm";
import { v4 as uuidv4 } from "uuid";

export const uuid = (removeDashes = false): string => {
  if (removeDashes) {
    return uuidv4().replace(/-/g, "");
  }

  return uuidv4();
};

export const uuidWithPrefix = (removeDashes = false, prefix: string): string => `${prefix}_${uuid(removeDashes)}`;