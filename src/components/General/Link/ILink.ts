import { LinkProps } from "react-router-dom";
import { IButton } from "../Button/IButton";

/**
 * Since anchor tags should not be used to trigger and handle events,
 * the onClick event from IButton will be excluded.
 */
export interface ILink
  extends Omit<IButton, "type" | "onClick" | "disabled" | "htmlType"> {
  /**
   * In which style the link should be represented as
   * Additional value "link" to display the children as plain text
   */
  type?: IButton["type"] | "link";
  /**
   * Target to where the user should be redirected.
   * Has the same types as to-prop of RouterLink.
   */
  to: LinkProps["to"];
  /**
   * If true, the component will represent a react-router-dom link
   */
  route?: boolean;
}
