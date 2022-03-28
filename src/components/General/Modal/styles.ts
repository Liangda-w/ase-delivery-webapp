import styled from "styled-components";
import { Modal } from "react-bootstrap";

export const SCModalBody = styled(Modal.Body)`
  font-family: ${({ theme }) => theme.typography.body.family};
  font-weight: ${({ theme }) => theme.typography.body.weights.regular};
  font-size: ${({ theme }) => theme.typography.size.xs};
  color: ${({ theme }) => theme.palette.text.main};
`;
