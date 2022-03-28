export const ABootstrapPalette = [
  "primary",
  "warning",
  "secondary",
  "success",
  "danger",
  "info",
] as const;

export type TBootstrapPalette = typeof ABootstrapPalette[number];

export const ABootstrapPaletteExtended = [
  ...ABootstrapPalette,
  "dark",
  "muted",
  "white",
  "none",
] as const;

export type TBootstrapPaletteExtended = typeof ABootstrapPaletteExtended[number];
