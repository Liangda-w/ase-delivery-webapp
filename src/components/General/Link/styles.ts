import styled from "styled-components";
import { LinkProps } from "react-router-dom";
import { SCButton } from "../Button/styles";

export const SCLink = styled(SCButton)<LinkProps>`
  font-family: ${({ theme }) => theme.typography.body.family};
  &.navItem {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: black;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    padding: 11px 20px;
    text-decoration: none;
    &:hover {
      color: white !important;
      text-decoration: none;
    }
  }
  &.link {
    &-sm {
      font-size: ${({ theme }) => theme.typography.size.xxs};
    }
    &-md {
      font-size: ${({ theme }) => theme.typography.size.xs};
    }
    &-lg {
      font-size: ${({ theme }) => theme.typography.size.sm};
    }
  }
`;
