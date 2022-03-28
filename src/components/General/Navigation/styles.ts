import styled from "styled-components";
import { Navbar as NavbarBS } from "react-bootstrap";

export const SCNavbar = styled(NavbarBS)`
  font-size: ${({ theme }) => theme.typography.size.xs};
  background-color: ${({ theme }) => theme.palette.primary.main} !important;
`;
