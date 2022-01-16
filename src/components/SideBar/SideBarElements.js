import styled from "styled-components";

export const SidebarContainer = styled.div`
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: #040303;
  display: grid;
  align-items: center;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
`;
