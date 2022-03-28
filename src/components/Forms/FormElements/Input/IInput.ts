import { IFormElement } from "../IFormElement";

export const AInputType = [
  "email",
  "number",
  "password",
  "search",
  "text",
] as const;

export type TInputType = typeof AInputType[number];

export interface IInput extends IFormElement {
  /**
   * Type of the input
   */
  type: TInputType;
}
