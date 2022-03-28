import { Validate } from "react-hook-form";
import { IError } from "./interfaces/IFormErrors";

export interface IFormElement {
  /**
   * Label for a form element
   */
  label: string;
  /**
   * id of the formelement
   */
  id?: string;
  /**
   * register prop for react hook form
   */
  register: any;
  /**
   * The key of the formelement which it should be refered to
   */
  formKey: string;
  /**
   * Additional CSS classes on the input element
   */
  classes?: string;
  /**
   * Classes regarding the div wrapper for some elements
   */
  wrapperClasses?: string;
  /**
   * Whether the input value is valid
   */
  isValid?: boolean;
  /**
   * Helper text if input is invalid
   */
  invalidFeedback?: string;
  /**
   * Whether the form element is disabled
   */
  disabled?: boolean;
  /**
   * Placeholder, gives a hint regardin the input
   */
  placeholder?: string;
  /**
   * default Value of the form element
   */
  defaultValue?: string | number | boolean;
  /**
   * Defines rules and error messages when a user
   * wants to submit a form with an invalid input.
   */
  errors?: IError;
  /**
   * Validation Function
   */
  validate?: Validate<unknown> | undefined;
}
