import styled, { css, DefaultTheme, ThemeProps } from "styled-components";
import { ABootstrapPalette } from "../../../assets/themes/interfaces/TBootstrapPalette";

const cssCustom = (props: ThemeProps<DefaultTheme>) => {
  let tmp = "";
  ABootstrapPalette.forEach((element: string) => {
    tmp += `
        &.text {
          &-${element} {
            color: ${props.theme.palette[element].main} !important;
          }
        }
        
    `;
  });
  return css`
    ${tmp}
  `;
};

export const SCTypography = styled.div`
  ${(props) => cssCustom(props)}
  &.typography {
    &--mb-0 {
      margin-bottom: 0;
    }
    &--headline {
      font-family: ${({ theme }) => theme.typography.headline.family};
      font-weight: ${({ theme }) => theme.typography.headline.weights.bold};
      line-height: ${({ theme }) => theme.typography.headline.lineHeight};
      &--mb {
        margin-bottom: ${({ theme }) => theme.typography.headline.spacing};
      }
    }
    &--body {
      font-family: ${({ theme }) => theme.typography.body.family};
      font-weight: ${({ theme }) => theme.typography.body.weights.regular};
      line-height: ${({ theme }) => theme.typography.body.lineHeight};
      &--mb {
        margin-bottom: ${({ theme }) => theme.typography.headline.spacing};
      }
    }
    &--h1 {
      font-size: ${({ theme }) => theme.typography.size.xxl};
    }
    &--h2 {
      font-size: ${({ theme }) => theme.typography.size.xl};
    }
    &--h3 {
      font-size: ${({ theme }) => theme.typography.size.lg};
    }
    &--h4 {
      font-size: ${({ theme }) => theme.typography.size.md};
    }
    &--h5 {
      font-size: ${({ theme }) => theme.typography.size.sm};
    }
    &--h6 {
      font-size: ${({ theme }) => theme.typography.size.xs};
    }
    &--p,
    &--div {
      font-size: ${({ theme }) => theme.typography.size.xs};
    }
    &--psmall {
    font-size: ${({ theme }) => theme.typography.size.xxs};
  }
`;
