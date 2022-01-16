import styled from "styled-components";
import Alert from "@mui/material/Alert";

export const AlertBox = styled(Alert)`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  visibility: ${({ $isPop }) => ($isPop ? `visible` : `hidden`)};
  ${({ $isPop }) =>
    $isPop &&
    `
  animation: popup 0.5s;
  transition: all 0.5s;

  @keyframes popup {
    0% {
      transform: scale(0.9);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  `};
`;
