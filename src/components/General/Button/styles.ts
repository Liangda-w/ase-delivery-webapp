import styled, { css, DefaultTheme, ThemeProps } from "styled-components";
import { ABootstrapPalette } from "../../../assets/themes/interfaces/TBootstrapPalette";

const cssCustom = (props: ThemeProps<DefaultTheme>) => {
  let tmp = "";
  ABootstrapPalette.forEach((element: string) => {
    tmp += `
        &.link-${element} {
          color: ${props.theme.palette[element].main};
        }
        &.btn {
          &-${element} {
            background: ${props.theme.palette[element].main};
            border-color: ${props.theme.palette[element].main};

            &:hover {
              background: ${props.theme.palette[element].dark};
              border-color: ${props.theme.palette[element].dark};
            }

            &:active,
            &:focus {
              background:  ${props.theme.palette[element].light};
              border-color:  ${props.theme.palette[element].light};
            }
          }
        }
         &.btn-outline {
          &-${element} {
            color: ${props.theme.palette[element].main};
            border-color: ${props.theme.palette[element].main};
            &:hover {
              color: ${props.theme.palette.text.contrastText};
              border-color: ${props.theme.palette[element].dark};
              background:  ${props.theme.palette[element].dark};
            }

            &:active,
            &:focus {
              border-color:  ${props.theme.palette[element].light};
              background:  ${props.theme.palette[element].light};
            }
          }
        }
      `;
  });
  return css`
    ${tmp}
  `;
};

export const SCButton = styled.button`
  ${(props) => cssCustom(props)}
  &.btn {
    &-rounded {
      border-radius: 12px;
    }
  }
  &.navItem {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: inherit;
    border: none;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    padding: 11px 20px;
    &:hover {
      color: white !important;
    }
  }
`;
