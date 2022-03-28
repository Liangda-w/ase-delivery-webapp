export const CRequiredErrorMessage = "This field is required." as const;
export enum EErrorMessages {
  REQUIRED = "This field is required.",
  MIN = "Your input is too small.",
  MAX = "Your input is too big.",
  MAXLENGTH = "Your input is too long.",
  MINLENGTH = "Your input is too short.",
  PATTERN = "Your input is invalid.",
}

export type TRequiredErrorMessage = EErrorMessages.REQUIRED | string;

export type TMinErrorMessage = EErrorMessages.MIN | string;

export type TMaxErrorMessage = EErrorMessages.MAX | string;

export type TMaxLengthErrorMessage = EErrorMessages.MAXLENGTH | string;

export type TMinLengthErrorMessage = EErrorMessages.MINLENGTH | string;

export type TPatternErrorMessage = EErrorMessages.PATTERN | string;
