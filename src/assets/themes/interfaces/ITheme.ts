import { IPaletteColor } from "./IPaletteColor";
import { IFont } from "./IFont";
import { ISize, ISizeExtended } from "./ISize";
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    name: string;
    palette: {
      primary: IPaletteColor;
      secondary: IPaletteColor;
      danger: IPaletteColor;
      warning: IPaletteColor;
      info: IPaletteColor;
      success: IPaletteColor;
      text: IPaletteColor;
      [key: string]: IPaletteColor;
    };
    typography: {
      headline: IFont;
      body: IFont;
      size: ISizeExtended;
    };
    spacings: ISizeExtended;
    breakpoints: ISize;
  }
}
