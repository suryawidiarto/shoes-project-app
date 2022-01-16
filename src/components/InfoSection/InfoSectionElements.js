import styled from "styled-components";

export const InfoRowWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-areas: ${({ flip }) => (flip ? `"col2 col1"` : `"col1 col2"`)};

  ${({ flip }) =>
    flip &&
    `
  div.info-col1{
    margin-left: 2rem;
    margin-right: 1rem;
  }

  div.info-col2{
    margin-left: 1rem;
    margin-right: 2rem;
  }
  `}

  @media screen and (max-width: 815px) {
    grid-template-areas: ${({ flip }) => (flip ? `"col1" "col2"` : `"col2" "col1"`)};
    grid-template-areas: "col1" "col2";
  }
`;
