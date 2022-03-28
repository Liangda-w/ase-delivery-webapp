import { RegisterOptions } from "react-hook-form";
import {
  EErrorMessages,
  TRequiredErrorMessage,
  TMinErrorMessage,
  TMaxErrorMessage,
  TMaxLengthErrorMessage,
  TMinLengthErrorMessage,
  TPatternErrorMessage,
} from "./TFormErrorMessages";

export type TRequiredError = {
  value: boolean;
  message?: TRequiredErrorMessage;
};

export type TMinError = {
  value: number | string;
  message?: TMinErrorMessage;
};
export type TMaxError = {
  value: number | string;
  message?: TMaxErrorMessage;
};
export type TMinLengthError = {
  value: number;
  message?: TMinLengthErrorMessage;
};
export type TMaxLengthError = {
  value: number;
  message?: TMaxLengthErrorMessage;
};

export type TPatternError = {
  value: RegExp;
  message?: TPatternErrorMessage;
};

export interface IError {
  required?: TRequiredError;
  min?: TMinError;
  max?: TMaxError;
  maxLength?: TMaxLengthError;
  minLength?: TMinLengthError;
  pattern?: TPatternError;
}

export const generateRegisterOptions = (
  errors: IError,
  defaultValue: unknown,
  disabled?: boolean,
  valueAsDate?: boolean,
  onChange?: (event: any) => void
): RegisterOptions => ({
  required: errors?.required
    ? {
        value: errors?.required.value,
        message: `${
          errors?.required?.message === undefined
            ? EErrorMessages.REQUIRED
            : errors?.required?.message
        }`,
      }
    : undefined,
  maxLength: errors?.maxLength
    ? {
        value: errors?.maxLength.value,
        message: `${
          errors?.maxLength?.message === undefined
            ? EErrorMessages.MAXLENGTH
            : errors?.maxLength?.message
        }`,
      }
    : undefined,
  minLength: errors?.minLength
    ? {
        value: errors?.minLength.value,
        message: `${
          errors?.minLength?.message === undefined
            ? EErrorMessages.MINLENGTH
            : errors?.minLength?.message
        }`,
      }
    : undefined,
  min: errors?.min
    ? {
        value: errors?.min.value,
        message: `${
          errors?.min?.message === undefined
            ? EErrorMessages.MIN
            : errors?.min?.message
        }`,
      }
    : undefined,
  max: errors?.max
    ? {
        value: errors?.max.value,
        message: `${
          errors?.max?.message === undefined
            ? EErrorMessages.MAX
            : errors?.max?.message
        }`,
      }
    : undefined,
  pattern: errors?.pattern
    ? {
        value: errors?.pattern.value,
        message: `${
          errors?.pattern?.message === undefined
            ? EErrorMessages.PATTERN
            : errors?.pattern?.message
        }`,
      }
    : undefined,
  value: defaultValue,
  disabled,
  valueAsDate,
  onChange,
});
